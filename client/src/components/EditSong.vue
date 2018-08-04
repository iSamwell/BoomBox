<template>
  <v-layout class="add-song">
    <v-flex xs8>
      <panel title="Song Metadata">
        <v-text-field
          required
          :rules="[required]"
          label="Title"
          v-model="song.title"
        />

        <v-text-field
          label="Artist"
          v-model="song.artist"
        />

        <v-text-field
          label="Genre"
          v-model="song.genre"
        />

        <v-text-field
          label="Album"
          v-model="song.album"
        />

        <v-text-field
          label="youtube Id"
          v-model="song.youtubeId"
        />

         <input type="file" v-on:change="onFileSelected">

      </panel>
    </v-flex>
    <v-flex xs8 ml-4>
      <panel title="Song structure">
      <v-text-field
        label="Lyrics"
        multi-line
        v-model="song.lyrics"
      />

      <v-text-field
        label="Tab"
        multi-line
        v-model="song.tab"
      />
      </panel>
      <div>{{error}}</div>
      <v-btn dark class="cyan btn-pos" @click="saveSong"> Save Song</v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
  import Panel from '@/components/Panel'
  import SongService from '@/services/SongService'
  export default {
    data () {
      return {
        selectedImage: null,
        song: {
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImage: null,
          youtubeId: null,
          lyrics: null,
          tab: null
        },
        error: null,
        required: (value)=> !!value || 'Required.'
      }
    },
    methods: {
      onFileSelected(event) {
        this.song.albumImage = event.target.files[0];
        console.log(event)
      },

      async saveSong() {
        this.error = null;

        const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all fields';
          return;
        }
        try {
          const fd = new FormData()
          fd.append('title', this.song.title)
          fd.append('artist', this.song.artist)
          fd.append('genre',this.song.genre)
          fd.append('album',this.song.album)
          fd.append('albumImage', this.song.albumImage, this.song.albumImage.name)
          fd.append('youtubeId', this.song.youtubeId)
          fd.append('lyrics',this.song.lyrics)
          fd.append('tab', this.song.tab)
          const songId = this.$store.state.route.params.songId
          await SongService.put(songId, fd);
          this.$router.push(`/songs/${songId}`);

        } catch (err) {
          console.log(err);
        }
      }
    },
    async mounted () {
      try {
        const songId = this.$store.state.route.params.songId
        this.song = (await SongService.show(songId)).data
      } catch(err) {
        console.log(err)
      }

    },
    components: {
      Panel
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .add-song {
    margin-top: 60px;
  }

</style>
