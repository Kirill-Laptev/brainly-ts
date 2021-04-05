import { AllUsersActionType } from './../users-reducer/actions';
import { AllAuthActionsType } from './../auth-reducer/actions';
import { AllProfileActionsType } from './../profile-reducer/actions';
import { authReducer } from './../auth-reducer/auth-reducer';
import { profileReducer } from './../profile-reducer/profile-reducer';
import { combineReducers, createStore, applyMiddleware } from "redux";
import { usersReducer } from '../users-reducer/users-reducer';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

// Все типы экшнов всего приложения
export type ActionsType = 
AllAuthActionsType |
AllProfileActionsType |
AllUsersActionType


//@ts-ignore
window.store = store