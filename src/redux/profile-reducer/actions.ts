import { profileAPI, UserProfileType } from './../../api/profile-api';
import { AppStateType, AppActionsType } from './../store/store';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

export enum ACTIONS_TYPE_PROFILE {
    CHANGE_INPUT = 'profile/CHANGE_INPUT',
    ADD_POST = 'profile/ADD_POST',
    SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
}

export type ChangeInputType = {
    type: ACTIONS_TYPE_PROFILE.CHANGE_INPUT
    payload: {
        inputValue: string
    }
}

export type AddPostType = {
    type: ACTIONS_TYPE_PROFILE.ADD_POST
    payload: {
        newPostText: string
    }
}

export type SetUserProfileType = {
    type: ACTIONS_TYPE_PROFILE.SET_USER_PROFILE
    payload: {
        userProfile: UserProfileType
    }
}

export type ProfileActionsType = 
| ChangeInputType 
| AddPostType 
| SetUserProfileType

// Actions
export const changeInputAC = (inputValue: string): ChangeInputType => {
    return {type: ACTIONS_TYPE_PROFILE.CHANGE_INPUT, payload: {inputValue}}
}

export const addPostAC = (newPostText: string): AddPostType => {
    return {type: ACTIONS_TYPE_PROFILE.ADD_POST, payload: {newPostText}}
}

export const setUserProfileAC = (userProfile: UserProfileType): SetUserProfileType => {
    return {type: ACTIONS_TYPE_PROFILE.SET_USER_PROFILE, payload: {userProfile}}
}

// Thunk's
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>

export const getUserProfileDataTC = (userID: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        profileAPI.getUserProfile(userID)
        .then(({data}) => dispatch(setUserProfileAC(data)))
    }
}
