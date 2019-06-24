<template>
    <v-app>
        <v-content>
            <v-layout align-center class="profile-container" >
                <v-flex xs-10 sm10 md10 >
                    <v-btn
                        color="danger"
                        @click="logout"
                    >
                        Logout
                    </v-btn>
                    <v-card class="profile-card" >
                        <v-flex xs12 sm8 md8 >
                            Username <span>: {{profile.username}}</span>
                        </v-flex>
                        <v-flex xs12 sm8 md8 >
                            Email <span>: {{profile.email}}</span>
                        </v-flex>
                        <v-flex xs12 sm8 md8 >
                            Password <span>: {{profile.password}}</span>
                        </v-flex>
                        <v-flex xs12 sm8 md8 >
                            <v-layout>
                                <v-flex xs6 sm6 md6 >
                                    Follower <span>: <router-link :to="detailFollower" >{{profile.followersCount}}</router-link> </span>
                                </v-flex>
                                <v-flex xs6 sm6 md6 >
                                    Following <span>: {{profile.followingCount}} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 sm8 md8 >
                            <v-layout>
                                <router-link :to="{ name: 'PlaylistEditor' }" >
                                    <v-card class="playlist-card" >
                                        Add New Playlist
                                    </v-card>
                                </router-link>
                                <v-card v-for="(playlist, index) in profile.playlists" 
                                    :key="index"
                                    class="playlist-card"
                                >
                                    {{ playlist.title }}
                                </v-card>
                            </v-layout>
                        </v-flex>
                        
                        <v-flex xs12 sm12 md12 style="margin-top: 20px;" >
                            <v-layout>
                                <router-link :to="{ name: 'PodcastEditor' }" >
                                    <v-card class="playlist-card" >
                                        Add New Podcast
                                    </v-card>
                                </router-link>
                                <FeedPreview 
                                    v-for="(podcast, index) in profile.podcasts"
                                    :podcast="podcast"
                                    :key="podcast.title+index"
                                    :username="username"
                                />
                            </v-layout>
                        </v-flex>


                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import { FETCH_PROFILE_USER, LOGOUT,  } from "../stores/actionTypes";
import FeedPreview from "../components/FeedPreview";

export default {
    name: "ProfilePage",
    data() {
        return {};
    },
    components: {
        FeedPreview
    },
    props: {
        username: { type: String, required: true }
    },
    computed: {
        ...mapGetters(["profile"])
    },
    mounted(){
        // this.resetProfileState();
        this.fetchProfile();
    },
    methods: {
        fetchProfile() {
            console.log("Profile Page Mounted", this.username, this.$route.params.username);
            this.$store.dispatch(FETCH_PROFILE_USER, this.username);
        },

        resetProfileState() {
            this.$store.dispatch(FETCH_PROFILE_RESET);
        },

        logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "HomePage" })
            })
        },

        detailFollower() {
            console.log("detail Follower");
        },

        detailFollowing() {
            console.log("detail Following");
        },

        createPlaylist() {
            return {
                name: "CreatePlaylist",
            }
        }
    }
}
</script>

<style scoped>

    .profile-container{
        padding-top: 50px;
        padding-left: 50px;
    }

    .profile-card{
        padding: 20px;
    }

    .playlist-card{
        padding: 20px;
        margin: 0px 10px;
    }

</style>
