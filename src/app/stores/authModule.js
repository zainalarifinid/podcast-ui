
import ApiService, { AuthService } from "../../common/apiService";
import JwtService from "../../common/jwtService";
import { 
    LOGIN,
    LOGOUT,
    REGISTER,
    CHECK_AUTH
 } from "./actionTypes";
 import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutationTypes";

 const state = {
     errors: null,
     user: {},
     isAuthenticated: !!JwtService.getToken()
 };

 const getters = {
     currentUser(state){
         console.log(state.user);
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
                    context.commit(SET_AUTH, data);
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
                    // context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                })
         })
     },

     [CHECK_AUTH](context) {
         if (typeof JwtService.getToken() !== "") {
             ApiService.setHeader();
             ApiService.post("auth/verify", { token: JwtService.getToken() })
                .then(({ data }) => {
                    console.log("CHECK_AUTH", data);
                    context.commit(SET_AUTH, data);
                })
                .catch(({ response }) => {
                    context.commit(PURGE_AUTH);
                    context.commit(SET_ERROR, response);
                })
         }else{
             context.commit(PURGE_AUTH);
         }
     }
 };

 const mutations = {
     [SET_ERROR](state, error){
         state.errors = error;
     },
     [SET_AUTH](state, dataLogin){
         state.isAuthenticated = true;
         state.errors = {};
         state.user = {
            email: dataLogin.email,
            username: dataLogin.username
         };
         JwtService.saveToken(dataLogin.accessToken)
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
