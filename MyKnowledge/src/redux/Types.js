const EXCEPTION = 'EXCEPTION';
const CLEAR_EXCEPTION_MSG = 'CLEAR_EXCEPTION_MSG';
const ADD_USER_NAME = 'ADD_USER_NAME';
const CLEAR_USER_NAME = 'CLEAR_USER_NAME';
const SET_ACCESSORIES = 'SET_ACCESSORIES';
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_PLATFORMS = 'SET_PLATFORMS';
const SET_DEFAULT_PLATFORM = 'SET_DEFAULT_PLATFORM';

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
        SET_DEFAULT_PLATFORM
    }
}