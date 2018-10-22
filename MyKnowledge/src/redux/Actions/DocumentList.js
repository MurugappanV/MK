import { Types } from '../Types';

export function setDocumentList(pageNo, totalPages, documents) {
    return (dispatch, getState) => {
        dispatch({type: Types.documentList.SET_DOC_LIST, data: {pageNo, totalPages, documents}});
    }
}

export function clearDocumentList() {
    return (dispatch, getState) => {
        dispatch({type: Types.documentList.CLEAR_DOC_LIST});
    }
}