<template>
  <div>
    <div class="buttons column">
      <div class="bttns menu">
        <a class="ui button loginBtn" @click="showAccountMenu">
          <i class="user circle icon" />
          <span>{{ user.username }}</span>
        </a>
      </div>
    </div>

    <ya-modal v-model="activeModal" class="accountModal">
      <i class="close icon" />
      <div class="header">
        Profile Picture
      </div>
      <div class="image content">
        <div class="ui medium image">
          <img :src="user.gravatar">
        </div>
        <div class="description">
          <div class="ui header">
            Account configuration
          </div>
          <br>
          <nuxt-link to="/account/token" class="ui green button">
            Get API Token
          </nuxt-link>
        </div>
      </div>
      <div class="actions">
        <div class="ui red deny right labeled icon button" @click="logout">
          Logout
          <i class="checkmark icon" />
        </div>
        <div class="ui deny right labeled icon button">
          Done
          <i class="checkmark icon" />
        </div>
      </div>
    </ya-modal>
  </div>
</template>

<script>
import YaModal from 'vue-ya-semantic-modal'

export default {
  components: {
    YaModal: YaModal()
  },
  data() {
    return {
      user: this.$store.state.auth.user,
      activeModal: false
    }
  },
  watch: {
    '$route'(to, from) {
      this.activeModal = false
    }
  },
  methods: {
    showAccountMenu() {
      this.activeModal = true
    },

    message(title, message, type) {
      swal({
        title,
        text: message,
        type,
        toast: true,
        position: 'bottom-end'
      })
    },
    async logout() {
      await this.$auth.logout().then((resp) => {
        this.$successMessage('Logged out!', 'Successfully logged out! See you soon!')
      }).catch((err) => {
        this.$errorMessage('Ooops!', 'Could not logout?')
      })
    },
    redirect(url) {
      if (url != '') {
        window.location.href = url
      }
    }
  }
}
</script>

<style>
</style>
