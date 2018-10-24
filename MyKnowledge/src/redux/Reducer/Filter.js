import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {
    platformId: 1,
    platformName: "HP PageWide XL",
    series: [],
    accessories: [],
    dataType: []
}

export const filters = createReducer(initialState, {
    [Types.filter.APPLY_FILTER](state, action) {
        return {
            platformId: action.data.platform, 
            platformName: action.data.platformName, 
            series: action.data.series, 
            accessories: action.data.accessories
        }
    },
    [Types.filter.SET_FILTER_PLATFORM](state, action) {
        return {
            ...state,
            platformId: action.data.platform, 
            platformName: action.data.platformName,
            series: state.platformId == action.data.platform ? state.series : [], 
        }
    },
    [Types.filter.SET_DATA_TYPE](state, action) {
        return {
            ...state,
            dataType: action.data
        }
    },
    [Types.filter.CLEAR_DATA_TYPE](state, action) {
        return {
            ...state,
            dataType: []
        }
    },
    [Types.filter.CLEAR_FILTER](state, action) {
        return {
            platformId: 1,
            platformName: "HP PageWide XL",
            series: [],
            accessories: [],
            dataType: state.dataType
        }
    },
});