const pkg = require('./package')
const baseUrl = process.env.NODE_ENV !== 'production' ? '/' : '/packages/'
const apiUrl = process.env.NODE_ENV == 'production' ? 'https://choban.app/api/' : 'http://localhost:8000'
const meta = {
  title: 'Choban - Software Automation Tool',
  description: 'Choban is a software automation tool made for Windows platform for easy software installation.'
}
module.exports = {
  mode: 'universal',
  router: {
    base: baseUrl
  },

  /*
   ** Headers of the page
   */
  head: {
    title: meta.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Choban' },
      { hid: 'og:title', property: 'og:title', content: meta.title },
      { hid: 'og:description', property: 'og:description', content: meta.description },
      { hid: 'og:url', property: 'og:url', content: 'https://choban.app/' },
      { name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:title', name: 'twitter:title', content: meta.title },
      { hid: 'twitter:url', name: 'twitter:url', content: 'https://choban.app/' },
      { hid: 'twitter:description', name: 'twitter:description', content: meta.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'canonical', rel: 'canonical', href: 'https://choban.app/', type: 'text/html' }
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
    '~plugins/vue-timeago.js',
    '~plugins/vue-disqus.js',
    '~plugins/vue-cookie.js',
    '~plugins/helpers.js',
    '~plugins/filters.js',
    '~plugins/storage.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: apiUrl
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login/', method: 'post', propertyName: 'token' },
          user: { url: 'user/', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: 'Token'
      }
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        secure: true
      }
    },
    redirect: {
      login : '/'
      register: '/register'
    },
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
    baseUrl: process.env.BASE_URL || 'https://choban.app',
    disqusShortname: 'choban'
  }
}
