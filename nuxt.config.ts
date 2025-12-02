import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({

    app: {
    head: {
      link: [
        // Bootstrap (required for Froala Design Blocks)
        {
          rel: 'stylesheet',
          href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.6.2/css/bootstrap.min.css'
        },
        // Froala Design Blocks CSS
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/css/froala_blocks.min.css'
        },
        // Font Awesome (for icons in blocks)
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        },

        // Froala Design Blocks CSS

      ],
      script: [
        // Froala Design Blocks JS
        { src: 'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/js/froala_blocks.min.js', defer: true }
      ]
    }
  },


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