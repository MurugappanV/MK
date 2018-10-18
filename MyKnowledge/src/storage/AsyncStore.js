import { AsyncStorage } from 'react-native'


export function setAuthValue(authToken) {
    AsyncStorage.setItem('authTokens', authToken);
}

export function getAuthValue() {
    return AsyncStorage.getItem('authTokens')
}

export function setUserName(name) {
    AsyncStorage.setItem('userName', name);
}

export function getUserName() {
    return AsyncStorage.getItem('userName')
}

export function setDefaultPlatform(platformId) {
    AsyncStorage.setItem('platformId', platformId);
}

export function getDefaultPlatform() {
    return AsyncStorage.getItem('platformId')
}