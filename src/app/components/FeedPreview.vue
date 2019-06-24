<template>
    <div>
        <feed-meta isPreview :podcast="podcast" ></feed-meta>
        <v-layout row wrap>
            <v-flex xs4>
                <img v-bind:src="'https://img.youtube.com/vi/'+podcast.youtubeLink.replace('https://www.youtube.com/watch?v=', '')+'/0.jpg'" width="170px" />
            </v-flex>
            <v-flex xs8>
                <v-card style="padding: 15px;min-height: 160px;" >
                    <router-link :to="podcastLink" >
                        <h2 v-text="podcast.title" />
                        <p v-text="podcast.youtubeLink" />
                        <p v-text="podcast.description" />
                    </router-link>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

import FeedMeta from "./FeedActions";

export default {
    name: 'FeedPreview',
    component: {
        FeedMeta
    },
    props: {
        podcast: { type: Object, required: true }
    },
    computed: {
        podcastLink() {
            return {
                name: "DetailPodcast",
                params: {
                    slug: this.podcast.id
                }
            }
        }
    }
}

</script>
