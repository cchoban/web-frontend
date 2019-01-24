import Vue from "vue";

Vue.prototype.$capitalize = function(str) {
  return str && str[0].toUpperCase() + str.slice(1);
};
