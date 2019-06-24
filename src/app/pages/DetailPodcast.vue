<template>
    <v-content>
        <v-layout>
            <v-card class="podcast-card" >
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
                    Youtube Link <span>: {{podcast.youtubeLink}}</span>
                </v-flex>

                <v-btn
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
import { FETCH_DETAIL_PODCAST, FETCH_PLAYLIST, PLAYLIST_ADD, PLAYLIST_REMOVE } from '../stores/actionTypes';

export default {
    name: 'DetailPodcast',
    data() {
        return {
            userPlaylist: [ { title: "Playlist A" }, { title: "Playlist B" }, { title: "Playlist C" } ]
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
        console.log("currentUser", this.currentUser);
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
                this.$store.dispatch(PLAYLIST_REMOVE, { idPlaylist: item.id, idPodcast: this.idPodcast });
            }else{
                this.$store.dispatch(PLAYLIST_ADD, { idPlaylist: item.id, idPodcast: this.idPodcast });
            }
            this.$store.dispatch(FETCH_PLAYLIST, { username:  this.username, idPodcast: this.idPodcast });
        },

        deletePodcast() {
            console.log("deletePodcast Clicked", this.idPodcast);
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


