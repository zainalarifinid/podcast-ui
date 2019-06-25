<template>
    <v-layout row wrap class="form-playlist" >
        <v-flex xs8 >
            <v-form
                ref="form"
                v-on:submit.prevent="onSave"
            >
                <v-text-field
                    v-model="titlePlaylist"
                    label="Title Playlist"
                    required
                    >
                </v-text-field>

                <v-btn type="submit" >
                    Save
                </v-btn>

            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>

import { mapGetters } from 'vuex';
import { PLAYLIST_SAVE } from '../stores/actionTypes';
export default {
    name: 'PlaylstEditor',
    data(){
        return {
            titlePlaylist: ''
        }
    },
    props: {
        username: { type: String, required: true }
    },
    computed: {
        ...mapGetters(["isAuthenticated"])
    },
    methods: {
        onSave() {
            console.log("saving titlePlaylist", this.titlePlaylist);
            this.$store
                .dispatch( PLAYLIST_SAVE, this.titlePlaylist )
                .then(({ data }) => {
                    this.$router.push({
                        name: "ProfilePage",
                        params: { username: this.username }
                    })
                })
        }
    }
}
</script>

<style scoped >

    .form-playlist{
        padding: 70px;
        padding-top: 100px;
    }

</style>
