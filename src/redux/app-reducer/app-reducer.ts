import { AppReducerActionsType } from "./actions"

type InitialStateType = {
    isInicialized: boolean
}

const initialState: InitialStateType  = {
    isInicialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType) => {
    switch(action.type){
        case 'app/SET_APP_INICIALIZED': 
            return {
                ...state,
                isInicialized: true
            }

        default:
            return state
    }
}


