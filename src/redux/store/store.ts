import { appReducer } from './../app-reducer/app-reducer';
import { UsersActionType } from './../users-reducer/actions';
import { AuthActionsType } from './../auth-reducer/actions';
import { ProfileActionsType } from './../profile-reducer/actions';
import { authReducer } from './../auth-reducer/auth-reducer';
import { profileReducer } from './../profile-reducer/profile-reducer';
import { combineReducers, createStore, applyMiddleware } from "redux";
import { usersReducer } from '../users-reducer/users-reducer';
import thunkMiddleware from 'redux-thunk'
import { AppReducerActionsType } from '../app-reducer/actions';

const rootReducer = combineReducers({
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

// Все типы экшнов всего приложения
export type AppActionsType = 
| AuthActionsType 
| ProfileActionsType
| UsersActionType
| AppReducerActionsType

