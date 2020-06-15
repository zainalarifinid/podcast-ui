<template>
    <v-content>
        <v-layout>
            <v-card class="podcast-card" >
                <v-flex align-content-space xs 12 sm8 md8 >
                    <v-btn @click="backPage" >
                        Back
                    </v-btn>
                    
                    <v-btn @click="editPodcast" >
                        Edit
                    </v-btn>

                </v-flex>
                <v-flex xs 12 sm8 md8 >
                    Title <span>: {{podcast.title}}</span>
                </v-flex>
                <v-flex xs 12 sm8 md8 >
                    Duration <span>: {{podcast.duration}}</span>
                </v-flex>
                <v-flex xs 12 sm8 md8 >
                    Description <span>: {{podcast.description}}</span>
                </v-flex>
                <v-flex xs 12 sm8 md8 >
                    <iframe width="420" height="315"
                    :src="podcast.youtubeLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')" >
                    </iframe>
                    <br/>
                    Youtube Link <span>: <a :href="podcast.youtubeLink">Go To Video</a></span>
                </v-flex>

                <v-btn
                    v-if="podcast.user.username === this.currentUser.username"
                    color="danger"
                    @click="deletePodcast"
                >
                    Delete
                </v-btn>

                 <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        color="primary"
                        dark
                        v-on="on"
                        >
                        Playlist
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile
                        v-for="(item, index) in playlists"
                        :key="index"
                        @click="togglePlaylist(item)"
                        >
                        <v-list-tile-title>{{ item.title }} 
                            <v-icon v-if="item.inPlaylist === true" >check</v-icon>
                        </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                    </v-menu>

            </v-card>
        </v-layout>
    </v-content>
</template>

<script>

import { mapGetters } from "vuex";
import stores from "../stores";
import { FETCH_DETAIL_PODCAST, FETCH_PLAYLIST, PLAYLIST_ADD, PLAYLIST_REMOVE, PODCAST_DELETE } from '../stores/actionTypes';

export default {
    name: 'DetailPodcast',
    data() {
        return {
            
        }
    },
    props: {
        idPodcast: { type: String, required: true },
        username: { type: String, required: true }
    },
    computed: {
        ...mapGetters(["podcast", "playlists", "currentUser"])
    },
    mounted(){
        // console.log("currentUser", this.currentUser);
        this.fetchPodcast();
    },
    methods: {
        fetchPodcast() {
            this.$store.dispatch(FETCH_DETAIL_PODCAST, this.idPodcast);
            this.$store.dispatch(FETCH_PLAYLIST, { username:  this.username, idPodcast: this.idPodcast })
        },

        togglePlaylist(item) {
            console.log("togglePlaylist CLicked", item.id, this.idPodcast);
            if(item.inPlaylist){
                console.log("remove");
                this.$store.dispatch(PLAYLIST_REMOVE, { idPlaylist: item.id, idPodcast: this.idPodcast })
                            .then( () => {
                                this.$store.dispatch(FETCH_PLAYLIST, { username:  this.username, idPodcast: this.idPodcast });
                            });
            }else{
                this.$store.dispatch(PLAYLIST_ADD, { idPlaylist: item.id, idPodcast: this.idPodcast })
                            .then( () => {
                                this.$store.dispatch(FETCH_PLAYLIST, { username:  this.username, idPodcast: this.idPodcast });
                            });
            }
        },

        deletePodcast() {

            this.$store.dispatch(PODCAST_DELETE, this.idPodcast)
                       .then( () => {
                           this.$router.push({
                                name: "ProfilePage",
                                params: { username: this.username }
                            })
                       })

            // console.log("deletePodcast Clicked", this.idPodcast);
        },

        backPage() {
            this.$router.go(-1);
        },

        editPodcast() {
            this.$router.push({
                name: "EditPodcast",
                params: {
                    idPodcast: this.idPodcast
                }
            });
        }
    }
}
</script>

<style scoped>

.podcast-card{
    margin: 70px;
    margin-top: 70px;
    padding: 50px;
}

</style>


