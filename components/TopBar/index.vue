<template>
  <div>
    <div class="push">
      <div class="window-title column">
        <a href="#" class="removelink">{{ $store.state.title }}</a>
      </div>
      <div class="ui menu header-navbar">
        <div class="ui two column container fluid">
          <div class="buttons column">
            <div class="backBtn bttns" @click="goBack">
              <i class="angle left icon"/>
            </div>

            <div class="forwardBtn bttns" @click="goForward">
              <i class="angle right icon"/>
            </div>

            <div class="homeBtn bttns" @click="refresh">
              <i class="redo icon"/>
            </div>

            <div class="reloadBtn bttns" @click="goHome">
              <i class="home icon"/>
            </div>
          </div>

          <div class="searchField column">
            <div class="ui form">
              <div class="field">
                <input
                  name="packageName"
                  placeholder="Search for your favorite package"
                  type="text"
                  v-model="$store.state.search_key"
                  @keyup.enter.prevent="redirectToSearch"
                >
              </div>
            </div>
          </div>
          <login v-if="!$store.getters['localStorage/isAuthenticated']"/>
          <div v-else>
            <userAccount/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAccount from "@/components/TopBar/userAccount.vue";
import login from "@/components/TopBar/login.vue";

export default {
  components: {
    userAccount,
    login
  },
  methods: {
    goBack() {
      history.back();
    },

    goForward() {
      history.forward();
    },

    goHome() {
      this.$router.push("/");
    },

    refresh() {
      window.location.reload();
    },

    onPackagePage() {
      if (this.$store.state.isPage == true) {
        return true;
      }
      return false;
    },
    redirectToSearch() {
      if (this.$route.name != "Search") {
        this.$router.push("/search");
      }

      const url = `${this.$store.state.api_urls.packages}/?search=${
        this.$store.state.search_key
      }`;
      this.$axios
        .get(url)
        .then(response => {
          this.packages = response.data.results;
          this.count = response.data.count;
          this.$store.state.loading = false;
          this.$store.state.package_page.packages = response.data.results;
          this.$store.state.package_page.count = response.data.count;
          this.$store.state.package_page.nextUrl = response.data.next;
          this.$store.state.package_page.previousUrl = response.data.previous;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style type="scss" scoped>
.push {
  margin-bottom: 50px;
}
</style>
