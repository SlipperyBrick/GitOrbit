import { app, shell, BrowserWindow, ipcMain, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'

async function createWindow(): Promise<void> {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1830,
    height: 970,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    icon: icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.on('ready', async () => {
  if (is.dev) {
    try {
      // Load the React DevTools extension
      await session.defaultSession.loadExtension(
        // Provide the path to the installed extension folder
        // Replace 'user' with your actual username in the path
        'D:/Source/gitorbit/extensions/react_devtools_4.24.3',
        { allowFileAccess: true }
      )

      // Load the Redux DevTools extension
      await session.defaultSession.loadExtension(
        // Provide the path to the installed extension folder
        // Replace 'user' with your actual username in the path
        'D:/Source/gitorbit/extensions/redux_devtools_3.0.16',
        { allowFileAccess: true }
      )

      console.log('Added React and Redux DevTools extensions')
    } catch (error) {
      console.log('An error occurred while installing the extensions: ', error)
    }
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.gitorbit')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('close-window', () => {
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on('maximize-window', () => {
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.maximize()
  }
})

ipcMain.on('minimize-window', () => {
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.on('restore-window', () => {
  const mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow) {
    mainWindow.restore()
  }
})

ipcMain.on('open-external-link', (_event, link) => {
  shell.openExternal(link)
})

ipcMain.on('open-authorization-window', (_event, link) => {
  const mainWindow = BrowserWindow.getFocusedWindow()

  const authWindow = new BrowserWindow({
    width: 800,
    height: 800,
    autoHideMenuBar: true,
    frame: false,
    alwaysOnTop: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  // Load the authorization URL in the embedded browser view
  authWindow.loadURL(link)

  // Intercept the navigation events to handle the redirect
  const filter = {
    urls: ['http://127.0.0.1:5173/callback*']
  }

  authWindow.webContents.session.webRequest.onBeforeRequest(filter, (details) => {
    // Extract the authorization code from the URL
    const url = new URL(details.url)
    const code = url.searchParams.get('code')

    // Close the authorization window
    authWindow.close()

    // Pass the authorization code back to the main window
    mainWindow?.webContents.send('authorization-code', code)
  })
})
