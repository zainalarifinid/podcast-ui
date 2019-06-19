<template>
  <v-app>
    <v-content>
      <!-- <HelloWorld/> -->
      <div v-if="!isAuthenticated">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>

              <v-tabs
                v-model="active"
                color="blue"
                dark
                slider-color="white"
                fixed-tabs
              >
                <v-tab 
                  :key="login"
                >
                  Login
                </v-tab>
                <v-tab 
                  :key="register"
                >
                  Register
                </v-tab>
                <v-tab-item
                  :key="login"
                >
                  <LoginForm />
                </v-tab-item>
                <v-tab-item
                  :key="register"
                >
                  <RegisterForm/>
                </v-tab-item>
              </v-tabs>  
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <div v-if="isAuthenticated">
        <div class="feed-container" >
          <FeedList />
        </div>
      </div>

    </v-content>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import FeedList from '../components/FeedList'

export default {
  name: "HomePage",
  components: {
    // HelloWorld
    LoginForm,
    RegisterForm,
    FeedList
  },
  data () {
    return {
      email: '',
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }

  // methods: {
  //   login() {
  //     this.$auth.login();
  //   },
  //   logout() {
  //     this.$auth.logOut();
  //   },
  //   handleLoginEvent(data) {
  //     this.isAuthenticated = data.loggedIn;
  //     this.profile = data.profile;
  //   },
  //   register(){
  //     this.$auth.register(this.email, this.username, this.password);
  //   }
    
  // }
};
</script>

<style scoped>
.spinner {
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.feed-container{
    padding-top: 100px;
    padding-left: 50px;
}

</style>