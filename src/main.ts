import '@/style.css'
import 'unfonts.css'

import layoutSvg from '@/assets/layout.svg?raw'
import { drawActiveKeys, drawLayout, initDraw } from '@/features/preview-layout'
import { mainStore } from '@/store'
import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
import hotkeys from 'hotkeys-js'
import { editKeysUtilities } from './features/edit-key'

Alpine.store('main', mainStore)

Alpine.plugin(focus)

for (const [name, func] of Object.entries(editKeysUtilities)) {
  Alpine.magic(name, () => func)
}

Alpine.start()

export const draw = initDraw(layoutSvg)

Alpine.effect(() => {
  const store = Alpine.store('main') as typeof mainStore
  drawLayout(draw, store.content.layout, store.previewMode)
  drawActiveKeys(draw, store.editKeys)
})

// hotkeys-js ignores events from form fields by default; let modifier
// shortcuts and Esc through so they work while editing a key.
const defaultFilter = hotkeys.filter
hotkeys.filter = (event) =>
  event.ctrlKey ||
  event.metaKey ||
  event.key === 'Escape' ||
  defaultFilter(event)

const store = Alpine.store('main') as typeof mainStore
hotkeys('ctrl+s, command+s', (event) => {
  event.preventDefault()
  store.handleMenuAction('save-as').catch(console.error)
})
hotkeys('ctrl+o, command+o', (event) => {
  event.preventDefault()
  store.handleMenuAction('open').catch(console.error)
})
hotkeys('alt+g', (event) => {
  event.preventDefault()
  store.previewMode = store.previewMode === 'Normal' ? 'AltGr' : 'Normal'
})
hotkeys('esc', () => {
  store.editKeys = ''
})
