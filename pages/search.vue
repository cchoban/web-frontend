<template>
  <div class="ui container">
    <div v-if="$store.state.loading" class="ui segment loading">
      <br>
    </div>
    <div v-else>
      <Pagination extra_queries />
      <table class="ui table">
        <thead>
          <tr>
            <th>Packages</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pack in $store.state.package_page.packages">
            <nuxt-link :to="`/${pack.packageName}`" class="removelink">
              <td>
                <h4 class="ui image header">
                  <div class="ui mini rounded image">
                    <img
                      :src="$store.state.api_urls.home+pack.server.icon"
                      class="ui mini rounded image"
                    >
                  </div>
                  <div class="content package-specifics">
                    {{ pack.packageName }}
                    <div class="sub header">
                      <a href="#" class="removelink">
                        {{ pack.packageArgs.description }}
                      </a>
                    </div>
                  </div>
                </h4>
              </td>
            </nuxt-link>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Packages/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data: function () {
    return {
      searchKey: this.$store.searh_key
    }
  },
  mounted() {
    this.getPackages()
  },
  methods: {
    getPackages() {
      const url = `${this.$store.state.api_urls.packages}/?search=${
        this.searchKey
      }`
      this.$axios
        .get(url)
        .then((response) => {
          this.packages = response.data.results
          this.count = response.data.count

          const data = {
            packages: response.data.results,
            count: response.data.count,
            nextUrl: response.data.nextUrl,
            previousUrl: response.data.previousUrl
          }

          this.$store.commit('updatePackagePage', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .posts {
    width: inherit !important;
  }
}

.package-specifics {
  width: 86%;
}
</style>
