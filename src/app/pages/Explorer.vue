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
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>

export default {
    name: 'ExplorerPage',
    data() {
        return {
            typeSearch: 'user',
            keyword: ''
        }
    },
    methods: {
        search(){
            console.log(this.typeSearch, this.keyword);
            
        }
    }
}

</script>

<style>

.display-explorer{
    padding: 50px;
}

</style>
