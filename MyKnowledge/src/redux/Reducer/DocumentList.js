import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {
    pageNo: 0,
    totalPages: -1,
    documents: []
}

export const documentList = createReducer(initialState, {
    [Types.documentList.SET_DOC_LIST](state, action) {
        const {pageNo, totalPages, documents} = action.data
        return {
            pageNo: pageNo,
            totalPages: totalPages,
            documents: addDocuments(state.pageNo, pageNo, state.documents, documents)
        }
    },
    [Types.documentList.CLEAR_DOC_LIST](state, action) {
        return initialState
    },
});

addDocuments = (prevPage, currentPage, prevDocument, newDocument) => {
    if(currentPage == 1) {
        return newDocument
    } else {
        if(prevPage == currentPage) {
            return prevDocument.concat([])
        } else {
            return prevDocument.concat(newDocument)
        }
    }
}