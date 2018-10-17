import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {
    platformId: 1,
}

export const defaultSettings = createReducer(initialState, {
    [Types.default.SET_DEFAULT_PLATFORM](state, action) {
        return {
            ...state,
            platformId: action.id
        }
    },
});