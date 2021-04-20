import { AppStateType, AppActionsType } from './../store/store';
import { ThunkDispatch, ThunkAction } from "redux-thunk"
import { getAuthUserDataTC } from '../auth-reducer/actions';


// Actions

export const inicializedSuccessAC = () => ({type: 'app/SET_APP_INICIALIZED'} as const)

// Thunk's

export const appInicializeTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppReducerActionsType>) => {
        const promise = dispatch(getAuthUserDataTC())
        Promise.all([promise])
        .then(() => {
            dispatch(inicializedSuccessAC())
        })
    }
}


type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>

export type AppReducerActionsType = 
| ReturnType<typeof inicializedSuccessAC>