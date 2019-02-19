import Vue from 'vue'

Vue.prototype.$capitalize = function (str) {
  return str && str[0].toUpperCase() + str.slice(1)
}

Vue.prototype.$errorMessage = function (title, content) {
  return swal({
    title: title,
    text: content,
    type: 'error',
    toast: true,
    position: 'bottom-end'
  })
}

Vue.prototype.$successMessage = function (title, content) {
  return swal({
    title: title,
    text: content,
    type: 'success',
    toast: true,
    position: 'bottom-end'
  })
}
