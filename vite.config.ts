import path from 'path'
import UnoCSS from 'unocss/vite'
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/layout-editor/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    UnoCSS(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Kalpurush',
            local: 'Kalpurush',
            src: './public/fonts/kalpurush.ttf',
          },
        ],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
  ],
})
