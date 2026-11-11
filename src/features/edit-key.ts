// Characters that render as nothing, so the editor shows a badge in their place.
// `keycap` is the shorter label used on the keyboard preview.
export const specialChars = [
  {
    char: '\u{200C}',
    short: 'ZWNJ',
    keycap: 'NJ',
    name: 'Zero-width non-joiner',
  },
  { char: '\u{200D}', short: 'ZWJ', keycap: 'J', name: 'Zero-width joiner' },
]

const specialCharMap = new Map(specialChars.map((c) => [c.char, c]))

export const editKeysUtilities = {
  getUnicode: (str: string) =>
    Array.from(
      str ?? '',
      (ch) =>
        `U+${ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`,
    ).join(' '),

  getEditKeyVariants: (editKeys: string) => {
    const [normalKey, shiftKey] = editKeys.split(' ')
    return [
      ['Normal', `Key_${normalKey}_Normal`],
      ['Shift', `Key_${shiftKey}_Normal`],
      ['AltGr', `Key_${normalKey}_AltGr`],
      ['Shift + AltGr', `Key_${shiftKey}_AltGr`],
    ]
  },

  getSpecialChars: () => specialChars,

  // Splits `str` into runs of plain text and individual special characters.
  splitSpecialChars: (str: string) => {
    const segments: {
      text: string
      special?: (typeof specialChars)[number]
    }[] = []
    for (const ch of str ?? '') {
      const special = specialCharMap.get(ch)
      const last = segments.at(-1)
      if (special) segments.push({ text: ch, special })
      else if (last && !last.special) last.text += ch
      else segments.push({ text: ch })
    }
    return segments
  },

  copyChar: async (char: string) => {
    try {
      await navigator.clipboard.writeText(char)
      return true
    } catch (error) {
      alert(`Failed to copy: ${(error as Error).message ?? error}`)
      return false
    }
  },
}
