
import Vue from "vue";
import Vuex from "vuex";

import authModule from "./authModule";
import feedModule from "./feedModule";
import podcastModule from "./podcastModule";
import profileModules from "./profileModules";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authModule,
        feedModule,
        podcastModule,
        profileModules
    }
})
