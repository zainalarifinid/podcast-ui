import Vue from "vue";
import {
  PROFILE_FOLLOW,
  PROFILE_UNFOLLOW,
  PROFILE_SEARCH,
  FETCH_PROFILE_USER,
  PROFILE_SEARCH_RESET_STATE,
  FETCH_PROFILE_RESET,
  FETCH_LIST_FOLLOWER,
  FETCH_LIST_FOLLOWING,
  CHECK_FOLLOWING,
  PROFILE_UPDATE
} from "./actionTypes";
import ApiService from "../../common/apiService";
import {
  SET_PROFILE,
  FETCH_PROFILE,
  RESET_SEARCH_PROFILE,
  RESET_PROFILE,
  SET_LIST_FOLLOWER,
  SET_LIST_FOLLOWING
} from "./mutationTypes";

const initialState = {
  profile: {
    id: 0,
    username: "",
    email: "",
    password: "",
    playlists: [],
    podcasts: [],
    followers: [],
    followings: []
  }
};

const state = {
  errors: {},
  currentProfile: {},
  profiles: [],
  profilesCount: 0,
  followers: [],
  followings: [],
  ...initialState
};

const getters = {
  profile(state) {
    return state.profile;
  },

  profiles(state) {
    return state.profiles;
  },

  profilesCount(state) {
    return state.profilesCount;
  },

  followers(state) {
    return state.followers;
  },

  followings(state) {
    return state.followings;
  }
};

const actions = {
  [PROFILE_UPDATE](context, profile) {
    return ApiService.post(`auth/update`, profile)
                     .then( (data) => {
                        console.log(data);
                     })
  },

  [FETCH_PROFILE_USER](context, username) {
    // const { username } = payload;
    return ApiService.get(`profile/${username}`).then(({ data }) => {
      console.log("FETCH_PROFILE_USER", data);
      // console.log("Get Profile", data, data.playlists);
      context.commit(SET_PROFILE, data);
      return data;
    });
    // .catch(() => {

    // });
  },

  [FETCH_LIST_FOLLOWER](context, username) {
    return ApiService.get(`profile/follower/${username}`).then(({ data }) => {
      context.commit(SET_LIST_FOLLOWER, data);
    });
  },

  [FETCH_LIST_FOLLOWING](context, username) {
    return ApiService.get(`profile/following/${username}`).then(({ data }) => {
      context.commit(SET_LIST_FOLLOWING, data);
    });
  },

  [CHECK_FOLLOWING](context, userFollowing) {
    return ApiService.get(`profile/checkFollowing/${userFollowing}`);
  },

  [PROFILE_FOLLOW](context, payload) {
    const { username } = payload;
    return ApiService.post(`profile/follow/${username}`)
      .then(({ data }) => {
        context.commit(SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {});
  },

  [PROFILE_UNFOLLOW](context, payload) {
    const { username } = payload;
    return ApiService.post(`profile/unfollow/${username}`)
      .then(({ data }) => {
        context.commit(SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {});
  },

  [PROFILE_SEARCH](context, username) {
    return ApiService.get(`users/search/${username}`).then(({ data }) => {
      context.commit(FETCH_PROFILE, data);
    });
  },

  [PROFILE_SEARCH_RESET_STATE](context) {
    context.commit(RESET_SEARCH_PROFILE);
  },

  [FETCH_PROFILE_RESET]({ commit }) {
    commit(RESET_PROFILE);
  }
};

const mutations = {
  [SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  },

  [RESET_PROFILE](state) {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  },

  [FETCH_PROFILE](state, profile) {
    state.profiles = profile;
    state.profilesCount = profile.length;
    state.errors = {};
  },

  [RESET_SEARCH_PROFILE](state) {
    state.profiles = [];
    state.profilesCount = 0;
  },

  [SET_LIST_FOLLOWER](state, data) {
    state.followers = data;
  },

  [SET_LIST_FOLLOWING](state, data) {
    state.followings = data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
