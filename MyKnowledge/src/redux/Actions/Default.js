import { Types } from '../Types';

export function setDefaultPlatform(id, name) {
    return (dispatch, getState) => {
        dispatch({type: Types.default.SET_DEFAULT_PLATFORM, data: {id: id, name: name}});
    }
}