<template>
  <div>
    <div class="buttons column">
      <div class="bttns menu">
        <a class="ui button loginBtn" @click="showModal">
          <i class="user circle icon"/>
          <span>Login</span>
        </a>
      </div>
    </div>

    <div class="ui modal loginModal">
      <i class="close icon"/>
      <div class="header">Login to Choban</div>
      <form class="ui form segment attached">
        <div id="div_id_username" class="field">
          <label for="id_username" class="requiredField">
            Username
            <span class="asteriskField">*</span>
          </label>
          <input
            name="username"
            autofocus="autofocus"
            maxlength="254"
            required="required"
            id="id_username"
            class="textinput textInput"
            type="text"
            v-model="username"
          >
        </div>
        <div id="div_id_password" class="field">
          <label for="id_password" class="requiredField">
            Password
            <span class="asteriskField">*</span>
          </label>
          <input
            name="password"
            required="required"
            id="id_password"
            class="textinput textInput"
            type="password"
            v-model="password"
            @keyup.enter.prevent="login"
          >
        </div>
      </form>
      <div class="actions">
        <div class="ui black deny button">Nope</div>
        <div class="ui positive right labeled icon button" @click="login">
          Yep, that's me. Login
          <i class="checkmark icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    showModal() {
      $(".loginModal").modal("show");
    },

    login() {
      const data = {
        username: this.username,
        password: this.password
      };

      this.$store
        .dispatch("localStorage/auth_login", data)
        .then(() => {
          swal({
            title: "Logged in!",
            text: "Successfully logged in! You will be redirecting soon.",
            type: "success",
            toast: true,
            position: "bottom-end"
          });
        })
        .catch(err => console.log(err));
    },

    validated_forms() {
      if (this.username == null || this.password == null) {
        swal(
          "Oops!",
          "You have empty field(s). Please fill them if you want to contiune",
          "error"
        );

        return false;
      }
      return true;
    }
  }
};
</script>
