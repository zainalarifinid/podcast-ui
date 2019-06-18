<template>
    <v-layout row wrap class="form-podcast" >
        <v-flex xs8>
            <v-form
                ref="form"
                v-on:submit.prevent="onPublish"
            >
                <v-text-field
                    v-model="title"
                    label="Title"
                    error-messages="Doremi"
                    >
                </v-text-field>
                <v-text-field
                    v-model="duration"
                    label="Duration"
                    >
                </v-text-field>
                <v-textarea
                    v-model="description"
                    label="Description"
                    >
                </v-textarea>
                <v-text-field
                    v-model="youtubeLink"
                    label="Youtube Link"
                    >
                </v-text-field>
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
            errors: {}
        }
    },
    async beforeRouteUpdate(to, from, next){
        await store.dispatch(PODCAST_RESET_STATE);
        return next();
    },
    async beforeRouteEnter(to, from, next){
        await store(PODCAST_RESET_STATE);
        return next();
    },
    computed: {
        ...mapGetters["podcast"]
    },
    methods: {
        onPublish() {
            this.inProgress = true;
            this.$store
                .dispatch(PODCAST_SAVE)
                .then(({ data }) => {
                    this.inProgress = false;
                    this.$router.push({
                        name: "feed"
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


