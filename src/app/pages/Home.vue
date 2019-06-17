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
                  <RegisterForm
                    v-on:inputEmail="email"
                    v-on:inputUsername="username"
                    v-on:inputPassowrd="password"
                    v-on:register="register"
                  />
                </v-tab-item>
              </v-tabs>  
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <div v-if="isAuthenticated">
        
      </div>

    </v-content>
  </v-app>
</template>

<script>
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default {
  name: "home",
  components: {
    // HelloWorld
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      isAuthenticated: false,
      email: '',
      username: '',
      password: ''
    };
  },

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
</style>