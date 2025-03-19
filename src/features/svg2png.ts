import { createSvg2png, initialize } from 'svg2png-wasm'

await initialize(fetch(`${import.meta.env.BASE_URL}svg2png_wasm_bg.wasm`))

const font = await fetch(
  `${import.meta.env.BASE_URL}fonts/kalpurush.ttf`,
).then((res) => res.arrayBuffer())

export const svg2png = createSvg2png({
  fonts: [new Uint8Array(font)],
})
