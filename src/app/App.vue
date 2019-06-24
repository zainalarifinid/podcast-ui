<style scoped>
  .menu{
    margin-top: 40px;
  }

</style>

<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Podcast</span>&nbsp;
        <span class="font-weight-light">Listening your favourite</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="menu" >
        <router-link
          :to="{ name: 'HomePage' }"
        >
          <v-btn
            flat
          >
            <span class="mr-2">Home</span>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link
          :to="{ name: 'ExplorerPage' }"
        >
          <v-btn
            flat
          >
            <span class="mr-2">Explorer</span>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="isAuthenticated" >
          <router-link
            :to="{ name: 'PodcastEditor' }"
          >
            <v-btn
              flat
            >
              <span class="mr-2">Add Podcast</span>
            </v-btn>
          </router-link>
          <v-spacer></v-spacer>
          <router-link
            :to="{ name: 'ProfilePage', params: { username: currentUser.username } }"
          >
            <v-btn
              flat
            >
              <span class="mr-2">Profile</span>
            </v-btn>
          </router-link>
          <v-spacer></v-spacer>
        </v-toolbar-items>
      </v-toolbar-items>
      <v-btn
        flat
        href="http://git.achilles.systems/zainalarifin/podcast-application-ui"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"])
  },
  mounted(){
    // console.log("check user from auth", this.currentUser);
  }
}

</script>
