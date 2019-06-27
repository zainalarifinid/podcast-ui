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
                    {{ submitButton }}
                </v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { PODCAST_SAVE, PODCAST_RESET_STATE, FETCH_DETAIL_PODCAST, PODCAST_EDIT } from '../stores/actionTypes';
import store from "../stores";
export default {
    name: 'PodcastEditor',
     data(){
        return {
            inProgress: false,
            errors: {},
            submitButton: 'Add'
            // podcast: Object()
        }
    },
    props: {
        idPodcast: { type: String }
    },
    computed: {
        ...mapGetters(["podcast"])
    },
    mounted(){
        this.fetchDetailPodcast();
        if(this.idPodcast) {
            this.submitButton = 'Update';
        }
    },
    methods: {
        onPublish() {
            this.inProgress = true;
            if(this.idPodcast){
                this.$store
                    .dispatch(PODCAST_EDIT, this.podcast)
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
                    });
            }else{
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
                });
            }
        },

        fetchDetailPodcast(){
            console.log("fetchDetailPodcast", this.idPodcast);
            if(this.idPodcast && this.idPodcast !== null){
                this.$store
                    .dispatch(PODCAST_RESET_STATE);
                this.$store
                    .dispatch(FETCH_DETAIL_PODCAST, this.idPodcast);
            }
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


