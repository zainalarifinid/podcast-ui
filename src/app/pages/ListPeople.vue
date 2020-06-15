<template>
    <v-app>
        <v-content>
            <v-layout align-center class="people-container" >

                <v-flex xs12 sm8 md8 >
                    <div v-if="type === 'follower'" >
                        <UserPreview
                            v-for="(user, index) in followers"
                            :searchResult="user"
                            :key="user.username+index"
                        />
                    </div>
                    <div v-if="type === 'following'" >
                        <UserPreview
                            v-for="(user, index) in followings"
                            :searchResult="user"
                            :key="user.username+index"
                        />
                    </div>

                </v-flex>

            </v-layout>
        </v-content>
    </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import UserPreview from "./../components/UserPreview";
import { FETCH_LIST_FOLLOWER, FETCH_LIST_FOLLOWING } from '../stores/actionTypes';

export default {
    name: 'ListPeople',
    data() {
        return { 
            users: [ {username: "username", email: "email@mail.com"}, {username: "username2", email: "email2@mail.com"} ]
        };
    },
    components: {
        UserPreview
    },
    props: {
        username: { type: String, required: true },
        type: { type: String, required: true }
    },
    computed: {
        ...mapGetters( ["followers","followings"] )
    },
    mounted() {
        this.fetchPeople();
        // console.log(this.username, this.type);
    },
    methods: {
        fetchPeople() {
            if( this.type === 'follower' ) {

                this.$store.dispatch(FETCH_LIST_FOLLOWER, this.username );
                // this.users = this.followers;

            }else if( this.type === 'following' ) {

                this.$store.dispatch(FETCH_LIST_FOLLOWING, this.username );
                // this.users = this.followers;

            }
        }
    }
}
</script>

<style scoped>

.people-container{
    padding: 50px;
    margin-top: 50px;
}

</style>


