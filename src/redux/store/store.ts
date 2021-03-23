import { profileReducer } from './../profile-reducer/profile-reducer';
import { combineReducers, createStore } from "redux";
import { usersReducer } from '../users-reducer/users-reducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    users: usersReducer
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store