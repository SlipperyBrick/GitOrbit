import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@views': resolve('src/renderer/src/views'),
        '@layouts': resolve('src/renderer/src/layouts'),
        '@assets': resolve('src/renderer/src/assets'),
        '@hooks': resolve('src/rendere/src/hooks'),
        '@customtypes': resolve('src/renderer/src/types'),
        '@components': resolve('src/renderer/src/components'),
        '@store': resolve('src/renderer/src/store'),
        '@contexts': resolve('src/renderer/src/contexts')
      }
    },
    plugins: [react(), svgr()]
  }
})
