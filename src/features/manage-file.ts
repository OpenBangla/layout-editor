import Avro_Easy from '@/assets/layouts/Avro_Easy.json'
import Borno from '@/assets/layouts/Borno.json'
import Munir_Optima from '@/assets/layouts/Munir_Optima.json'
import National_Jatiya from '@/assets/layouts/National_Jatiya.json'
import Probhat from '@/assets/layouts/Probhat.json'
import { initialLayout } from '@/layout'
import { draw } from '@/main'
// import { convert_svg } from '@/rust-functions'
import { mainStore } from '@/store'
import Alpine from 'alpinejs'
import hotkeys from 'hotkeys-js'
import stringify from 'json-stable-stringify'
import { drawLayout } from './preview-layout'
import { fileOpen, fileSave } from 'browser-fs-access'
import { convertSVG } from './convert-svg'

const exampleLayouts = {
  Avro_Easy,
  Borno,
  Munir_Optima,
  National_Jatiya,
  Probhat,
}

export const saveJSONFile = async ({
  content: storeContent,
  previewMode,
}: typeof mainStore) => {
  const content = structuredClone(
    Alpine.raw(storeContent),
  ) as typeof storeContent
  draw.removeClass('interactive-mode')
  drawLayout(draw, content.layout, 'Normal')
  content.info.layout.image0 = await convertSVG(draw.svg(true))
  drawLayout(draw, content.layout, 'AltGr')
  content.info.layout.image1 = await convertSVG(draw.svg(true))
  draw.addClass('interactive-mode')
  drawLayout(draw, content.layout, previewMode)
  const blob = new Blob([stringify(content, { space: '  ' }) || ''], {
    type: 'application/json',
  })
  fileSave(blob, {
    fileName: `${storeContent.info.layout.name || 'Untitled'}.json`,
    extensions: ['.json'],
  })
}

export const handleMenuAction = async (payload: string) => {
  const store = Alpine.store('main') as typeof mainStore
  switch (payload) {
    case 'new':
      store.content = structuredClone(initialLayout)
      break
    case 'Avro_Easy':
    case 'Borno':
    case 'Munir_Optima':
    case 'National_Jatiya':
    case 'Probhat':
      store.content = structuredClone(exampleLayouts[payload])
      break
    case 'open':
      const blob = await fileOpen({
        mimeTypes: ['application/json'],
      })
      store.content = JSON.parse(await blob.text())
      break
    case 'save-as':
      saveJSONFile(store)
  }
  hotkeys('ctrl+s', function (event) {
    event.preventDefault()
    saveJSONFile(store)
  })
}
