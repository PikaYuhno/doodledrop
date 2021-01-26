import * as types from "./types";

const initialState: types.AuthState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    isLoaded: false,
    token: localStorage.getItem("token") || null,
    user: null,
}

const reducer = (state = initialState, action: types.AuthActionTypes): types.AuthState => {
    switch(action.type) {
        case types.LOGIN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload!.token,
            }
        case types.LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                isLoaded: false,
                token: null,
                user: null,
            }
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoaded: true,
                user: action.payload!.user,
            }
        default:
            return state;
    }
}
export default reducer;
