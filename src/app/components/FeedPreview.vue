<template>
    <div>
        <h2 v-text="podcast.title" />
        <p v-text="podcast.description" />
    </div>
</template>

<script>

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
