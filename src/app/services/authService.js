// authService.js
import auth0 from "auth0-js";
import { EventEmitter } from "events";
import authConfig from "../../../auth_config.json";
import AuthApiService from './AuthApiService';

const webAuth = new auth0.WebAuth({
    domain: authConfig.domain,
    redirectUri: `${window.location.origin}/callback`,
    clientID: authConfig.clientId,
    responseType: "id_token",
    scope: "openid profile email"
});

// const authentication = new auth0.Authentication({
//     domain: authConfig.domain,
//     clientID: authConfig.clientId,
// });

const LOCAL_STORAGE_KEY = "podcastLoggedIn";
const LOGIN_EVENT = "loginEvent";

class AuthService extends EventEmitter{
    idToken = null;
    profile = null;
    tokenExpiry = null;

    login(customState) {
        webAuth.authorize({
          appState: customState
        });
    }

    logOut() {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    
        this.idToken = null;
        this.tokenExpiry = null;
        this.profile = null;
    
        webAuth.logout({
          returnTo: `${window.location.origin}`
        });
    
        this.emit(LOGIN_EVENT, { loggedIn: false });
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            webAuth.parseHash((err, authResult) => {
            if (err) {
                this.emit(LOGIN_EVENT, {
                loggedIn: false,
                error: err,
                errorMsg: err.statusText
                });
                reject(err);
            } else {
                this.localLogin(authResult);
                resolve(authResult.idToken);
            }
            });
        });
    }

    isAuthenticated() {
        return (
            Date.now() < this.tokenExpiry &&
            localStorage.getItem(LOCAL_STORAGE_KEY) === "true"
        );
    }

    isIdTokenValid() {
        return this.idToken && this.tokenExpiry && Date.now() < this.tokenExpiry;
    }

    getIdToken() {
        return new Promise((resolve, reject) => {
            if (this.isIdTokenValid()) {
            resolve(this.idToken);
            } else if (this.isAuthenticated()) {
            this.renewTokens().then(authResult => {
                resolve(authResult.idToken);
            }, reject);
            } else {
            resolve();
            }
        });
    }

    localLogin(authResult) {
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;

        // Convert the expiry time from seconds to milliseconds,
        // required by the Date constructor
        this.tokenExpiry = new Date(this.profile.exp * 1000);

        localStorage.setItem(LOCAL_STORAGE_KEY, "true");

        this.emit(LOGIN_EVENT, {
            loggedIn: true,
            profile: authResult.idTokenPayload,
            state: authResult.appState || {}
        });
    }

    renewTokens() {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(LOCAL_STORAGE_KEY) !== "true") {
            return reject("Not logged in");
            }

            webAuth.checkSession({}, (err, authResult) => {
            if (err) {
                reject(err);
            } else {
                this.localLogin(authResult);
                resolve(authResult);
            }
            });
        });
    }

    register(email, username, password){
        try {
            const authApiService = new AuthApiService();

            authApiService.register(email, username, password);

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

}

export default new AuthService();

