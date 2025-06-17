import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/icon", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  dir: { pages: "routes" },
  vite: { plugins: [tailwindcss()] },
});
