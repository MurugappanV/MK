import { Types } from '../Types';

export function setAccessories(accessories) {
    return (dispatch, getState) => {
        dispatch({type: Types.settings.SET_ACCESSORIES, accessories: accessories});
    }
}

export function setLanguages(languages) {
    return (dispatch, getState) => {
        dispatch({type: Types.settings.SET_LANGUAGES, languages: languages});
    }
}

export function setPlatforms(platforms) {
    return (dispatch, getState) => {
        dispatch({type: Types.settings.SET_PLATFORMS, platforms: platforms});
    }
}