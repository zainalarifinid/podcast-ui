
import Vue from "vue";
import { 
    FETCH_PODCAST, 
    PODCAST_SAVE, 
    PODCAST_DELETE, 
    PODCAST_EDIT, 
    PODCAST_RESET_STATE
 } from "./actionTypes";
import { 
    SET_PODCAST, 
    RESET_STATE
 } from "./mutationTypes";
import { PodcastService } from "../../common/apiService";

const initialState = {
    podcast: {
        id: 0,
        title: "",
        duration: "",
        description: "",
        youtubeLink: "",
        user: {},
        playlist: []
    }
}

export const state = { ...initialState };

export const actions = {

    async [FETCH_PODCAST](context, idPodcast, prevPodcast){
        if (prevPodcast !== undefined){
            return context.commit(SET_PODCAST, prevPodcast);
        }

        const { data } = await PodcastService.get(idPodcast);
        context.commit(SET_PODCAST, prevPodcast);
        return data;

    },

    [PODCAST_SAVE]({ state }) {
        return PodcastService.create(state.podcast);
    },

    [PODCAST_DELETE](idPodcast){
        return PodcastService.destroy(idPodcast);
    },

    [PODCAST_EDIT]({ state }) {
        return PodcastService.update(state.podcast.id, state.podcast);
    },

    [PODCAST_RESET_STATE]({ commit }) {
        commit(RESET_STATE);
    }

}

export const mutations = {
    [SET_PODCAST](state, podcast) {
        state.podcast = podcast;
    },

    [RESET_STATE]() {
        for (let f in state) {
            Vue.set(state, f, initialState[f]);
        }
    }
}

const getters = {
    podcast(state) {
        return state.podcast;
    },
    
};

export default {
    state,
    actions,
    mutations,
    getters
};

