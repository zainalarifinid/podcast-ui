
import ApiService, { AuthService } from "../../common/apiService";
import JwtService from "../../common/jwtService";
import { 
    LOGIN,
    LOGOUT,
    REGISTER
 } from "./actionTypes";
 import { DOMAIN_AUTH0, CLIENTID_AUTH0 } from "../../common/config";
 import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutationTypes";

 const state = {
     errors: null,
     user: {},
     isAuthenticated: !!JwtService.getToken()
 };

 const getters = {
     currentUser(state){
         return state.user;
     },
     isAuthenticated(state){
         return state.isAuthenticated;
     }
 };

 const actions = {
     [LOGIN](context, credentials){
         return new Promise(resolve => {
             AuthService.login(credentials)
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                })
         })
     },
     [LOGOUT](context){
         context.commit(PURGE_AUTH);
     },
     [REGISTER](context, credentials){
         return new Promise((resolve, reject) => {
            AuthService.register(credentials)
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                })
         })
     }
 };

 const mutations = {
     [SET_ERROR](state, error){
         state.errors = error;
     },
     [SET_AUTH](state, user){
         state.isAuthenticated = true;
         state.user = user;
         state.errors = {};
         JwtService.saveToken(state.user.token)
     },
     [PURGE_AUTH](state){
         state.isAuthenticated = false;
         state.user = {};
         state.errors = {};
         JwtService.destoryToken();
     }
 }

 export default {
     state,
     actions,
     mutations,
     getters
 }
