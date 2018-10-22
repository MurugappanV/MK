import { Types } from '../Types';

export function setDocumentData(data) {
    return (dispatch, getState) => {
        dispatch({type: Types.document.SET_DOC_DATA, data: data});
    }
}

export function clearDocumentData() {
    return (dispatch, getState) => {
        dispatch({type: Types.document.CLEAR_DOC_DATA});
    }
}