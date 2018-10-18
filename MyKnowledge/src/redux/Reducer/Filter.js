import {Types} from '../Types';
import createReducer from './CreateReducer';

const initialState = {
    platformId: 1,
    series: [],
    accessories: []
}

export const filters = createReducer(initialState, {
    [Types.filter.APPLY_FILTER](state, action) {
        return {
            platformId: action.data.platform, 
            series: action.data.series, 
            accessories: action.data.accessories
        }
    },
    [Types.filter.SET_FILTER_PLATFORM](state, action) {
        return {
            ...state,
            platformId: action.data.platform, 
            series: state.platformId == action.data.platform ? state.series : [], 
        }
    },
});