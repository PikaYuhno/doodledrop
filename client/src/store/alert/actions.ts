import {v4 as uuidv4} from 'uuid';
import {AlertType} from './types';
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootReducer} from "../root-reducer";

export const setAlert = (msg: string, alertType: AlertType, id: string, timeout = 3) => {
    return {
        type: "SET_ALERT",
        payload: {
            msg,
            alertType,
            id,
            timeout
        }
    };
}


export const removeAlert = (id: string) => {
    return {
        type: "REMOVE_ALERT",
        payload: {id}
    };
}

export const alert: ActionCreator<ThunkAction<void, RootReducer, unknown, Action>> = (msg: string, alertType: AlertType, timeout: number) => (dispatch) => {
    const id = uuidv4();
    dispatch(setAlert(msg, alertType, id, timeout));
    setTimeout(() => {
        dispatch(removeAlert(id));
    }, timeout * 1000);
}
