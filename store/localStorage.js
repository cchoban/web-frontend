import { SITE_URL } from "./index";

export const state = () => ({
  auth: {
    status: "",
    user: "",
    token: ""
  }
});

export const actions = {
  async auth_login({ commit }, credentials) {
    new Promise((resolve, reject) => {
      this.$axios
        .post(`${SITE_URL}/api/login/`, credentials)
        .then(resp => {
          const token = resp.data.token;
          state.token = token;
          state.user = JSON.stringify(resp.data.user);
          this.$axios.setToken(token, "Token");
          commit("auth_success", resp.data);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          state.token = undefined;
          state.user = undefined;
          reject(err);
        });
    });
  }
};

export const getters = {
  isAuthenticated: state => state.auth.token ? true : false,
  authStatus: state => state.auth.status,
  userDetails: state => state.user
};

export const mutations = {
  auth_success: (state, data) => {
    state.auth.token = data.token;
    state.auth.user = data.user;
  },
  auth_error: state => {
    state.auth.status = "error";
  }
};
