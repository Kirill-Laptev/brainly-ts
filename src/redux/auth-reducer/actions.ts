import { AppStateType, ActionsType } from './../store/store';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AuthDataType, authAPI } from './../../api/auth-api';

export enum ACTIONS_TYPE_AUTH {
    SET_AUTH_DATA = 'auth/SET_AUTH_DATA'
}

export type SetAuthDataType = {
    type: ACTIONS_TYPE_AUTH.SET_AUTH_DATA
    payload: {
        authData: AuthDataType
    }
}

export type AllAuthActionsType = SetAuthDataType

// Actions
export const setAuthDataAC = (authData: AuthDataType): SetAuthDataType => {
    return {type: ACTIONS_TYPE_AUTH.SET_AUTH_DATA, payload: {authData}}
}

// Thunk's
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const getAuthUserDataTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        authAPI.getAuthData()
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setAuthDataAC(data.data))
            }
        })
    }
}

