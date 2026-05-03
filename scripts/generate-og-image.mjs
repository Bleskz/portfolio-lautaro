// Renders public/og-image.svg to public/og-image.png at the standard 1200x630 OG size.
// Run with: npm run build:og
// Re-run whenever public/og-image.svg changes.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SRC = resolve(ROOT, 'public', 'og-image.svg')
const DEST = resolve(ROOT, 'public', 'og-image.png')

async function main() {
  const svg = await readFile(SRC, 'utf8')
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: '#020502',
    font: {
      // Use OS-installed fonts; the SVG falls back to Impact / Courier when the
      // primary fonts are missing on the build machine. Loaded font dirs:
      loadSystemFonts: true,
    },
  })
  const png = resvg.render().asPng()
  await writeFile(DEST, png)
  console.log(`✓ Wrote ${DEST} (${(png.length / 1024).toFixed(1)} kB)`)
}

main().catch((err) => {
  console.error('Failed to generate OG image:', err)
  process.exit(1)
})
