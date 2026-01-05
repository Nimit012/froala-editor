import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        // Bootstrap (required for Froala Design Blocks)
        {
          rel: "stylesheet",
          href: "https://stackpath.bootstrapcdn.com/bootstrap/4.6.2/css/bootstrap.min.css",
        },
        // Froala Design Blocks CSS
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/css/froala_blocks.min.css",
        },
        // Font Awesome (for icons in blocks)
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        },

        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/tui-image-editor.css",
        },
        {
          rel: "stylesheet",
          href: "https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.css",
        },

        // Froala Design Blocks CSS
      ],
      script: [
        // Froala Design Blocks JS
        {
          src: "https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/js/froala_blocks.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js",
          defer: true,
        },
        {
          src: "https://cdn.jsdelivr.net/npm/tui-code-snippet@1.4.0/dist/tui-code-snippet.min.js",
          defer: true,
        },
        {
          src: "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/tui-image-editor.min.js",
          defer: true,
        },
      ],
    },
  },

  compatibilityDate: "2025-07-15",
  srcDir: "app",
  plugins: ["~/plugins/froala.client.ts"],
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  vite: {
    plugins: [svgLoader()],
  },
});
