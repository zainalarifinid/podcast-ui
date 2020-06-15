<template>
    <div>
        <div>
            <router-link
                :to="{ name: 'profile', params: {username: podcast.user.username} }"
            >
                {{ podcast.user.username }}
            </router-link>
        </div>
        <template v-if="actions" >
            <feed-action
                :podcast="podcast"
                :canModify="isCurrentUser()"
            ></feed-action>
        </template>
    </div>
</template>

<script>

import { mapGetters } from "vuex";
import FeedActions from "./FeedActions";

export default {
    name: "FeedMeta",
    components: {
        FeedActions
    },
    props: {
        podcast: {
            type: Object,
            required: true,
        },
        actions: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {
        ...mapGetters(["currentUser", "isAuthenticated"])
    },
    methods: {
        isCurrentUser() {
            if(this.currentUser.username && this.podcast.user.username) {
                return this.currentUser.username === this.podcast.user.username;
            }
            return false;
        }
    }

}

</script>

