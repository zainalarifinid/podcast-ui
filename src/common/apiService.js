
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwtService";
import { API_URL } from "./config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader(){
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
    },

    get(resource, slug = ""){
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`Api Service ${error}`);
        })
    },

    post(resource, params){
        return Vue.axios.post(`${resource}`, params);
    },

    update(resource, slug, params){
        return Vue.axios.put(`${resource}/${slug}`, params)
    },

    delete(resource){
        return Vue.axios.delete(`${resource}`).catch(error => {
            throw new Error(`ApiService ${error}`);
        })
    }

}

export default ApiService;

const params_default = {};

export const AuthService = {
    login(params){
        const urlLogin = "auth/login";
        params = { ...params, ...params_default };
        return ApiService.post(urlLogin, params);
    },
    logout(){
        const urlLogout = "auth/logout";
        const params = {
            ...params_default
        }
        return ApiService.post(urlLogout, params);
    },
    register(params){
        const urlRegister = "auth/register";
        params = { ...params, ...params_default };
        return ApiService.post(urlRegister, params)
    }
}

export const UserService = {
    list() {
        return ApiService.get("users");
    },

    create(params) {
        return ApiService.post("users", params);
    },

    detail(){
        return ApiService.get("users/detail");
    }

}

export const PodcastService = {
    list() {
        return ApiService.get("podcasts");
    },

    get(slug) {
        return ApiService.get("podcasts/detail", slug);
    },

    create(params) {
        return ApiService.post("podcasts", params);
    },

    update(slug, params) {
        return ApiService.update("podcasts", slug, params);
    },

    destroy(slug) {
        console.log("Delete podcast",slug);
        return ApiService.delete(`podcasts/${slug}`);
    },

    search(slug) {
        return ApiService.get(`podcasts/search/${slug}`);
    }
}

export const PlaylistService = {
    list() {
        return ApiService.get("playlists");
    },

    listFromUser(username, idPodcast) {
        return ApiService.post("playlists/detail-from", { username: username, idPodcast: idPodcast })
    },

    addToPlaylist(idPlaylist, idPodcast) {
        return ApiService.post(`playlists/${idPlaylist}/add-playlist/${idPodcast}`);
    },

    removeFromPlaylist(idPlaylist, idPodcast) {
        return ApiService.post(`playlists/${idPlaylist}/remove-playlist/${idPodcast}`);
    },

    create(params) {
        return ApiService.post("playlists", params);
    },

    update(slug, params) {
        return ApiService.update("playlists", slug, params);
    },

    destroy(slug){
        return ApiService.delete(`playlists/${slug}`);
    }
}
