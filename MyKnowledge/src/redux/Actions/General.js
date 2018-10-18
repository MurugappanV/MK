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

export function logout() {
    return (dispatch, getState) => {
        dispatch({type: Types.general.CLEAR_USER_NAME});
        dispatch({type: Types.default.CLEAR_DEFAULT});
    }
}