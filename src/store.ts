import { Layout, initialLayout } from '@/layout'
import { handleMenuAction } from './features/manage-file'

export const mainStore = {
  content: structuredClone(initialLayout) as Layout,
  editKeys: '',
  previewMode: 'Normal' as 'Normal' | 'AltGr',
  examples: [
    { key: "Avro_Easy", label: "Avro Easy" },
    { key: "Borno", label: "Borno" },
    { key: "Munir_Optima", label: "Munir Optima" },
    { key: "National_Jatiya", label: "National (Jatiya)" },
    { key: "Probhat", label: "Probhat" },
  ],
  handleMenuAction,
}
