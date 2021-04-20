import { ACTIONS_TYPE_AUTH, AuthActionsType } from "./actions"

export type AuthStateType = {
    id: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch(action.type){
        case ACTIONS_TYPE_AUTH.SET_AUTH_DATA: 
            return {
                ...state,
                ...action.payload.authData
            }

        default:
            return state
    }
}