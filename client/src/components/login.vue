<template>
  <v-layout align-center class="login-layout">

      <div class="transbox">
        <div class="text-box">
          <input
            id="email"
            required
            type="email"
            v-model="email"

          />
        </div>
        <br>

          <div class="text-box">
            <input
              id="password"
              required
              type="password"
              v-model="password"
            />
          </div>

          <div>
            <br>
            <div class="error" v-html="error">{{error}}</div>
            <br>
            <v-btn dark class="cyan" v-on:click="login">Login</v-btn>
          </div>
      </div>


  </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  import Panel from '@/components/Panel'
  export default {
     data () {
       return{
         email: '',
         password: '',
         error: null
       }
     },
     methods: {
       async login () {
         try {
           const response = await AuthenticationService.login({
             email: this.email,
             password: this.password
           })
           console.log(response);
           await this.$store.dispatch('setToken', response.data.token);
           await this.$store.dispatch('setUser', response.data.user);
           this.$router.push('/songs')

         } catch (error) {
           this.error = error.response.data.error;

         }
       }
     },
    components: {
       Panel
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red
  }
  .login-layout {
    position: relative;
    background: url("../assets/boy-music.jpg") no-repeat center center fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
    padding-bottom: 55%;
    overflow: hidden;

  }
  .transbox {
    height: auto;
    width: 340px;
    display: block;
    background: rgba(0,0,0,.5);
    padding: 1em;
    border-radius: 3px;
    opacity: 1;
    margin-top:100px;
    margin-left: 888px;
  }
  .text-box {
    background-color: white;
    height: 48px;
  }
  input[type=email],
  input[type=password] {
    height: 100%;
    width:100%;
    border: 1px solid cyan;
    font-size: medium;

  }

</style>
