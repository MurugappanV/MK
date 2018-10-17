import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {
    accessories: [],
    languages: [],
    platforms: []
}

export const settings = createReducer(initialState, {
    [Types.settings.SET_ACCESSORIES](state, action) {
        return {
            ...state,
            accessories: action.accessories
        }
    },
    [Types.settings.SET_LANGUAGES](state, action) {
        return {
            ...state,
            languages: action.languages
        }
    },
    [Types.settings.SET_PLATFORMS](state, action) {
        return {
            ...state,
            platforms: action.platforms
        }
    }
});