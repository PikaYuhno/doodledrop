import {AlertState, AlertActionTypes} from "./types";

const initialState: AlertState[] = [];

export default (state = initialState, action: AlertActionTypes): AlertState[] => {
    switch(action.type) {
        case "SET_ALERT":
            return [
                ...state,
                action.payload
            ]
        case "REMOVE_ALERT":
            return state.filter(alerts => alerts.id !== action.payload.id);
        default:
            return state;
    }
}
