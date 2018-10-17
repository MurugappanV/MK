import { Types } from '../Types';

export function setUserName(userName) {
    return (dispatch, getState) => {
        dispatch({type: Types.general.ADD_USER_NAME, userName: userName});
    }
}

export function clearUserName() {
    return (dispatch, getState) => {
            dispatch({type: Types.general.CLEAR_USER_NAME});
    }
}