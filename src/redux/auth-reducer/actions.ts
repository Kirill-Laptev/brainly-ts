import { AuthStateType } from './auth-reducer';
import { IValuesType } from './../../components/login/LoginForm';
import { AppStateType, AppActionsType } from './../store/store';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { authAPI } from './../../api/auth-api';

export enum ACTIONS_TYPE_AUTH {
    SET_AUTH_DATA = 'auth/SET_AUTH_DATA',
    LOGIN = 'auth/LOGIN'
}


export type AuthActionsType = ReturnType<typeof setAuthDataAC>


// Actions
export const setAuthDataAC = (authData: AuthStateType) => {
    return {type: ACTIONS_TYPE_AUTH.SET_AUTH_DATA, payload: {authData}} as const
}


// Thunk's
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>

export const getAuthUserDataTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        return authAPI.getAuthData()
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setAuthDataAC({...data.data, isAuth: true}))
            }
        })
    }
}

export const loginTC = (email: string, password: string, setSubmitting: Function): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        authAPI.login(email, password)
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(getAuthUserDataTC())
            }
        })
        .finally(setSubmitting(false))
    }
}

export const logoutTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        authAPI.logout()
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(setAuthDataAC({id: null, email: null, login: null, isAuth: false}))
            }
        })
    }
}

