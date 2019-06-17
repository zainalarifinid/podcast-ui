<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Podcast</span>&nbsp;
        <span class="font-weight-light">Listening your favourite</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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

export default {
  name: 'App'
}

</script>
