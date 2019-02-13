<template>
  <div>
    <div class="ui container">
      <form class="ui form segment">
        <p>Tell Us About Yourself</p>
        <div class="two fields">
          <div :class="firstnameError ? 'field error' : 'field'">
            <label>Name</label>
            <input v-model="firstname" placeholder="First Name" name="firstname" type="text">
          </div>
          <div <div :class="lastnameError ? 'field error' : 'field'">
            <label>Last name</label>
            <input v-model="lastname" placeholder="Sur name" name="lastname" type="text">
          </div>
        </div>
        <div class="two fields">
          <div :class="usernameError ? 'field error' : 'field'">
            <label>Username*</label>
            <input v-model="username" placeholder="Username" name="username" type="text">
          </div>
          <div :class="emailError ? 'field error' : 'field'">
            <label>Email*</label>
            <input v-model="email" placeholder="Email" name="email" type="email">
          </div>
        </div>

        <div class="two fields">
          <div :class="passwordError ? 'field error' : 'field'">
            <label>Password*</label>
            <input id="password" v-model="password" type="password" placeholder="Password" name="password">
          </div>

          <div :class="passwordConfError ? 'field error' : 'field'">
            <label>Password Confirmation*</label>
            <input v-model="password_confirmation" type="password" placeholder="Password Confirmation" name="password_confirmation">
          </div>
        </div>

        <div class="ui primary submit button" @click.prevent="validate">
          Submit
        </div>
        <div v-if="messages.length > 0" class="ui error message" :style="messages.length > 0 ? 'display: block' : ''">
          <div class="header">
            Ooops!
          </div>
          <p>
            <ul>
              <li v-for="message in messages" v-html="message" />
            </ul>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      messages: [],
      firstnameError: false,
      lastnameError: false,
      usernameError: false,
      emailError: false,
      passwordError: false,
      passwordConfError: false
    }
  },
  methods: {
    register() {
      const postUri = this.$store.state.api_urls.api + '/register/'
      const data = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }

      this.$axios
        .post(postUri, data)
        .then((resp) => {
          swal({
            title: 'Successfully registered!',
            text: 'You can now login.',
            type: 'success',
            toast: true,
            position: 'bottom-end'
          })
        })
        .catch((err) => {
          console.log('err ' + err)
        })
    },
    validate() {
      if (!this.username) {
        this.usernameError = true

        if (this.messages.length < 4) {
          this.messages.push(
            'Please do not leave <span class="bold"> username </span> empty.'
          )
        }
      } else if (this.usernameError) {
        this.usernameError = false
        this.messages = []
      }

      if (!this.email) {
        this.emailError = true
        if (this.messages.length < 4) {
          this.messages.push(
            'Please do not leave <span class="bold"> email </span> empty.'
          )
        }
      } else if (this.emailError) {
        this.emailError = false
        this.messages = []
      }

      if (!this.password || !this.password.lenght > 6) {
        this.passwordError = true
        if (this.messages.length < 4) {
          this.messages.push(
            'Please do not leave <span class="bold"> password </span> empty, and make sure your password is <span class="bold"> more than 6 lenght. </span>'
          )
        }
      } else if (this.passwordError) {
        this.passwordError = false
        this.messages = []
      }

      if (!this.password_confirmation) {
        this.passwordConfError = true
        if (this.messages.length < 4) {
          this.messages.push(
            'Please do not leave <span class="bold"> password confirmation </span> empty.'
          )
        }
      } else if (this.passwordConfError) {
        this.passwordConfError = false
        this.messages = []
      }

      if (this.password_confirmation !== this.password) {
        this.passwordConfError = true
        if (this.messages.length < 4) {
          this.messages.push(
            '<span class="bold"> Password confirmation </span> must be equal with you password.'
          )
        }
      }

      if (
        !this.usernameError &&
        !this.emailError &&
        !this.passwordError &&
        !this.passwordConfError
      ) {
        return this.register()
      }
    }
  }
}
</script>

<style>
.form-group {
  padding: 10px;
}
</style>
