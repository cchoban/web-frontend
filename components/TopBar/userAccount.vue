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

    <div class="ui modal accountModal">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.auth.user
    }
  },
  methods: {
    showAccountMenu() {
      $('.accountModal').modal('show')
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
