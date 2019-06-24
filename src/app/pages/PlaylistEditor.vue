<template>
    <v-form
        ref="form"
        v-on:submit.prevent="onSave"
    >
        <v-text-field
            v-model="titlePlaylist"
            label="Title Playlist"
            required
            >

        <v-btn type="submit" >
            Save
        </v-btn>
        
        </v-text-field>
    </v-form>
</template>

<script>
export default {
    name: 'PlaylstEditor',
    data(){
        return {
            titlePlaylist: ''
        }
    },
    methods: {
        onSave() {
            
        }
    }
}
</script>

