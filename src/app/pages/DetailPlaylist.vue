<template>
    <v-content>
        <v-card class="playlist-card">

        </v-card>
    </v-content>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    name: 'DetailPlaylist',
    data() {
        return {

        }
    },
    props: {
        idPlaylist: { type: String, required: true }
    },
    methods: {
        fetchDetailPlaylist() {
            
        }
    }
}
</script>

