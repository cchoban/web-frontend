<template>
  <div>
    <div class="ui container two column fluid left">
      <div class="ui section column twentyfivepx">
        <h2>{{ category_name }}</h2>
        <div>
          <div
            class="featured-podcast"
            :style="'background-image: linear-gradient(to top, black, transparent), url('+category_image+')'"
          >
            <h1>{{ category_name }}</h1>
            <div class="info">
              sd
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui column content">
      <div class="header">
        <div class="section-image">
          <img
            :src="category_image"
            alt="sa"
          >
        </div>
        <h1 class="bold catname">
          {{ category_name }}
        </h1>
      </div>

      <div class="ui column posts post-content">
        <div
          v-for="pack in packages"
          class="post"
        >
          <div class="header-section">
            <div
              v-lazy-container="{selector: 'img'}"
              class="image"
            >
              <img
                :data-src="$store.state.api_urls.home+pack.server.icon"
                alt=""
              >
            </div>
            <div class="title">
              <h2>
                <router-link :to="`/${pack.packageName}`">
                  {{ pack.packageName }}
                </router-link>
              </h2>
            </div>
            <div class="author">
              <i class="icon bookmark outline" />
              <i class="icon external alternate" />
              <!-- TODO: make custom profile pages -->
              <a
                href="#"
                class="author-name"
              >
                {{ pack.user_name }}
              </a>
              <span class="bold time">
                <timeago :datetime="pack.updated_at" />
              </span>
            </div>
          </div>

          <div class="description">
            <p>
              {{ pack.packageArgs.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- #Content -->
  </div>
  </div>
</template>

<script>
// FIXME: does not work need a backend compatibility
export default {
  data() {
    return {
      packages: [],
      nextUrl: null,
      previousUrl: null,
      category_image: '',
      category_name: '',
      category_id: null
    }
  },
  mounted() {
    this.category_name = this.$route.params.categoryName
    this.grabCategoryId()
    $('.root').addClass('main')
  },

  methods: {
    grabPackages() {
      const url =
        `${this.$store.state.api_urls.packages}/?category=${this.category_id}`
      this.$axios.get(url).then((response) => {
        this.packages = response.data.results
        this.selectRandomImage()
      })
    },

    grabCategoryId() {
      const url =
        `${this.$store.state.api_urls.home}/packages/categoryid/${this.category_name}`
      this.$axios.get(url).then((response) => {
        this.category_id = response.data.category
        this.grabPackages()
      })
    },

    selectRandomImage() {
      let i
      const rand = this.shuffleArray(this.packages)
      if (rand) {
        this.category_image = this.$store.state.api_urls.home + rand[0].server.icon
      } else {
        console.log('Could not get shuffled array.')
      }
    },
    shuffleArray(sourceArray) {
      for (let i = 0; i < sourceArray.length - 1; i++) {
        const j = i + Math.floor(Math.random() * (sourceArray.length - i))

        const temp = sourceArray[j]
        sourceArray[j] = sourceArray[i]
        sourceArray[i] = temp
      }
      return sourceArray
    }
  }
}
</script>

<style>
</style>
