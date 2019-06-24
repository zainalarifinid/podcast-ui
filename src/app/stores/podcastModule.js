
import Vue from "vue";
import { 
    FETCH_PODCAST, 
    PODCAST_SAVE, 
    PODCAST_DELETE, 
    PODCAST_EDIT, 
    PODCAST_RESET_STATE,
    PODCASTS_RESET_STATE,
    PODCAST_SEARCH
 } from "./actionTypes";
import { 
    SET_PODCAST, 
    RESET_STATE,
    SET_SEARCH_PODCAST,
    FETCH_START,
    FETCH_END,
    UPDATE_PODCAST_IN_LIST,
    RESET_SEARCH_PODCAST
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
    },
    podcasts: [],
    podcastsCount: 0
}

export const state = { ...initialState };

export const actions = {

    async [FETCH_PODCAST]({ commit }){
        commit(FETCH_START);
        return PodcastService.list()
            .then(({ data }) => {
                commit(FETCH_END, data);
            })
            .catch( error => {
                throw new Error(error);
            })
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
    },

    async [PODCAST_SEARCH]( context, keyword ) {
        return PodcastService.search(keyword)
            .then(({ data }) => {
                context.commit(SET_SEARCH_PODCAST, data);
            })
    },

    [PODCASTS_RESET_STATE]({ commit }) {
        commit(RESET_SEARCH_PODCAST);
    }

}

export const mutations = {
    [SET_PODCAST](state, podcast) {
        state.podcast = podcast;
    },

    [SET_SEARCH_PODCAST](state, podcast){
        console.log(podcast);
        state.podcasts = podcast;
        state.podcastsCount = podcast.length;
    },

    [RESET_STATE]() {
        for (let f in state) {
            Vue.set(state, f, initialState[f]);
        }
    },

    [FETCH_START](state) {
        state.isLoading = true;
    },

    [FETCH_END](state, podcasts) {
        // console.log(podcasts);
        state.podcasts = podcasts,
        state.podcastsCount = podcasts.length;
        state.isLoading = false;
    },

    [UPDATE_PODCAST_IN_LIST](state, data) {
        state.podcasts = state.podcasts.map( podcast => {
            if(podcast.id !== data.id){
                return podcast;
            }

            return podcast;
        });
    },

    [RESET_SEARCH_PODCAST](state) {
        state.podcasts = [];
        state.podcastsCount = 0;
    }
}

const getters = {
    podcast(state) {
        return state.podcast;
    },

    podcasts(state) {
        return state.podcasts;
    },

    podcastsCount(state) {
        return state.podcastsCount;
    }
    
};

export default {
    state,
    actions,
    mutations,
    getters
};

