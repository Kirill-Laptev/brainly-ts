import { AuthDataType } from './../../api/auth-api';

export enum ACTIONS_TYPE_AUTH {
    SET_AUTH_DATA = 'auth/SET_AUTH_DATA'
}

type SetAuthDataType = {
    type: ACTIONS_TYPE_AUTH.SET_AUTH_DATA
    payload: {
        authData: AuthDataType
    }
}

export type AllAuthActionsType = SetAuthDataType


export const setAuthDataAC = (authData: AuthDataType) => {
    return {type: ACTIONS_TYPE_AUTH.SET_AUTH_DATA, payload: {authData}}
}