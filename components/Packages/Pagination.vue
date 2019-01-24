<template>
  <div
    aria-label="Pagination Navigation"
    role="navigation"
    class="ui pagination pointing secondary menu"
  >
    <a v-if="previousUrl" class="item" @click="getPackages(previousUrl)">
      ⟨
    </a>
    <a
      v-for="(num, pages) in countPageNumber"
      class="item"
      :class="{'active': pages == currentPage}"
      @click="getPackages(`${$store.state.api_urls.packages}/?offset=${num+extra_queries}`, pages)"
    >
      {{ pages }}
    </a>
    <a v-if="nextUrl" class="item" @click="getPackages(nextUrl)">
      ⟩
    </a>
  </div>
</template>

<script>
export default {
  props: ['extraQueries'],
  data() {
    return {
      packages: null,
      nextUrl: null,
      previousUrl: null,
      count: null,
      currentPage: 1,
      offset: null,
      request_url: ''
    }
  },

  computed: {
    countPageNumber() {
      const totalPageNumber = Math.ceil(this.count / 15)
      const pages = {}
      let offset = -10
      let page = 1
      for (page; page <= totalPageNumber; page++) {
        pages[page] = offset += 10
      }

      return pages
    }
  },
  mounted() {
    this.packages = this.$store.state.package_page.packages
    this.nextUrl = this.$store.state.package_page.nextUrl
    this.previousUrl = this.$store.state.package_page.previousUrl
    this.count = this.$store.state.package_page.count
  },
  methods: {
    getPackages(url, pageNumber) {
      this.$axios
        .get(url)
        .then((response) => {
          this.packages = response.data.results
          this.count = response.data.count
          this.nextUrl = response.data.next
          this.previousUrl = response.data.previous

          const data = {
            packages: response.data.results,
            count: response.data.count,
            nextUrl: response.data.nextUrl,
            previousUrl: response.data.previousUrl
          }

          this.$store.commit('updatePackagePage', data)
          this.pushState(pageNumber)
        })
        .catch((response) => {
          console.log('error')
        })
    },
    pushState(pageNumber) {
      this.currentPage = pageNumber
    }
  }
}
</script>

<style>
</style>
