
import Vue from "vue";
import Vuex from "vuex";

import authModule from "./authModule";
// import feedModule from "./feedModule";
import podcastModule from "./podcastModule";
import profileModules from "./profileModules";
import playlistModules from "./playlistModules";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authModule,
        // feedModule,
        podcastModule,
        profileModules,
        playlistModules
    }
})
