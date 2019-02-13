<template>
  <div class="ui container ">
    <div class="column">
      <h4 class="ui top attached header">
        API 2Key
      </h4>
      <div class="ui bottom attached segment">
        <p>Grab your API key to push new packages!</p>
        <p>Your API key provides you with a token that identifies you to the gallery. Keep this a secret. You can always regenerate your key at any time (invalidating previous keys) if your token is accidentally revealed. The You would pass your token like this: </p>

        <div class="ui form">
          <label for="apikey">
            Your API key is:
          </label>
          <br>
          <input
            id="apikey"
            v-model="api_key"
            type="text"
            class="form-control"
            style="width: 350px; display:inline-block"
            disabled
          > <span
            @click="copy_api"
            v-html="copy_icon"
          />
          <input
            id="copy-apikey"
            type="hidden"
            :value="api_key"
          >
          <br>
          <br>
          <a
            href="#"
            class="ui button"
            @click="generate_token"
          >
            Grab new token
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var octicons = require("octicons");

export default {
  middleware: 'auth',
  data() {
    return {
      api_key: '',
      copy_icon: ''
    }
  },
  mounted() {
    // this.$http.get('qwe')
    // this.copy_icon = octicons.clippy.toSVG();

    this.get_key()
  },
  methods: {
    get_key() {
      const url = `${this.$store.state.api_urls.home}/api/token/`
      this.$axios
        .post(url)
        .then((response) => {
          this.api_key = response.data.key
          this.loading = false

          if (respose.data.status == false) {
            swal('Oops!', response.data.message, 'error')
          } else {
            swal('Yess!', response.data.message, 'success')
          }
        })
        .catch((err) => {
          this.loading = false
        })
    },

    generate_token() {
      const url = `${this.$store.state.api_urls.home}/api/token/`
      const bodyFormData = new FormData()
      bodyFormData.set('generate_new_token', true)
      this.$axios
        .post(url, bodyFormData)
        .then((response) => {
          if (response.data.status == false) {
            swal('Oops!', response.data.message, 'error')
          } else {
            this.api_key = response.data.key
            this.$store.dispatch('token_generate', response.data.key).then((resp) => {
              swal('Yess!', response.data.message, 'success')
            }).catch((err) => {
              swal('Oops!', err, 'error')
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    copy_api() {
      const apikey = document.querySelector('#copy-apikey')
      apikey.setAttribute('type', 'text')
      apikey.select()

      try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        swal({
          title: 'Success',
          text: `Api key was copied ${msg}`,
          type: 'success',
          toast: true,
          position: 'bottom-end'
        })
      } catch (err) {
        console.log(err)
        alert('Oops, unable to copy')
      }

      apikey.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style>
</style>
