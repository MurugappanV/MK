import { Types } from '../Types';
import { DataTypes } from '../../asset'

export function setFilters(platform, platformName, series, accessories) {
    return (dispatch, getState) => {
        dispatch({type: Types.filter.APPLY_FILTER, data: {platform, platformName, series, accessories}});
    }
}

export function setFilterPlatform(platform, platformName) {
    return (dispatch, getState) => {
        dispatch({type: Types.filter.SET_FILTER_PLATFORM, data: {platform, platformName}});
    }
}


export function setFilterDataType(dataType) {
    return (dispatch, getState) => {
        if(dataType == DataTypes.All) {
            dispatch({type: Types.filter.SET_DATA_TYPE, data: []})
        } else if(dataType == DataTypes.Newsletters) {
            dispatch({type: Types.filter.SET_DATA_TYPE, data: [4]})
        } else if(dataType == DataTypes.Service) {
            dispatch({type: Types.filter.SET_DATA_TYPE, data: [1]})
        } else if(dataType == DataTypes.Videos) {
            dispatch({type: Types.filter.SET_DATA_TYPE, data: [3]})
        } else if(dataType == DataTypes.Trainings) {
            dispatch({type: Types.filter.SET_DATA_TYPE, data: [6]})
        } else if(dataType == DataTypes.Communications) {
            dispatch({type: Types.filter.SET_DATA_TYPE, data: [5]})
        } 
    }
}