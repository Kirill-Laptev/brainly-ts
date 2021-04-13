import { AuthStateType } from './auth-reducer';
import { IValuesType } from './../../components/login/LoginForm';
import { AppStateType, ActionsType } from './../store/store';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { authAPI } from './../../api/auth-api';

export enum ACTIONS_TYPE_AUTH {
    SET_AUTH_DATA = 'auth/SET_AUTH_DATA',
    LOGIN = 'auth/LOGIN'
}


export type AllAuthActionsType = ReturnType<typeof setAuthDataAC>


// Actions
export const setAuthDataAC = (authData: AuthStateType) => {
    return {type: ACTIONS_TYPE_AUTH.SET_AUTH_DATA, payload: {authData}} as const
}


// Thunk's
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const getAuthUserDataTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        authAPI.getAuthData()
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setAuthDataAC({...data.data, isAuth: true}))
            }
        })
    }
}

export const loginTC = (email: string, password: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        authAPI.login(email, password)
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(getAuthUserDataTC())
            }
        })
    }
}

export const logoutTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        authAPI.logout()
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setAuthDataAC({id: null, email: null, login: null, isAuth: false}))
            }
        })
    }
}

