import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const about = JSON.parse(readFileSync(new URL('./src/data/about.json', import.meta.url), 'utf-8'))
const siteName = about.siteName || 'Portfolio'

// Inline plugin: copy dist/index.html → dist/404.html after build
// This enables SPA routing on GitHub Pages (direct URL access / refresh)
const spaFallbackPlugin = {
  name: 'spa-fallback',
  closeBundle() {
    const dist = resolve(__dirname, 'dist')
    copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
  },
}

// Inject siteName and OGP meta tags from about.json into <head> at build time (static HTML → no SEO impact)
const injectMetaPlugin = {
  name: 'inject-meta',
  transformIndexHtml(html) {
    const { siteName, description = '', siteUrl = '', ogImage = '/og-image.png' } = about
    const ogImageUrl = siteUrl ? `${siteUrl}${ogImage}` : ogImage
    const ogTags = [
      `<meta name="description" content="${description}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${siteName}" />`,
      `<meta property="og:title" content="${siteName}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${siteUrl}" />`,
      `<meta property="og:image" content="${ogImageUrl}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${siteName}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${ogImageUrl}" />`,
    ].join('\n    ')
    return html
      .replace(/<title>.*?<\/title>/, `<title>${siteName}</title>`)
      .replace('</head>', `    ${ogTags}\n  </head>`)
  },
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), injectMetaPlugin, spaFallbackPlugin],
})
