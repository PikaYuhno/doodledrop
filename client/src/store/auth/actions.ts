import {JWTPayload as AuthUser} from '../../global';
import {UserRegister} from '../../components/pages/Register';
import {APIResponse} from '../../global';
import {UserLogin} from '../../components/pages/Login';
import {alert} from '../alert/actions';
import {AlertType} from '../alert/types';

const BASE_URL = "http://localhost:4000";

export const loginSuccess = (token: string) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            token 
        }
    }
}


export const userLoaded = (user: AuthUser) => {
    return {
        type: "USER_LOADED",
        payload: {
            user
        }
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}


export const loadUser = (socket: SocketIOClient.Socket) => async (dispatch: (arg: ReturnType<typeof userLoaded | typeof logout>) => void) => {
    let token = localStorage.getItem("token");
    if(!token) {
        dispatch(logout());
        return;
    };
    const resposne = await fetch(`${BASE_URL}/api/auth/validateToken`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            token
        })
    }); 
    const jsonRes = await resposne.json();
    if(jsonRes.success) {
        dispatch(userLoaded(jsonRes.data));
        socket.emit("join-room", jsonRes.data.id);
        console.log("Joined room - user-room-", jsonRes.data.id);
    } else {
        dispatch(logout());
    }
}

export const login = (user: UserLogin) => async (dispatch: (arg: ReturnType<any>) => void) => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });    
    const jsonRes: APIResponse = await response.json();
    if(jsonRes.success) {
        dispatch(alert(jsonRes.message, AlertType.SUCCESS, 3));
        dispatch(loginSuccess(jsonRes.data));
        localStorage.setItem("token", jsonRes.data);
    } else {
        dispatch(alert(jsonRes.message, AlertType.FAIL, 3));
    }

}

export const register = (user: UserRegister) => async (dispatch: (arg: any) => void) => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });
    const jsonRes: APIResponse = await response.json();
    if(jsonRes.success) {
        dispatch(alert(jsonRes.message, AlertType.SUCCESS, 3));
    } else {
        dispatch(alert(jsonRes.message, AlertType.FAIL, 3));
    }
}
