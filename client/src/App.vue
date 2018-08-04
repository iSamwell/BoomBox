<template>
  <div id="app">
    <v-app>
      <HeaderComp/>

      <main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </main>
    </v-app>


  </div>
</template>

<script>
  import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    HeaderComp: Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: auto;
  height: 80%;
  margin-left: -5px;
  margin-right: -24px;

}

</style>
