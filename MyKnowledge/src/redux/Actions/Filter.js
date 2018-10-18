import { Types } from '../Types';

export function setFilters(platform, series, accessories) {
    return (dispatch, getState) => {
        dispatch({type: Types.filter.APPLY_FILTER, data: {platform, series, accessories}});
    }
}

export function setFilterPlatform(platform) {
    return (dispatch, getState) => {
        dispatch({type: Types.filter.SET_FILTER_PLATFORM, data: {platform}});
    }
}

