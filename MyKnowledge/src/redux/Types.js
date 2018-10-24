const EXCEPTION = 'EXCEPTION';
const CLEAR_EXCEPTION_MSG = 'CLEAR_EXCEPTION_MSG';
const ADD_USER_NAME = 'ADD_USER_NAME';
const CLEAR_USER_NAME = 'CLEAR_USER_NAME';
const SET_ACCESSORIES = 'SET_ACCESSORIES';
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_PLATFORMS = 'SET_PLATFORMS';
const SET_DEFAULT_PLATFORM = 'SET_DEFAULT_PLATFORM';
const CLEAR_DEFAULT = 'CLEAR_DEFAULT';
const APPLY_FILTER = 'APPLY_FILTER';
const SET_FILTER_PLATFORM = 'SET_FILTER_PLATFORM';
const CLEAR_FILTER = 'CLEAR_FILTER';
const SET_DOC_LIST = 'SET_DOC_LIST';
const CLEAR_DOC_LIST ='CLEAR_DOC_LIST';
const SET_DOC_DATA = 'SET_DOC_DATA';
const CLEAR_DOC_DATA = 'CLEAR_DOC_DATA';
const SET_DATA_TYPE = 'SET_DATA_TYPE';
const CLEAR_DATA_TYPE = 'CLEAR_DATA_TYPE';

export const Types = {
    exception: {
        EXCEPTION,
        CLEAR_EXCEPTION_MSG,
    },
    general: {
        ADD_USER_NAME,
        CLEAR_USER_NAME
    },
    settings: {
        SET_ACCESSORIES,
        SET_LANGUAGES,
        SET_PLATFORMS
    },
    default: {
        SET_DEFAULT_PLATFORM,
        CLEAR_DEFAULT
    },
    filter: {
        APPLY_FILTER,
        SET_FILTER_PLATFORM,
        SET_DATA_TYPE,
        CLEAR_DATA_TYPE,
        CLEAR_FILTER
    },
    documentList: {
        SET_DOC_LIST,
        CLEAR_DOC_LIST
    },
    document: {
        SET_DOC_DATA,
        CLEAR_DOC_DATA
    }   
}