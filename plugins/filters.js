import Vue from "vue";
import slugify from "slugify";

Vue.filter("slugify", str => {
  if (str) {
    if (typeof str === "string") {
      return slugify(str).toLowerCase();
    }
  }
});
