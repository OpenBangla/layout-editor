import '@unocss/reset/tailwind.css'
import 'unfonts.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

import layoutSvg from '@/assets/layout.svg?raw'
import { drawActiveKeys, drawLayout, initDraw } from '@/features/preview-layout'
import { mainStore } from '@/store'
import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
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
