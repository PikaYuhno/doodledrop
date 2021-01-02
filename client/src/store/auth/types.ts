import {JWTPayload as AuthUser} from '../../global';
import {Action} from '../../global';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const USER_LOADED = "USER_LOADED";
export const LOGOUT = "LOGOUT";

export type AuthState = {
    isLoaded: boolean;
    isAuthenticated: boolean;
    user: AuthUser | null;
    token: string | null;
}

export type AuthActionTypes = Action<"LOGIN_SUCCESS", {token: string}> |
    Action<"LOGOUT"> |
    Action<"USER_LOADED", {user: AuthUser}> 
