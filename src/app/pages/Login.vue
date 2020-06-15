
<template>
    <v-app>
        <v-content>
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
        </v-content>
    </v-app>
</template>

<script>
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default {
    name: "LoginPage",
    components: {
        LoginForm,
        RegisterForm
    },
    data() {
        return {
            email: '',
            username: '',
            password: ''
        }
    }
}
</script>

