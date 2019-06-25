<template>
    <v-layout row wrap class="form-podcast" >
        <v-flex xs8>
            <v-form
                ref="form"
                v-on:submit.prevent="onPublish"
            >
                <v-text-field
                    v-model="podcast.title"
                    label="Title"
                    error-messages=""
                    >
                </v-text-field>
                <v-text-field
                    v-model="podcast.duration"
                    label="Duration"
                    >
                </v-text-field>
                <v-textarea
                    v-model="podcast.description"
                    label="Description"
                    >
                </v-textarea>
                <v-text-field
                    v-model="podcast.youtubeLink"
                    label="Youtube Link"
                    >
                </v-text-field>
                <div v-if="podcast.youtubeLink !== '' && podcast.youtubeLink" >
                    <iframe width="420" height="315"
                    :src="podcast.youtubeLink.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')" >
                    </iframe>
                </div>
                <v-btn
                    type="submit"
                >
                    Add
                </v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { PODCAST_SAVE, PODCAST_RESET_STATE } from '../stores/actionTypes';
import store from "../stores";
export default {
    name: 'PodcastEditor',
     data(){
        return {
            inProgress: false,
            errors: {},
            podcast: Object()
        }
    },
    // async beforeRouteUpdate(to, from, next){
    //     await store.dispatch(PODCAST_RESET_STATE);
    //     return next();
    // },
    // async beforeRouteEnter(to, from, next){
    //     await store(PODCAST_RESET_STATE);
    //     return next();
    // },
    computed: {
        // ...mapGetters["podcast"]
    },
    methods: {
        onPublish() {
            this.inProgress = true;
            this.$store
                .dispatch(PODCAST_SAVE, this.podcast)
                .then(({ data }) => {
                    this.inProgress = false;
                    this.$router.push({
                        name: "HomePage"
                    });
                })
                .catch(({ response }) => {
                    this.inProgress = false;
                    this.errors = response;
                    console.log(this.errors);
                })
        }
    }
}
</script>

<style scoped>

    .form-podcast{
        padding: 70px;
        padding-top: 100px;
    }

</style>


