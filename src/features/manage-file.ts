import Avro_Easy from '@/assets/layouts/Avro_Easy.json'
import Borno from '@/assets/layouts/Borno.json'
import Munir_Optima from '@/assets/layouts/Munir_Optima.json'
import National_Jatiya from '@/assets/layouts/National_Jatiya.json'
import Probhat from '@/assets/layouts/Probhat.json'
import { Layout, initialLayout } from '@/layout'
import { mainStore } from '@/store'
import Alpine from 'alpinejs'
import stringify from 'json-stable-stringify'
import { fileOpen, fileSave } from 'browser-fs-access'

const exampleLayouts = {
  Avro_Easy,
  Borno,
  Munir_Optima,
  National_Jatiya,
  Probhat,
}

/**
 * Brings an opened layout file to format version 3. Version 3 fixed layouts
 * no longer carry the Normal/AltGr images (OBK draws them from the key map),
 * and transliteration layouts have no key map to edit.
 */
const normalizeLayout = (content: any): Layout => {
  const type = content?.info?.type
  if (type !== 'fixed' || typeof content?.layout !== 'object')
    throw new Error('Only fixed keyboard layouts can be edited.')
  const version = String(content.info.version)
  if (version !== '2' && version !== '3')
    throw new Error(`Unsupported layout format version: ${version}`)
  delete content.info.layout?.image0
  delete content.info.layout?.image1
  content.info.version = '3'
  return content
}

export const saveJSONFile = async ({
  content: storeContent,
}: typeof mainStore) => {
  const content = Alpine.raw(storeContent)
  const blob = new Blob([stringify(content, { space: '  ' }) || ''], {
    type: 'application/json',
  })
  await fileSave(blob, {
    fileName: `${storeContent.info.layout.name || 'Untitled'}.json`,
    extensions: ['.json'],
  })
}

const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === 'AbortError'

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
      try {
        const blob = await fileOpen({
          mimeTypes: ['application/json'],
        })
        store.content = normalizeLayout(JSON.parse(await blob.text()))
      } catch (error) {
        if (!isAbortError(error))
          alert(`Failed to open file: ${(error as Error).message ?? error}`)
      }
      break
    case 'save-as':
      try {
        await saveJSONFile(store)
      } catch (error) {
        if (!isAbortError(error))
          alert(`Failed to save file: ${(error as Error).message ?? error}`)
      }
  }
}
