const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Choban is a software automation tool made for Windows platform for easy software installation. ' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Choban' },
      { property: 'og:title', content: 'Choban - Software Automation Tool' },
      { property: 'og:description', content: 'Choban is a software automation tool made for Windows platform for easy software installation. ' },
      { property: 'og:url', content: 'https://choban.app/' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Choban - Software Automation Tool' },
      { name: 'twitter:url', content: 'https://choban.app/' },
      { name: 'twitter:description', content: 'Choban is a software automation tool made for Windows platform for easy software installation. ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://choban.app/', type: 'text/html' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
    '~plugins/vue-timeago.js',
    '~plugins/vue-disqus.js',
    '~plugins/helpers.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://choban.app/api/'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },

  env: {
    baseUrl: 'https://choban.app',
    disqusShortname: 'choban'
  }
}
