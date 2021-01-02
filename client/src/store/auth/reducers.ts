import {AuthActionTypes, AuthState} from "./types";
// TODO: Make alert global?

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    isLoaded: false,
    token: localStorage.getItem("token") || null,
    user: null,
}


export default (state = initialState, action: AuthActionTypes): AuthState => {
    switch(action.type) {
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                isLoaded: false,
                token: null,
                user: null,
            }
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoaded: true,
                user: action.payload.user,
            }
        default:
            return state;
    }
}
