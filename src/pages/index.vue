<template>
  <div>
    <!-- <Packages v-if="this.$store.state.search_key.length > 0"></Packages> -->

    <FeaturedToday />

    <div class="ui three column container fluid content-section">
      <PackagesSection />
      <PopularSection />
      <div class="third-section column twentyfivepx clearfix">
        <a
          href="#"
          class="header-text bold removelink"
        >
          <h2 class="left-floated">
            Discover
          </h2>
          <label class="view-all unbold right-floated">
            View all
            <i class="angle right icon" />
          </label>
        </a>
        <div class="inner-section">
          <div class="ui segments panel">
            <div class="ui segment panel-header">
              <p class="bold">
                Random Packages
              </p>
            </div>
            <div class="ui secondary segment panel-content">
              <div v-if="loading">
                <div class="ui attached segment loading">
                  <br>
                </div>
              </div>
              <div
                v-for="pack in discoverPackages.slice(0, 5)"
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
              <a class="removelink loadMoreBtn">
                <i
                  class="angle down icon light"
                  style="font-size:20px;margin:0 auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- </div> -->
</template>

<script>
import FeaturedToday from '@/components/Home/FeaturedToday.part.vue'
import PopularSection from '@/components/Home/PopularSection.part.vue'
import PackagesSection from '@/components/Home/PackagesSection.part.vue'

export default {
  components: {
    FeaturedToday,
    PopularSection,
    PackagesSection
  },
  props: ['maxentry'],
  data() {
    return {
      message: null,
      nextUrl: null,
      previousUrl: null,
      count: null,
      packageName: this.$store.state.package.name,
      packageId: null,
      packages: [],
      discoverPackages: [],
      loading: true
    }
  },

  computed: {
    countPageNumber() {
      const totalPageNumber = Math.ceil(this.count / this.maxentry)

      const pages = {}
      let offset = -10
      for (let page = 1; page <= totalPageNumber; page++) {
        pages[page] = offset += 10
      }
      return pages
    }
  },
  mounted() {
    this.getDiscover()
    this.countPageNumber
    $('.root').addClass('index')
  },

  methods: {
    async getDiscover() {
      const url = this.$store.state.api_urls.packages
      await this.$axios
        .get(url)
        .then((response) => {
          this.packages = response.data
          this.discoverPackages = this.shuffleArray(response.data.results)
          this.count = response.data.count
          this.nextUrl = response.data.next
          this.previousUrl = response.data.previous
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    showPage(packageName, packageId) {
      this.$router.push(`/${packageName}`)
    },
    shuffleArray(sourceArray) {
      for (let i = 0; i < sourceArray.length - 1; i++) {
        const j = i + Math.floor(Math.random() * (sourceArray.length - i))

        const temp = sourceArray[j]
        sourceArray[j] = sourceArray[i]
        sourceArray[i] = temp
      }
      return sourceArray
    },
    category_url(category_name) {
      const slugged = Vue.options.filters.slugify(category_name)
      return `/packages/category/${slugged}`
    }
  }
}
</script>
