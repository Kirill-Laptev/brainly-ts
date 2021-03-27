import { UserProfileType } from './profile-reducer';
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
}

export type SetUserProfileType = {
    type: ACTIONS_TYPE_PROFILE.SET_USER_PROFILE
    payload: {
        userProfile: UserProfileType
    }
}

export type AllProfileActionsType = ChangeInputType | AddPostType | SetUserProfileType


export const changeInputAC = (inputValue: string) => {
    return {type: ACTIONS_TYPE_PROFILE.CHANGE_INPUT, payload: {inputValue}}
}

export const addPostAC = (): AddPostType => {
    return {type: ACTIONS_TYPE_PROFILE.ADD_POST}
}

export const setUserProfileAC = (userProfile: UserProfileType) => {
    return {type: ACTIONS_TYPE_PROFILE.SET_USER_PROFILE, payload: {userProfile}}
}


