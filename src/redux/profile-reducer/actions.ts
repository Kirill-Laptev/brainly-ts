export enum ACTIONS_TYPE {
    CHANGE_INPUT = 'Profile/CHANGE_INPUT',
    ADD_POST = 'Profile/ADD_POST'
}

export type ChangeInputType = {
    type: ACTIONS_TYPE.CHANGE_INPUT
    payload: {
        inputValue: string
    }
}

export type AddPostType = {
    type: ACTIONS_TYPE.ADD_POST
}


export type AllProfileActionsType = ChangeInputType | AddPostType

export const changeInputAC = (inputValue: string) => {
    return {type: ACTIONS_TYPE.CHANGE_INPUT, payload: {inputValue}}
}

export const addPostAC = (): AddPostType => {
    return {type: ACTIONS_TYPE.ADD_POST}
}


