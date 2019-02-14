<template>
  <div>
    <div class="section twentyfivepx column">
      <nuxt-link
        to="packages"
        class="header-text bold removelink"
      >
        <h2 class="left-floated">
          Packages
        </h2>
        <label class="view-all unbold right-floated">
          View all
          <i class="angle right icon" />
        </label>
      </nuxt-link>
      <div class="inner-section">
        <div class="ui segments panel">
          <div class="ui segment panel-header">
            <p class="bold">
              Popular
            </p>
          </div>
          <div class="ui secondary segment panel-content">
            <div v-if="loading">
              <div class="ui attached segment loading">
                <br>
              </div>
            </div>
            <div
              v-for="pack in popularPackages"
              class="ui attached segment listings"
              @click="showPage(pack.packageName, pack.id)"
            >
              <div class="topla">
                <span>
                  <img
                    class="ui avatar image remove-circle"
                    :src="$store.state.api_urls.home+pack.server.icon"
                    alt=""
                  >
                </span>
                <span class="text">
                  {{ pack.packageArgs.softwareName }}
                </span>
                <span class="right-floated day">
                  <timeago :datetime="pack.updated_at" />
                </span>
              </div>
            </div>
          </div>
          <div class="ui panel-footer column">
            <nuxt-link
              to="/popular"
              class="removelink loadMoreBtn"
            >
              <i
                class="angle down icon light"
                style="font-size:20px;margin:0 auto"
              />
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="inner-section">
        <div class="ui segments panel">
          <div class="ui segment panel-header">
            <p class="bold">
              Recent Packages
            </p>
          </div>
          <div class="ui secondary segment panel-content">
            <div v-if="loading">
              <div class="ui attached segment loading">
                <br>
              </div>
            </div>
            <div
              v-for="pack in recentPackages"
              class="ui attached segment listings"
              @click="showPage(pack.packageName, pack.id)"
            >
              <div class="topla">
                <span>
                  <img
                    class="ui avatar image remove-circle"
                    :src="$store.state.api_urls.home+pack.server.icon"
                    alt=""
                  >
                </span>
                <span class="text">
                  {{ pack.packageArgs.softwareName }}
                </span>
                <span class="right-floated day">
                  <timeago :datetime="pack.updated_at" />
                </span>
              </div>
            </div>
          </div>
          <div class="ui panel-footer column">
            <nuxt-link
              to="/packages"
              class="removelink loadMoreBtn"
            >
              <i
                class="angle down icon light"
                style="font-size:20px;margin:0 auto"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popularPackages: [],
      recentPackages: [],
      loading: true
    }
  },
  mounted() {
    const popularData = this.$storage.get('PackageSection_Popular')
    const recentData = this.$storage.get('PackageSection_Recent')
    if (popularData != undefined || recentData != undefined) {
      this.loading = false
      this.popularPackages = JSON.parse(popularData)
      this.recentPackages = JSON.parse(recentData)
    } else {
      this.getPopular()
      this.getRecent()
    }
  },
  methods: {
    showPage(packageName, packageId) {
      this.$router.push(`/${packageName}`)
    },
    async getPopular() {
      const url = `${this.$store.state.api_urls.packages}?ordering=-download_count`
      await this.$axios
        .get(url)
        .then((response) => {
          this.popularPackages = response.data.results.slice(0, 5)
          this.$storage.set('PackageSection_Popular', JSON.stringify(this.popularPackages))
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getRecent() {
      const url = `${this.$store.state.api_urls.packages}?ordering=-created_at`
      await this.$axios
        .get(url)
        .then((response) => {
          this.recentPackages = response.data.results.slice(0, 5)
          this.$storage.set('PackageSection_Recent', JSON.stringify(this.recentPackages))
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
