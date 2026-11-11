import tailwindcss from '@tailwindcss/vite'
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig, lazyPlugins } from 'vite-plus'

// https://vitejs.dev/config/
export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    printWidth: 80,
    sortPackageJson: false,
    sortTailwindcss: {
      stylesheet: './src/style.css',
    },
    ignorePatterns: ['dist', 'bun.lock'],
  },
  base: '/layout-editor/',
  resolve: {
    tsconfigPaths: true,
  },
  plugins: lazyPlugins(() => [
    tailwindcss(),
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
  ]),
})
