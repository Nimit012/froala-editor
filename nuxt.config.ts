import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
  plugins: [
    '~/plugins/froala.client.ts'
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true },
  vite: {
    plugins: [
      svgLoader()
    ]
  }
})