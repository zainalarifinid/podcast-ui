<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <v-card class="elevation-12">
              <v-toolbar dark color="secondary">
                <v-toolbar-title>{{ titleForm }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form autocomplete="off" >
                    <v-text-field id="email" prepend-icon="email" name="email" label="Email" type="email" v-model="profile.email" autocomplete="off" />
                    <v-text-field id="username" prepend-icon="person" name="login" label="Username" type="text" v-model="profile.username" autocomplete="off" ></v-text-field>
                    <v-text-field v-if="profile.password.length > 0" id="old_password" prepend-icon="lock" name="old_password" label="Old Password" type="password" v-model="inputOldPassword" autocomplete="off" ></v-text-field>
                    <v-text-field id="register_password" prepend-icon="lock" name="password" label="Password" type="password" v-model="inputPassword" autocomplete="off" ></v-text-field>
                    <v-text-field id="repassword" prepend-icon="lock" name="repassword" label="Re-Password" type="password" v-model="inputRePassword" autocomplete="off" ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="register" dark @click="onSubmit(profile.email, profile.username, inputPassword)" >{{ btnForm }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

  import { mapState, mapGetters } from 'vuex';
  import { REGISTER, FETCH_PROFILE_USER, PROFILE_UPDATE, LOGOUT } from "../stores/actionTypes";

  export default {
    name: 'RegisterForm',
    data: () => ({
      drawer: null,
      titleForm: 'Register form',
      btnForm: 'Register',
      // inputUser: {
      //   email: '',
      //   username: '',
      //   password: '',
      // },
      inputPassword: '',
      inputRePassword: '',
      inputOldPassword: ''
    }),
    props: {
      username: String,
      profileUser: Object
    },
    methods: {
        onSubmit(email, username, password){
          if(this.username){
            this.$store
                .dispatch(PROFILE_UPDATE, this.profile)
                .then( () => {
                  
                  this.$store.dispatch(LOGOUT).then(() => {
                      this.$router.push({ name: "HomePage" })
                  });

                  // this.$router.push({
                  //     name: 'ProfilePage',
                  //     params: {
                  //         username: this.username
                  //     }
                  // });
                })
                .catch( (err) => {

                });
          }else{
            this.$store
                .dispatch(REGISTER, {email, username, password});
          }
        },

        fetchProfile(username) {
          console.log("FETCH PROFILE");
          this.$store.dispatch(FETCH_PROFILE_USER, username);
        }
    },
    computed: {
      ...mapState({
        errors: state => state.auth.errors
      }),
      
      ...mapGetters(['profile', 'currentUser'])
    },

    created() {
      // console.log(this.profile, this.currentUser)
      if(this.username) {
        // console.log(this.currentUser.username);
        this.fetchProfile(this.username);
        this.titleForm = 'Edit Profile form';
        this.btnForm = 'Update';
        console.log(this.titleForm, this.btnForm);
      }
    },

    beforeMounted() {
      
    }

  }
</script>