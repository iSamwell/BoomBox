<template>
  <v-toolbar fixed class="cyan" id="mar-t" mb-6 dark>
    <v-toolbar-title class="mr-4" >
      <span class="home" v-on:click="navigateTo({name: 'root'})">Tab-Tracker</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark v-on:click="navigateTo({name: 'songs'})">Browse</v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark v-on:click="navigateTo({name: 'login'})" >
        Login
      </v-btn>

      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark v-on:click="navigateTo({name: 'Register'})">
          Sign Up
      </v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn" flat dark v-on:click="logout">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      },
      async logout() {
       await this.$store.dispatch('setToken', null);
       await this.$store.dispatch('setUser', null);
        this.$router.push('/');
      }
    }

  }
</script>

<style>
  .home {
    cursor: pointer
  }

</style>
