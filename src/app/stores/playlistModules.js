
import Vue from "vue";
import { PLAYLIST_SAVE, FETCH_PLAYLIST, PLAYLIST_ADD, PLAYLIST_REMOVE, FETCH_DETAIL_PLAYLIST, PLAYLIST_DELETE, PLAYLIST_EDIT } from "./actionTypes";
import { SET_PLAYLISTS, SET_DETAIL_PLAYLIST } from "./mutationTypes";
import { PlaylistService } from "../../common/apiService";

const state = {
    titlePlaylist: "",
    playlist: {},
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
        // console.log("FETCH_PLAYLIST", dataUser.username, dataUser.idPodcast);
        return PlaylistService.listFromUser( dataUser.username, dataUser.idPodcast )
                              .then(({ data }) => {
                                  commit(SET_PLAYLISTS, data);
                              })
    },

    [FETCH_DETAIL_PLAYLIST](context, idPlaylist){
        return PlaylistService.detailPlaylist(idPlaylist)
                              .then(({ data }) => {
                                //   console.log(data);
                                context.commit(SET_DETAIL_PLAYLIST, data);
                              })
    },

    [PLAYLIST_ADD]({ commit }, dataPlaylist) {
        return PlaylistService.addToPlaylist( dataPlaylist.idPlaylist, dataPlaylist.idPodcast );
    },

    [PLAYLIST_REMOVE]({ commit }, dataPlaylist) {
        return PlaylistService.removeFromPlaylist( dataPlaylist.idPlaylist, dataPlaylist.idPodcast );
    },

    [PLAYLIST_EDIT]({ commit }, dataPlaylist) {
        return PlaylistService.update(dataPlaylist.id, { title: dataPlaylist.title } )
                              .then(({ data }) => {
                                commit(SET_DETAIL_PLAYLIST, data);
                              });
    },

    [PLAYLIST_DELETE]({ commit }, dataPlaylist) {
        return PlaylistService.destroy(dataPlaylist.id);
    }
    
}

const mutations = {
    [SET_PLAYLISTS](state, data){
        state.playlists = data.playlists;
    },

    [SET_DETAIL_PLAYLIST](state, data){
        state.playlist = data;
    }

}

const getters = {

    titlePlaylist(state) {
        return state.titlePlaylist;
    },

    playlists(state){
        return state.playlists;
    },

    playlist(state) {
        return state.playlist;
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}
