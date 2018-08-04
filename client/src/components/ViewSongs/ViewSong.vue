<template>
  <v-layout class="view" row wrap>
    <div class="song-details">

        <song-data :song="song" />

    </div>

    <div class="lyrics">

      <textarea readonly v-model="song.lyrics">
      </textarea>

    </div>


    <div class="youtube">
        <youtube :youtubeId="song.youtubeId"></youtube>
    </div>

  </v-layout>
</template>

<script>
  import SongService from '@/services/SongService'
  import Panel from '@/components/Panel'
  import SongData from "./SongData";
  import Youtube from "@/components/ViewSongs/YouTube";
  export default {
    data () {
      return {
       song: {}
      }
    },
   async mounted() {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongService.show(songId)).data
     console.log(this.song)
    },
    components: {
      SongData,
      Panel,
      Youtube
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .view {
    margin-top: 50px;
  }
  .song-details {
    width: 50%;
    height: 300px;
  }
  textarea {
    width: 90%;
    font-family: monospace;
    height: 300px;
    border-style: none;
    rows: 15;
  }
  .lyrics {
    width: 50%;
    height: 300px;
  }
  .youtube {
    margin-top: 15px;
    margin-left: 40%;
    padding: 10px;
  }

</style>

