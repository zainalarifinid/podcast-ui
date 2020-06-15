<template>
    <v-content>
        <v-card class="playlist-card" >

            <v-btn @click="backPage" >
                Back
            </v-btn>

            <v-flex xs 12 sm8 md8 >
                <h2>{{playlist.title}}</h2> 
                <v-btn @click="editPlaylist"  >
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn @click="deletePlaylist"  >
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs 12 sm8 md8 >
                <div style="overflow-y: auto;" >
                <FeedPreview 
                    v-for="(podcast, index) in playlist.podcasts"
                    :podcast="podcast"
                    :key="podcast.title+index"
                    :username="username"
                />
                </div>
            </v-flex>
        </v-card>
    </v-content>
</template>

<script>

import { mapGetters } from "vuex";
import { FETCH_DETAIL_PLAYLIST, PLAYLIST_DELETE, PLAYLIST_EDIT } from '../stores/actionTypes';
import FeedPreview from "../components/FeedPreview";

export default {
    name: 'DetailPlaylist',
    data() {
        return {

        }
    },
    components: {
        FeedPreview
    },
    props: {
        idPlaylist: { type: String, required: true },
        username: { type: String }
    },
    computed: {
        ...mapGetters(["playlist"])
    },
    mounted() {
        this.fetchDetailPlaylist();
    },
    methods: {
        fetchDetailPlaylist() {
            this.$store.dispatch(FETCH_DETAIL_PLAYLIST, this.idPlaylist);
            // console.log(this.playlist);
        },

        backPage() {
            this.$router.go(-1);
        },

        editPlaylist() {
            this.$router.push({
                name: "EditPlaylist",
                params: {
                    username: this.username,
                    idPlaylist: this.idPlaylist,
                    title: this.playlist.title
                }
            });
        },

        deletePlaylist() {
            this.$store.dispatch(PLAYLIST_DELETE, {id: this.idPlaylist})
                       .then( () => {
                           this.$router.push({
                                name: "ProfilePage",
                                params: {
                                    username: this.username
                                }
                            });
                       });
        }

    }
}
</script>

<style scoped>
    .playlist-card{
        margin: 70px;
        margin-top: 70px;
        padding: 50px;
    }
</style>


