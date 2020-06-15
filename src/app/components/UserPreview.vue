<template>
    <v-layout align-center >
        <v-flex xs10 sm10 md10 >
            <router-link :to="detailSearch()" >
                <h2 v-text="searchResult.username" />
                <p v-text="searchResult.email" />
            </router-link>
        </v-flex>
        <v-flex xs2 sm2 md2 >
            <v-btn
            v-if="searchResult.username !== currentUser.username"
                @click="toggleFollow"
            >
                {{ followingBtn }}
            </v-btn>
        </v-flex>
    </v-layout> 
</template>

<script>

import { mapGetters } from 'vuex';
import { CHECK_FOLLOWING, PROFILE_FOLLOW, PROFILE_UNFOLLOW } from '../stores/actionTypes';


export default {
    name: 'UserPreview',
    data(){
        return { 
            followingBtn: 'Follow'
        };
    },
    props: {
        searchResult: { type: Object, required: true }
    },
    mounted(){
        this.checkFollowing();
    },
    computed: {
        ...mapGetters(["currentUser"])
    },
    methods: {
        toggleFollow() {
            if(this.followingBtn.toLowerCase() == "follow"){
                
                this.$store.dispatch(PROFILE_FOLLOW, { username: this.searchResult.username })
                            .then(() => {
                                    this.followingBtn = "Unfollow";
                            });
            }else{

                this.$store.dispatch(PROFILE_UNFOLLOW, { username: this.searchResult.username })
                           .then(() => {
                                this.followingBtn = "Follow";
                           });

            }
        },

        checkFollowing() {
            this.$store.dispatch(CHECK_FOLLOWING, this.searchResult.username)
                       .then( (data) => {
                           data = data.data;
                        //    console.log(data, data.isFollowing);
                           if(data.isFollowing){
                               this.followingBtn = "Unfollow";
                           }
                       });
        },

         detailSearch() {
            
            var gotoPage = "ProfilePage";
            var params = {
                username: this.searchResult.username,
            }

            return {
                name: gotoPage,
                params: params
            };
        }
    }
}
</script>

