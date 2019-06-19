<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <v-card class="elevation-12">
              <v-toolbar dark color="secondary">
                <v-toolbar-title>Register form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field id="email" prepend-icon="email" name="email" label="Email" type="email" v-model="inputEmail" />
                    <v-text-field id="username" prepend-icon="person" name="login" label="Username" type="text" v-model="inputUsername" ></v-text-field>
                    <v-text-field id="register_password" prepend-icon="lock" name="password" label="Password" type="password" v-model="inputPassword" ></v-text-field>
                    <v-text-field id="repassword" prepend-icon="lock" name="repassword" label="Re-Password" type="password" v-model="inputRePassword" ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="register" dark @click="onSubmit(inputEmail, inputUsername, inputPassword)" >Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

  import { mapState } from 'vuex';
  import { REGISTER } from "../stores/actionTypes";

  export default {
    name: 'RegisterForm',
    data: () => ({
      drawer: null,
      inputEmail: '',
      inputUsername: '',
      inputPassword: '',
      inputRePassword: ''
    }),

    props: {
      source: String
    },

    methods: {
        onSubmit(email, username, password){
          this.$store
            .dispatch(REGISTER, {email, username, password})
            .then(() => this.$router.push({name: "LoginPage"}));
        }
    },
    computed: {
      ...mapState({
        errors: state => state.auth.errors
      })
    }

  }
</script>