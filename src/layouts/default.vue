<template>
  <div id="app">
    <TopBar />
    <nuxt />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar/index'
import '@/assets/css/main.scss'

export default {
  components: {
    TopBar
  },
  head() {
    return {
    titleTemplate: `%s | Choban`

    }
  }
}
</script>
