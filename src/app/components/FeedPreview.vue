<template>
    <div>
        <feed-meta isPreview :podcast="podcast" ></feed-meta>
        <router-link :to="podcastLink" >
            <h2 v-text="podcast.title" />
            <p v-text="podcast.description" />
        </router-link>
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
                name: "podcast",
                params: {
                    slug: this.podcast.id
                }
            }
        }
    }
}

</script>
