<template>
  <div class="ui container">
    <div v-if="$store.state.loading> 0" class="ui segment loading">
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
          <div v-if="$store.state.package_page.packages">
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
          </div>
          <div v-else>
            <div class="middle">
              <div class="ui teal message">
                Please do a search from top panel!
              </div>
            </div>
          </div>
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
  mounted() {
    this.$store.commit('disableLoading')
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
