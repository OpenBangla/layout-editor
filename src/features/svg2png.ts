import { createSvg2png, initialize } from 'svg2png-wasm'

export const svg2png = (async () => {
  await initialize(fetch(`${import.meta.env.BASE_URL}svg2png_wasm_bg.wasm`))

  const font = await fetch(
    `${import.meta.env.BASE_URL}fonts/kalpurush.ttf`,
  ).then((res) => res.arrayBuffer())

  return createSvg2png({
    fonts: [new Uint8Array(font)],
  })
})()
