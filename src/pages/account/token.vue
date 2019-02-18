<template>
  <div class="ui container">
    <div class="column">
      <h4 class="ui top attached header">API 2Key</h4>
      <div class="ui bottom attached segment">
        <div class="ui info message">
          <i class="close icon"></i>
          <div class="header">Was this what you wanted?</div>
          <ul class="list">
            <li>Your API key provides you with a token that identifies you to the gallery. Keep this a secret. You can always regenerate your key at any time (invalidating previous keys) if your token is accidentally revealed. The You would pass your token like this:</li>
            <li>
              <span
                class="bold"
              >Please remember that you have only two rights in a day to change your token.</span>
            </li>
          </ul>
        </div>
        <div class="ui form">
          <label for="apikey">Your API key is:</label>
          <br>
          <input
            id="apikey"
            v-model="api_key"
            type="text"
            class="form-control"
            style="width: 350px; display:inline-block"
            disabled
          >
          <span @click="copy_api" v-html="copy_icon"/>
          <input id="copy-apikey" type="hidden" :value="api_key">
          <br>
          <br>
          <a href="#" class="ui button" @click.prevent="generate_token()">Grab new token</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      api_key: "",
      copy_icon: ""
    };
  },
  mounted() {
    this.get_key();
  },
  methods: {
    get_key() {
      const url = `${this.$store.state.api_urls.home}/api/token/`;
      this.$axios
        .get(url)
        .then(response => {
          this.api_key = response.data.key;
        })
        .catch(err => {
          console.log(err);
        });
    },

    generate_token() {
      const url = `${this.$store.state.api_urls.home}/api/token/`;

      this.$axios
        .post(url)
        .then(response => {
          if (response.data.status == false) {
            this.$errorMessage("Oops!", response.data.message);
          } else {
            this.api_key = response.data.key;
            this.$store
              .dispatch("token_generate", response.data.key)
              .then(resp => {
                this.$successMessage("Yess!", response.data.message);
              })
              .catch(err => {
                this.$errorMessage("Oops!", err);
              });
          }
        })
        .catch(err => {
          const responseData = err.response.data;
          if (responseData.detail) {
            if (
              responseData.detail ===
              "You do not have permission to perform this action."
            ) {
              return this.$errorMessage(
                "You reached your daily limit, please try again tomorrow."
              );
            }

            return ths.$errorMessage(responseData.detail);
          }

          console.log(err);
        });
    },
    copy_api() {
      const apikey = document.querySelector("#copy-apikey");
      apikey.setAttribute("type", "text");
      apikey.select();

      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        this.$successMessage("Success!", `Api key was copied ${msg}`);
      } catch (err) {
        console.log(err);
        alert("Oops, unable to copy");
      }

      apikey.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style>
</style>
