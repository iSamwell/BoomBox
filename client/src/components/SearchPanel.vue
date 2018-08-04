<template>
  <v-layout row align-center style="max-width: 400px" class="ml-5">
    <v-text-field
      v-model="search"
      placeholder="search..."
      single-line
      append-icon="search"
      color="white"
      hide-details
      absolute
    />
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        search: ''
      }
    },
    watch: {
      search () {
        const route = {
          name: 'songs'
        }
        if (this.search !== '') {
          route.query = {
            search: this.search
          }
        }
        this.$router.push(route)
      },
      '$route.query.search': {
        immediate: true,
        handler(value) {
          this.search = value
        }
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
