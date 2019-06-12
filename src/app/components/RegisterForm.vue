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
                    <v-text-field id="email" prepend-icon="email" name="email" label="Email" type="email" v-on:input="inputEmail = $event.target.value" />
                    <v-text-field id="username" prepend-icon="person" name="login" label="Username" type="text" v-on:input="inputUsername = $event.target.value" ></v-text-field>
                    <v-text-field id="register_password" prepend-icon="lock" name="password" label="Password" type="password" v-on:input="inputPassword = $event.target.value" ></v-text-field>
                    <v-text-field id="repassword" prepend-icon="lock" name="repassword" label="Re-Password" type="password" v-on:input="inputRePassword = $event.target.value" ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="register" dark v-on:click="$emit('register')" >Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),

    props: {
      source: String
    },

    methods: {
        inputEmail(e){
            this.$emit('inputEmail', e.target.value);
        },
        inputUsername(e){
            this.$emit('inputUsername', e.target.value);
        },
        inputPassowrd(e){
            this.$emit('inputPassword', e.target.value);
        },
        inputRePassword(e){
            this.$emit('inputRepassword', e.target.value)
        }
    }

  }
</script>