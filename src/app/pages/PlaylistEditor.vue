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
import { PLAYLIST_SAVE, PLAYLIST_EDIT } from '../stores/actionTypes';
export default {
    name: 'PlaylstEditor',
    data(){
        return {
            titlePlaylist: ''
        }
    },
    props: {
        username: { type: String, required: true },
        title: { type: String },
        idPlaylist: { type: String }
    },
    computed: {
        ...mapGetters(["isAuthenticated"])
    },
    mounted() {
        if(this.title && this.title.length > 0) {
            this.titlePlaylist = this.title;
        }
    },
    methods: {

        moveToProfile() {
            this.$router
                .push({
                    name: "ProfilePage",
                    params: { username: this.username }
                });
        },

        onSave() {
            console.log("saving titlePlaylist", this.titlePlaylist);
            if(this.title && this.title.length > 0) {

                this.$store
                    .dispatch( PLAYLIST_EDIT, { id: this.idPlaylist, title: this.titlePlaylist } )
                    .then(() => {
                        this.moveToProfile(); 
                    })

            }else{
                
                this.$store
                .dispatch( PLAYLIST_SAVE, this.titlePlaylist )
                .then(() => {
                    this.moveToProfile();
                });

            }

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
