<template>
    <v-content>
        <v-layout row wrap >
            <v-flex sm8 md8 class="display-explorer" >
                <v-form v-on:submit.prevent="search" >
                    <v-flex>
                        <v-text-field prepend-icon="search" name="keyword" label="Keyword" type="text" v-model="keyword" ></v-text-field>
                    </v-flex>
                    <v-radio-group v-model="typeSearch" row >
                        <v-radio key="user" label="User" value="user" selected ></v-radio>
                        <v-radio key="podcast" label="podcast" value="podcast"></v-radio>
                    </v-radio-group>
                </v-form>
                <div v-if="profilesCount === 0 && podcastsCount === 0" >
                    Please try some keyword!
                </div>
                <div v-else >
                    <div v-if="typeSearch === 'user'" >
                        <SearchPreview 
                            v-for="(searchResult, index) in profiles"
                            :typeSearch="typeSearch"
                            :searchResult="searchResult"
                            :key="searchResult.username+index"
                        />
                    </div>
                    <div v-else >
                        <SearchPreview 
                        v-for="(searchResult, index) in podcasts"
                        :typeSearch="typeSearch"
                        :searchResult="searchResult"
                        :key="searchResult.title+index"
                    />
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>

import { mapGetters } from 'vuex';
import { PROFILE_SEARCH, PODCAST_SEARCH, PROFILE_SEARCH_RESET_STATE, PODCAST_RESET_STATE } from '../stores/actionTypes';
import SearchPreview from "../components/SearchPreview";

export default {
    name: 'ExplorerPage',
    components: {
        SearchPreview
    },
    data() {
        return {
            typeSearch: 'user',
            keyword: ''
        }
    },
    mounted() {
        this.clearSearch();

    },
    computed: {
        ...mapGetters(["profiles", "profilesCount", "podcasts", "podcastsCount"])
    },
    methods: {
        search(){
            console.log(this.typeSearch, this.keyword);
            if(this.typeSearch == "user"){
                this.$store.dispatch(PROFILE_SEARCH, this.keyword);
                this.$store.dispatch(PODCAST_RESET_STATE);
            }else{
                this.$store.dispatch(PODCAST_SEARCH, this.keyword);
                this.$store.dispatch(PROFILE_SEARCH_RESET_STATE);
            }
        },
        clearSearch(){
            this.$store.dispatch(PROFILE_SEARCH_RESET_STATE);
            this.$store.dispatch(PODCAST_RESET_STATE);
        }
    }
}

</script>

<style>

.display-explorer{
    padding: 50px;
}

</style>
