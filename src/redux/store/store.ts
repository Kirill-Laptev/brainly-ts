import { profileReducer } from './../profile-reducer/profile-reducer';
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    profile: profileReducer
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>