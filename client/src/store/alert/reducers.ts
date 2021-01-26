import * as types from "./types";

const initialState: types.AlertState[] = [];

const reducer = (state = initialState, action: types.AlertActionTypes): types.AlertState[] => {
    switch(action.type) {
        case types.SET_ALERT:
            return [
                ...state,
                action.payload!
            ]
        case types.REMOVE_ALERT:
            return state.filter(alerts => alerts.id !== action.payload!.id);
        default:
            return state;
    }
}

export default reducer;
