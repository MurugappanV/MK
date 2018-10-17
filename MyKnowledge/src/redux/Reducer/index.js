import { combineReducers } from 'redux';
import * as HandleException from './HandleException';
import * as GeneralReducer from './General';
import * as SettingsReducer from './Settings';
import * as DefaultReducer from './Default';

let reducer = combineReducers(Object.assign(
    HandleException,
    GeneralReducer,
    SettingsReducer,
    DefaultReducer
));
export default reducer;