import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {}

export const document = createReducer(initialState, {
    [Types.document.SET_DOC_DATA](state, action) {
        return action.data
    },
    [Types.document.CLEAR_DOC_DATA](state, action) {
        return initialState
    },
});