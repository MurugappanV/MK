import {Types} from '../Types';
import createReducer from './CreateReducer';

export const userName = createReducer(null, {
    [Types.general.ADD_USER_NAME](state, action) {
         return action.userName;
    },
    [Types.general.CLEAR_USER_NAME](state, action) {
        return null
    }
});