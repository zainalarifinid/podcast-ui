
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwtService";
import AppConfig from "./config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = AppConfig.API_URL;
    },

    setHeader(){
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${JwtService.getToken()}`;
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
        const urlLogin = "http://localhost:3000/api/v1/auth/login";
        params = { ...params, ...params_default };
        return ApiService.post(urlLogin, params);
    },
    logout(){
        const urlLogout = "http://localhost:3000/auth/logout";
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
    list(){
        return ApiService.post(AppConfig.URL_LIST_USER);
    }
}

