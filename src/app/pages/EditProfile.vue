<template>
    <v-content>
        <v-layout>
            <v-flex xs12 sm8 md8 style="margin: 0px auto;" >
                <RegisterForm 
                    :username="username"
                />
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>

import RegisterForm from "../components/RegisterForm";

export default {
    name: 'EditProfile',
    components: {
        RegisterForm
    },
    props: {
        username: String
    }

}
</script>

