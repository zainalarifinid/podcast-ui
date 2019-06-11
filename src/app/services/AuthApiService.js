
import Http from 'http';
// import { isUndef } from "../../common/common";
import authConfig from '../../../auth_config.json';

class AuthApiService{

    constructor(){
        this.http = Http;

    }

    login(username, password){
        const urlLogin = `${authConfig.domain}/oauth/token`;
        const paramLogin = {
            grant_type: 'password',
            username: username,
            password: password,
            audience: `${authConfig.domain}/api/v2/`,
            client_id: authConfig.clientId,
            client_secret: authConfig.clientSecret,
            json: true
        }
        return this.http.post(urlLogin, paramLogin);
    }

    register(email, username, password){
        const urlRegister = `${authConfig.domain}/dbconnections/signup`;
        const paramRegister = {
            client_id: authConfig.clientId,
            email: email,
            username: username,
            password: password,
            name: username,
            connection: 'Username-Password-Authentication'
        }
        return this.http.post(urlRegister, paramRegister);
    }

    logout(){
        const urlLogout = `${authConfig.domain}/v2/logout`;
        const paramLogout = {
            client_id: authConfig.clientId,
            returnTo: authConfig.domain
        };

        return this.http.post(urlLogout, paramLogout);

    }

}

export default AuthApiService;
