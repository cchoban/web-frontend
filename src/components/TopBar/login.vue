<template>
  <div>
    <div class="buttons column">
      <div class="bttns menu">
        <a class="ui button loginBtn" @click="showModal">
          <i class="user circle icon" />
          <span>Login</span>
        </a>
      </div>
    </div>
    <ya-modal v-model="activeModal">
      <div class="ui header">
        Login to Choban
      </div>
      <div class="content">
        <form class="ui form">
          <div id="div_id_username" class="field">
            <label for="id_username" class="requiredField">
              Username
              <span class="asteriskField">*</span>
            </label>
            <input
              id="id_username"
              v-model="username"
              name="username"
              autofocus="autofocus"
              maxlength="254"
              required="required"
              class="textinput textInput"
              type="text"
            >
          </div>
          <div id="div_id_password" class="field">
            <label for="id_password" class="requiredField">
              Password
              <span class="asteriskField">*</span>
            </label>
            <input
              id="id_password"
              v-model="password"
              name="password"
              required="required"
              class="textinput textInput"
              type="password"
              @keyup.enter.prevent="login"
            >
          </div>
        </form>
      </div>
      <div class="actions">
        <div class="ui black deny button" @click="activeModal=false">
          Nope
        </div>
        <div class="ui positive right labeled icon button" @click="login">
          Yep, that's me. Login
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
      username: '',
      password: '',
      activeModal: false
    }
  },
  methods: {
    showModal() {
      this.activeModal = true
    },

    async login() {
      const data = {
        username: this.username,
        password: this.password
      }

      if (!this.validated_forms()) {
        return false
      }

      await this.$auth
        .loginWith('local', { data: data })
        .then((resp) => {
          this.activeModal = false
          return this.$successMessage(
            'Logged in!',
            'Successfully logged in! You will be redirecting soon.'
          )
        })
        .catch((err) => {
          this.activeModal = false
          console.log(err)
          return this.$errorMessage(
            'Could not log in!',
            'Please double check your authentication details.'
          )
        })
    },

    validated_forms() {
      if (this.username == '' || this.password == '') {
        swal(
          'Oops!',
          'You have empty field(s). Please fill them if you want to contiune',
          'error'
        )

        return false
      }

      return true
    }
  }
}
</script>
