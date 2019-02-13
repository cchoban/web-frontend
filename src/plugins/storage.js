import Vue from 'vue'

let modernBrowser = false
const $cookie = Vue.prototype.$cookie

if (typeof Storage !== undefined) {
  modernBrowser = true
}

Vue.prototype.$storage = {
  set: (key, value) => {
    if (modernBrowser) {
      return localStorage.setItem(key, value)
    }

    return $cookie.set(key, value)
  },

  get: (key) => {
    if (modernBrowser) {
      return localStorage.getItem(key)
    }

    return $cookie.get(key)
  },

  delete: (key) => {
    if (modernBrowser) {
      return localStorage.removeItem(key)
    }

    return $cookie.delete(key)
  }
}
