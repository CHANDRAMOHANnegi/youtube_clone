import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';


export const loginUser = (dataToSubmit) => async (dispatch) => {
    try {
        const { email, password } = dataToSubmit;
        console.log(dataToSubmit);
        const requestBody = `{
                login(email:"${email}",password:"${password}"){
                    userId,token,
                    tokenExp,firstname,
                    lastname,role,
                    image,email
            }}`;

        let response = await  axios.post('/', {
            query: requestBody,
        });
        console.log(response);
        if (response) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response.data.data.login
            });
        } else {
            dispatch({
                type: USER_LOGIN_FAILURE,
                payload: { error: "login error" }
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function auth() {

    // const requestBody = {
    //     query: `
    //     query{
    //        createUser(userInput:{email:"${email}",password:"${password}",name:"${name}",lastname:${lastname},image:"${image}"}){
    //         id
    //         email
    //     }
    // }
    // `};

    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }

}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

