
import { PodcastService } from "../../common/apiService";
import {
    FETCH_START,
    FETCH_END,
    UPDATE_PODCAST_IN_LIST
} from "./mutationTypes";
import { FETCH_PODCAST } from "./actionTypes";

const state = {
    podcasts: [],
    isLoading: true,
    podcastsCount: 0
};

const getters = {
    podcastsCount(state) {
        return state.podcastsCount;
    },

    podcasts(state) {
        return state.podcasts;
    },

    isLoading(state) {
        return state.isLoading;
    },

}

const actions = {
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

};

const mutations = {
    [FETCH_START](state) {
        state.isLoading = true;
    },

    [FETCH_END](state, podcasts) {
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
