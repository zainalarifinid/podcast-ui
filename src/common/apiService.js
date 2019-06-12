
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwtService";
import { DOMAIN_AUTH0, CLIENTID_AUTH0, CLIENTSECRET_AUTH0, API_URL } from "./config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
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

const params_default = {
    client_id: `${CLIENTID_AUTH0}`,
    client_secret: `${CLIENTSECRET_AUTH0}`
};

export const AuthService = {
    login(params){
        const urlLogin = `${DOMAIN_AUTH0}/oauth/token`;
        params["grant_type"] = "password";
        params["audience"] = `${DOMAIN_AUTH0}/api/v2/`;
        params["json"] = true;
        params = { ...params, ...params_default };
        return ApiService.post(urlLogin, params);
    },
    logout(){
        const urlLogout = `${DOMAIN_AUTH0}/v2/logout`;
        const params = {
            ...params_default,
            returnTo: DOMAIN_AUTH0
        }
        return ApiService.post(urlLogout, params);
    },
    register(params){
        const urlRegister = `${DOMAIN_AUTH0}/dbconnections/signup`;
        params["connection"] = "Username-Password-Authentication";
        params = { ...params, ...params_default };
        return ApiService.post(urlRegister, params)
    }
}

