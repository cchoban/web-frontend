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

    <div class="ui modal loginModal">
      <i class="close icon" />
      <div class="header">
        Login to Choban
      </div>
      <form class="ui form segment attached">
        <div id="div_id_username" class="field">
          <label for="id_username" class="requiredField">
            Username
            <span class="asteriskField">
              *
            </span>
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
            <span class="asteriskField">
              *
            </span>
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
      <div class="actions">
        <div class="ui black deny button">
          Nope
        </div>
        <div class="ui positive right labeled icon button" @click="login">
          Yep, that's me. Login
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
      username: '',
      password: ''
    }
  },
  methods: {
    showModal() {
      $('.loginModal').modal('show')
    },

    async login() {
      const data = {
        username: this.username,
        password: this.password
      }

      if (!this.validated_forms()) {
        return false
      }

      await this.$auth.loginWith('local', { data: data }).then((resp) => {
        return this.$successMessage('Logged in!', 'Successfully logged in! You will be redirecting soon.')
      }).catch((err) => {
        $('.loginModal').modal('hide')
        console.log(err)
        return this.$errorMessage('Could not log in!', 'Please double check your authentication details.')
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
