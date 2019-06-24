
import Vue from "vue";
import { PLAYLIST_SAVE, FETCH_PLAYLIST, PLAYLIST_ADD, PLAYLIST_REMOVE } from "./actionTypes";
import { SET_PLAYLISTS } from "./mutationTypes";
import { PlaylistService } from "../../common/apiService";

const state = {
    titlePlaylist: "",
    playlists: [],
    isAdded: false,
    isRemoved: false
}

const actions = {
    [PLAYLIST_SAVE](context, title) {
        // console.log("Create Playlist ", context, title);
        return PlaylistService.create({ title });
    },

    [FETCH_PLAYLIST]({ commit }, dataUser ) {
        console.log("FETCH_PLAYLIST", dataUser.username, dataUser.idPodcast);
        return PlaylistService.listFromUser( dataUser.username, dataUser.idPodcast )
                              .then(({ data }) => {
                                  commit(SET_PLAYLISTS, data);
                              })
    },

    [PLAYLIST_ADD]({ commit }, dataPlaylist) {
        return PlaylistService.addToPlaylist( dataPlaylist.idPlaylist, dataPlaylist.idPodcast );
    },

    [PLAYLIST_REMOVE]({ commit }, dataPlaylist) {
        return PlaylistService.removeFromPlaylist( dataPlaylist.idPlaylist, dataPlaylist.idPodcast );
    }
    
}

const mutations = {
    [SET_PLAYLISTS](state, data){
        state.playlists = data.playlists;
    }
}

const getters = {

    titlePlaylist(state) {
        return state.titlePlaylist;
    },

    playlists(state){
        return state.playlists;
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}
