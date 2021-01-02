import {combineReducers} from 'redux';
import {AlertState} from './alert/types';
import {AuthState} from './auth/types';
import authReducer from './auth/reducers';
import alertReducer from './alert/reducers';

export type RootReducer = {
    auth: AuthState,
    alert: AlertState[]
}
export default combineReducers({auth: authReducer, alert: alertReducer});
