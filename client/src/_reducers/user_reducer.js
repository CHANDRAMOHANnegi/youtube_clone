import {
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    AUTH_USER, LOGOUT_USER,
    // USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    // USER_REGISTER_REQUEST
} from '../_actions/types';

const initialState = {

    error: "",
    userData: {},
    isAuthenticated: false

};

export default function (state = initialState, action) {
    // console.log(action);
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                error: '',
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                userData: action.payload,
                error: "",
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                error: "",
                isAuthenticated: true
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                userData: action.payload,
                error: action.payload.error,
                isAuthenticated: false
            }
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case LOGOUT_USER:
            return { ...state }
        default:
            return state;
    }
}