// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  plugins: [
    '~/plugins/froala.client.ts'
  ],
  devtools: { enabled: true }
})
