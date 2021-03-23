export enum ACTIONS_TYPE_PROFILE {
    CHANGE_INPUT = 'profile/CHANGE_INPUT',
    ADD_POST = 'profile/ADD_POST'
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

export type AllProfileActionsType = ChangeInputType | AddPostType


export const changeInputAC = (inputValue: string) => {
    return {type: ACTIONS_TYPE_PROFILE.CHANGE_INPUT, payload: {inputValue}}
}

export const addPostAC = (): AddPostType => {
    return {type: ACTIONS_TYPE_PROFILE.ADD_POST}
}


