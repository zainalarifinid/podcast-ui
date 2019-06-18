<template>
    <div>
        <div v-if="isLoading" >Loading articles...</div>
        <div v-else >
            <div v-if="podcastsCount === 0" >
                No feeds are here...
            </div>
            <FeedPreview 
                v-for="(podcast, index) in podcasts"
                :podcast="podcast"
                :key="podcast.title+index"
            />
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import FeedPreview from "./FeedPreview";    
import { FETCH_PODCAST } from '../stores/actionTypes';

export default {
    name: "FeedList",
    components: {
        FeedPreview,
    },
    data(){
        return {
            currentPage: 1
        }
    },
    computed: {
        listConfig() {
            const { type } = this;
            const filters = {
                offset: (this.currentPage - 1) * this.itemsPerPage,
                limit: this.itemsPerPage
            };
            
            return {
                type,
                filters
            };
        },

        ...mapGetters(["podcastsCount", "isLoading", "podcasts"])
    },
    mounted(){
        this.fetchPodcast();
    },
    methods: {
        fetchPodcast() {
            this.$store.dispatch(FETCH_PODCAST, this.listConfig)
        },

        resetPagination() {
            this.listConfig.offset = 0;
            this.currentPage = 1;
        }
    }
}

</script>
