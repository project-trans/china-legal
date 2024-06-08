// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import NuxtContentTransformersModule from "./modules/nuxt-content-transformers/module";
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    NuxtContentTransformersModule,
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-icon",
  ],
  // https://color-mode.nuxtjs.org
  colorMode: {
    preference: "system", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
  },
  // https://content.nuxtjs.org
  content: {
    defaultLocale: "zh",
    documentDriven: true,
    highlight: {
      // langs: [
      //   "json",
      //   "js",
      //   "ts",
      //   "html",
      //   "css",
      //   "vue",
      //   "shell",
      //   "mdc",
      //   "md",
      //   "yaml",
      //   "diff",
      // ],
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: {
        dark: "github-dark",
        default: "github-light",
      },
    },
  },
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //   },
  // },
  app: {
    baseURL: "/china-legal/", //如果需要部署到二级目录
  },
});
