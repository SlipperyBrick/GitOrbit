import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

interface GitOrbitAPI {
  closeWindow: () => void
  restoreWindow: () => void
  maximizeWindow: () => void
  minimizeWindow: () => void
  openExternalLink: (link: string) => void
  openAuthorizationWindow: (link: string) => void
  receiveAuthorizationCode: (
    listener: (event: Electron.IpcRendererEvent, code: string) => void
  ) => void
  removeAuthorizationCodeListener: (
    listener: (event: Electron.IpcRendererEvent, code: string) => void
  ) => void
}

// Custom APIs for renderer
const api: GitOrbitAPI = {
  closeWindow: (): void => {
    ipcRenderer.send('close-window')
  },
  maximizeWindow: (): void => {
    ipcRenderer.send('maximize-window')
  },
  restoreWindow: (): void => {
    ipcRenderer.send('restore-window')
  },
  minimizeWindow: (): void => {
    ipcRenderer.send('minimize-window')
  },
  openExternalLink: (link: string): void => {
    ipcRenderer.send('open-external-link', link)
  },
  openAuthorizationWindow: (link: string): void => {
    ipcRenderer.send('open-authorization-window', link)
  },
  receiveAuthorizationCode: (
    listener: (event: Electron.IpcRendererEvent, code: string) => void
  ): void => {
    ipcRenderer.on('authorization-code', listener)
  },
  removeAuthorizationCodeListener: (
    listener: (event: Electron.IpcRendererEvent, code: string) => void
  ): void => {
    ipcRenderer.removeListener('authorization-code', listener)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
