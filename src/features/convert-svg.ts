import { ZstdInit, ZstdCodec } from '@oneidentity/zstd-js/wasm'
import { svg2png } from './svg2png'
import { Base91 } from '@hpcc-js/wasm-base91'

const zstd: Promise<ZstdCodec> = ZstdInit()
const base91 = Base91.load()

export async function convertSVG(svg: string) {
  const png = await (await svg2png)(svg)
  const compressedData: Uint8Array = (await zstd).ZstdSimple.compress(png, 20)
  const encoded_data = (await base91)
    .encode(compressedData)
    .replaceAll('<', '-')
    .replaceAll('>', '\\')
    .replaceAll('"', "'")
  return encoded_data
}
