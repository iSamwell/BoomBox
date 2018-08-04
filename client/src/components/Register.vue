<template>
  <v-layout align-center class="register">
     <div class="upper-text">
       <h3 style="color:ghostwhite ">REGISTER</h3>
     </div>
      <div class="reg-panel">
         <form>
           <div class="text-field">
             <input
               type="text"
               placeholder="First Name"


             />
           </div>

           <br>
           <div class="text-field">
             <input
               type="text"
               placeholder="Last Name"

             />
           </div>

           <br>
           <div class="text-field">
             <input
               type="text"
               placeholder="Username"

             />
           </div>

           <br>
           <div class="text-field">
             <input
               type="email"
               placeholder="Email"
               v-model="email"

             />
           </div>
            <br>
            <div class="text-field">
             <input
               type="password"
               placeholder="Password"
               v-model="password"
             />
            </div>
           <br>
           <div class="text-field">
             <input
               type="password"
               placeholder="Confirm password"

             />
           </div>

             <br>
           <div class="v-button">
             <v-btn id="button" dark class="cyan" v-on:click="register">Submit</v-btn>
           </div>
            <br>
            <div class="error" v-html="error">{{error}}</div>

         </form>
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
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        await this.$store.dispatch('setToken', response.data.token);
        await this.$store.dispatch('setUser', response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
        console.log(error);
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
  .register {
    position: relative;
    background: url("../assets/boy-music.jpg") no-repeat center center fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
    padding-bottom: 55%;
    overflow: hidden;
    left: -5px;

  }
  form {
    margin-top: 20px;
  }
  .reg-panel {
    margin-top: 100px;
    height: auto;
    width: 550px;
    display: block;
    background: rgba(0,0,0,.7);
    padding: 1em;
    border-radius: 3px;
    opacity: 1;
    margin-left: -150px;
  }
  .text-field {
    background-color: white;
    height: 40px;
  }
  input[type=email],
  input[type=text],
  input[type=password] {
    height: 100%;
    width:100%;
    border: 2px solid cyan;
    font-size: 18px;


  }
  .v-button {
    margin-right: 440px;
  }
  #button {
    margin-left: 0px
  }
  input:focus {
    border: 1px solid cyan;
    box-shadow: 0 1.5px 1px rgba(190,190,190,.5), 0 0 0 1px #f5f7f8;
  }
  input:hover {
    border: 2px solid cyan;
  }
  .upper-text {
    margin-top: -430px;
    margin-left: 750px;
    font-family: BushScriptMT;

  }



</style>
