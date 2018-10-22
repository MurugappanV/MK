import { combineReducers } from 'redux';
import * as HandleException from './HandleException';
import * as GeneralReducer from './General';
import * as SettingsReducer from './Settings';
import * as DefaultReducer from './Default';
import * as FilterReducer from './Filter';
import * as DocumentReducer from './Document';
import * as DocumentListReducer from './DocumentList';

let reducer = combineReducers(Object.assign(
    HandleException,
    GeneralReducer,
    SettingsReducer,
    DefaultReducer,
    FilterReducer,
    DocumentReducer,
    DocumentListReducer
));
export default reducer;