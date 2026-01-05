import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/tui-image-editor.css",
        },
        {
          rel: "stylesheet",
          href: "https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.css",
        },
      ],
      script: [
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
