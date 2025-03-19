import { ZstdInit, ZstdCodec } from '@oneidentity/zstd-js/wasm'
import { svg2png } from './svg2png'
import { Base91 } from '@hpcc-js/wasm-base91'

const { ZstdSimple }: ZstdCodec = await ZstdInit()
const base91 = await Base91.load()

export async function convertSVG(svg: string) {
  const png = await svg2png(svg)
  const compressedData: Uint8Array = ZstdSimple.compress(png, 20)
  const encoded_data = base91
    .encode(compressedData)
    .replaceAll('<', '-')
    .replaceAll('>', '\\')
    .replaceAll('"', "'")
  return encoded_data
}
