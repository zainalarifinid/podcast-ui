<template>
    <div>
        <v-layout row wrap>
            <v-flex xs8 >
                <v-card style="padding: 15px;min-height: 30px;margin:10px;" >
                    <div v-if="typeSearch === 'user'" >
                        <UserPreview
                            :searchResult="searchResult"
                        />
                    </div>
                    <div v-else >
                        <FeedPreview 
                            :podcast="searchResult"
                            :key="searchResult.title+searchResult.id"
                        />
                        <!-- <router-link :to="detailSearch" >
                            <v-layout row wrap>
                                <v-flex xs4>
                                    <img v-bind:src="'https://img.youtube.com/vi/'+searchResult.youtubeLink.replace('https://www.youtube.com/watch?v=', '')+'/0.jpg'" width="150px" />
                                </v-flex>
                                <v-flex xs8 >
                                    <h2 v-text="searchResult.title" />
                                    <p v-text="searchResult.description" />
                                </v-flex>
                            </v-layout>
                        </router-link> -->
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

import UserPreview from "./UserPreview";
import FeedPreview from "./FeedPreview";

export default {
    name: 'SearchPreview',
    components: {
        UserPreview,
        FeedPreview
    },
    props: {
        searchResult: { type: Object, required: true },
        typeSearch: { type: String, required: true }
    },
    mounted() {
      console.log(this.searchResult);  
    },
    computed: {
        detailSearch() {
            let gotoPage = "podcast";
            let params = {
                            slug: this.searchResult
                        };
            return {
                name: gotoPage,
                params: params
            };
        }
    }
}

</script>
