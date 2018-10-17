import { Types } from '../Types';

export function setDefaultPlatform(id) {
    return (dispatch, getState) => {
        dispatch({type: Types.default.SET_DEFAULT_PLATFORM, id: id});
    }
}