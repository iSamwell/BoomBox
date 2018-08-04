<template>
  <div>
      <v-card flat>
        <v-card-media :src="'http://' + song.albumImage"
                      height="250px" contain/>
        <div class="song-details">
          <h2 class="headline mb-0">{{song.title}}</h2>
          <h5> Artist: {{song.artist}} </h5>
          <h5> Album: {{song.album}} </h5>
          <div class="edit-button">
            <v-btn
              dark
              class="cyan"
              :to="{name: 'song-edit'}">
              Edit
            </v-btn>
          </div>

          <div class="bookmark-button">
            <v-btn
              v-if= "isUserLoggedIn && !isBookmarked"
              dark
              class="cyan"
              v-on:click="setAsBookmark">
              Bookmark
          </v-btn>

            <v-btn
              v-if= "isUserLoggedIn && isBookmarked"
              dark
              class="cyan"
              v-on:click="unBookmark">
              UnBookmark
            </v-btn>
          </div>

        </div>

      </v-card>
  </div>
</template>

<script>
  import BookmarksService from '@/services/BookmarksService'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        isBookmarked: false
      }
    },
    props: [
      'song'
    ],

    async mounted() {
      if(!this.isUserLoggedIn) {
        return
      }
      const bookmark = (await BookmarksService.index({
        songId: this.$store.state.route.params.songId,
        userId: this.$store.state.user.id
      })).data
      this.isBookmarked = !!bookmark
    },
    methods: {
      async setAsBookmark() {
        try {
          await BookmarksService.post({
            songId: this.song.id,
            userId: this.$store.state.user.id
          })
          this.isBookmarked = true
        } catch (err) {
          console.log(err)
        }

      },
      async unBookmark() {
        try {
          await BookmarksService.delete(this.$store.state.route.params.songId, {
            songId: this.song.id,
            userId: this.$store.state.user.id

          })
          this.isBookmarked = false
        } catch (err) {
          console.log(err)
        }
      }
    },
      computed: {
        ...mapState([
          'isUserLoggedIn'
        ])
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
