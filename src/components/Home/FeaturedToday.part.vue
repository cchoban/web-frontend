<template>
  <div class="ui container fluid left">
    <div class="featured-items twentyfivepx">
      <div class="featured-header-text">
        <h2>Featured today</h2>
      </div>

      <div class="featured-item-list">
        <div
          v-for="pack in popularPackages"
          v-if="!loading"
        >
          <nuxt-link
            :to="'/'+pack.packageName"
            class="featured-item"
            :style="`background-image: linear-gradient(to top, black, transparent), url(&quot;${$store.state.api_urls.home+pack.server.icon}&quot;)`"
          >
            <h1> {{ pack.packageArgs.softwareName }} </h1>
            <p />
            <label>
              <a
                :href="category_url(pack.category_name)"
                class="removelink addCatUrl"
              >
                {{ pack.category_name }}
              </a>
            </label>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      popularPackages: {}
    }
  },
  mounted() {
    const featured = this.$storage.get('FeaturedToday')
    if (featured != undefined) {
      this.loading = false
      this.popularPackages = JSON.parse(featured)
    } else {
      this.getPopular()
    }
  },
  methods: {
    category_url(category_name) {
      const slugged = this.$options.filters.slugify(category_name)
      return `/packages/category/${slugged}`
    },
    getPopular() {
      const url = `${this.$store.state.api_urls.packages}?ordering=-download_count&showcase=true`
      this.$axios
        .get(url)
        .then((response) => {
          this.popularPackages = response.data.results.slice(0, 10)
          this.$storage.set('FeaturedToday', JSON.stringify(this.popularPackages))
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
