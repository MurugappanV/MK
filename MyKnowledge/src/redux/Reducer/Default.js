import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {
    platformId: 1,
    platformName: "HP PageWide XL",
}

export const defaultSettings = createReducer(initialState, {
    [Types.default.SET_DEFAULT_PLATFORM](state, action) {
        return {
            ...state,
            platformId: action.data.id,
            platformName: action.data.name,
        }
    },
    [Types.default.CLEAR_DEFAULT](state, action) {
        return initialState
    },
});