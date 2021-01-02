import {v4 as uuidv4} from 'uuid';
import {AlertType} from './types';

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

export const alert = (msg: string, alertType: AlertType, timeout: number) => (dispatch: (arg: ReturnType<typeof setAlert | typeof removeAlert>) => void) => {
    const id = uuidv4();
    dispatch(setAlert(msg, alertType, id, timeout));
    setTimeout(() => {
        dispatch(removeAlert(id));
    }, timeout * 1000);
}
