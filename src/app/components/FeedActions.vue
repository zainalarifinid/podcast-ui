<template>
    <span v-if="canModify">
        <router-link >
            <span>Edit Podcast</span>
        </router-link>
        <button>
            <span>Delete Podcast</span>
        </button>
    </span>
    <span v-else >
        <span>Following</span>
    </span>
</template>

<script>

import { mapGetters } from "vuex";
import {
    PLAYLIST_ADD,
    PLAYLIST_REMOVE,
    PODCAST_DELETE,
    PROFILE_FOLLOW,
    PROFILE_UNFOLLOW
} from "../stores/actionTypes";

export default {
    name: 'FeedActions',
    props: {
        podcast: { type: Object, required: true },
        
        canModify: { type: Boolean, required: true }
    },
    computed: {
        ...mapGetters(["profile", "isAuthenticated"]),
        editPodcastLink() {
            return { name: 'podcast-edit', params: { slug: this.podcast.slug } };
        },

        // toggleAddtoPlaylist() {
        //     return {
        //         "btn-primary": false
        //     };
        // },

        followUserLabel() {
            return `${this.profile.following ? "Unfollow" : "Follow"} 
                ${this.podcast.user.username}`;
        }

    },
    methods: {

        // toggleFollow() {
        //     if(!this.isAuthenticated){
        //         this.$router.push({ name: "login" });
        //         return;
        //     }
        //     const action = this.user.following 
        //         ? PROFILE_FOLLOW
        //         : PROFILE_UNFOLLOW;
        //     this.$store.dispatch(action, {
        //         username: this.profile.username
        //     });

        // },

        async deleteArticle() {
            try {
                await this.$store.dispatch(PODCAST_DELETE, this.podcast.id);
                this.$router.push("/");
            }catch( err ){
                console.error(err);
            }
        }

    }
}
</script>

