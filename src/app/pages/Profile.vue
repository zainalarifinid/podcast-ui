<template>
    <v-app>
        <v-content>
            <v-layout align-center class="profile-container" >
                <v-flex xs-10 sm10 md10 >
                    <v-btn
                        color="danger"
                        @click="logout"
                    >
                        Logout
                    </v-btn>
                    <v-card class="profile-card" >
                        <v-flex xs12 sm8 md8 >
                            Username <span>: {{profile.username}}</span>
                        </v-flex>
                        <v-flex xs12 sm8 md8 >
                            Email <span>: {{profile.email}}</span>
                        </v-flex>
                        <v-flex xs12 sm8 md8 >
                            Password <span>: {{profile.password}}</span>
                        </v-flex>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import { FETCH_PROFILE, LOGOUT } from "../stores/actionTypes";

export default {
    name: "ProfilePage",
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["profile"])
    },
    mounted(){
        this.fetchProfile();
    },
    methods: {
        fetchProfile() {
            this.$store.dispatch(FETCH_PROFILE);
        },
        logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "HomePage" })
            })
        }
    }
}
</script>

<style scoped>

    .profile-container{
        padding-top: 50px;
        padding-left: 50px;
    }

    .profile-card{
        padding: 20px;
    }

</style>
