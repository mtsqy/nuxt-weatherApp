import data from './static/assets/json/city.list.json'
let routes = () => {
  return new Promise(resolve => {
    resolve(data.map(c => `${c.name}`))
  })
}
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  // server: {
  //   port: 3000, // default: 3000
  //   host: "0.0.0.0" // default: localhost
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'weatherApp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.1/flickity.pkgd.min.js",
        defer: true
      },
      {
        src: "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js",
        defer: true
      },
      {
        src: "https://maps.googleapis.com/maps/api/js?key=" + process.env.MAP_API,
        async: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/http'
  ],

  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    token: process.env.WEATHER_TOKEN,
  },
  
  privateRuntimeConfig: {
      token: process.env.WEATHER_TOKEN,
  },

  generate: {
    routes
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
