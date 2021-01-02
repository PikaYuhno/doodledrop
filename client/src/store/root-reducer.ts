import {combineReducers} from 'redux';
import {AlertState} from './alert/types';
import alertReducer from './alert/reducers';
import {AuthState} from './auth/types';
import authReducer from './auth/reducers';
import chatReducer from './chat/reducers';
import {ChatState} from './chat/types';

export type RootReducer = {
    auth: AuthState,
    alert: AlertState[],
    chat: ChatState
}
export default combineReducers({auth: authReducer, alert: alertReducer, chat: chatReducer});
