import {Action} from '../../global';

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

export type AlertState = {
    msg: string;
    id: string;
    alertType: AlertType;
    timeout: number;
}

export type AlertActionTypes = Action<"SET_ALERT", AlertState> |
    Action<"REMOVE_ALERT", {id: string}>;

export enum AlertType {
    SUCCESS = "success",
    FAIL = "danger",
    WARNING = "warning"

}
