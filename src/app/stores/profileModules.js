import { FETCH_PROFILE, PROFILE_FOLLOW, PROFILE_UNFOLLOW } from "./actionTypes";
import ApiService from "../../common/apiService";
import { SET_PROFILE } from "./mutationTypes";

const state = {
    errors: {},
    profile: {
        username: '',
        email: '',
        password: ''
    }
};

const getters = {
    profile(state) {
        return state.profile;
    }
}

const actions = {
    [FETCH_PROFILE](context, payload) {
        // const { username } = payload;
        return ApiService.get("users/detail")
            .then(({ data }) => {
                console.log(data);
                context.commit(SET_PROFILE, data);
                return data;
            })
            .catch(() => {

            });
    },

    [PROFILE_FOLLOW](context, payload) {
        const { username } = payload;
        return ApiService.post(`profiles/${username}/follow`)
            .then(({ data }) => {
                context.commit(SET_PROFILE, data.profile);
                return data;
            })
            .catch(() => {

            });
    },

    [PROFILE_UNFOLLOW](context, payload){
        const { username } = payload;
        return ApiService.delete(`profile/${username}/follow`)
            .then(({ data }) => {
                context.commit(SET_PROFILE, data.profile);
                return data;
            })
            .catch(() => {

            });
    }
};

const mutations = {

    [SET_PROFILE](state, profile) {
        state.profile = profile;
        state.errors = {};
    }

};

export default {
    state,
    actions,
    mutations,
    getters
}
