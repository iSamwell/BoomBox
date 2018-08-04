<template>
  <v-layout class="songs">
    <v-flex xs3 class="flex-styling">
      <v-carousel hide-delimiters hide-controls interval="2000" class="carousel-styling">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          reverse-transition="fade"
          transition="fade"
        >
          <v-flex>
          <img v-bind:src="item.src" class="images">
          </v-flex>
        </v-carousel-item>
      </v-carousel>
    </v-flex>

    <v-flex xs6 mt-4 pl-2>
      <panel title="Songs" >
        <search slot="action"/>
          <v-btn dark
                 slot="action"
                 class="cyan accent-5"
                 light
                 small
                 absolute
                 right
                 middle
                 fab
                 v-on:click="add"
          >+
          </v-btn>

        <div v-for="song in songs" v-bind:key="song.id">
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card color="cyan darken-2" class="white--text">
                    <v-container fluid grid-list-lg>
                    <v-layout row>
                      <v-flex xs-7>
                        <div>
                          <div class="headline">{{song.title}}</div>
                          <div>{{song.artist}}</div>
                          <div>{{song.album}}</div>
                          <router-link :to="{name:'song', params: {songId: song.id}}">View</router-link>
                        </div>
                      </v-flex>
                      <v-flex xs5>
                        <v-card-media :src="'http://' + song.albumImage"
                        height="125px"
                        contain/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import SongService from '@/services/SongService'
  import Panel from '@/components/Panel'
  import Search from './SearchPanel'
  export default {
    data () {
      return {
        songs: null,
        items: [
          {src: require('../assets/Mavins-Latest.jpg')},
          {src: require('../assets/Niniola.png')},
          {src: require('../assets/Ric-Hassani.jpg')},
          {src: require('../assets/tiwa Savage.jpg')}
          ]

      }
    },
    methods: {
      add() {
        this.$router.push('/songs/add');
      }
    },
    components: {
      Panel,
      Search
    },
    watch: {
      '$route.query.search': {
        immediate: true,
        async handler(value) {
          this.songs = (await SongService.index(value)).data
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .songs {
    margin-top: 60px;
  }
  .images{
    max-width: 100%;
    max-height: 100%;
    padding: 30px;
  }
  .flex-styling{
    height: 340px
  }
  .carousel-styling {
    box-shadow: none;
    height: 340px;
  }


</style>
