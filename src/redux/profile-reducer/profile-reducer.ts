import { v1 } from "uuid"
import { AllProfileActionsType, ACTIONS_TYPE } from "./actions"

type MessagesType = {
    id: string
    author: string
    message: string
    photo: string
    time: string
}

export type ProfileStateType = {
    posts: Array<MessagesType>
    newPostText: string
}

const initialState: ProfileStateType = {
    posts: [
        {id: v1(), author: 'Svetlana Belikova', message: 'Can you help me with TS ?', time: '4 hours ago', photo: 'https://i.ibb.co/wKHwqxZ/woman-student.png'},
        {id: v1(), author: 'Kirill Laptev', message: 'Hi, guys! Today i can support 2-3 people in Zoom. You can answer your question, and i will do code-review. Just send PM to me.', time: '10 hours ago', photo: 'https://i.ibb.co/Cv7tZC8/man-student.png'}
    ],
    newPostText: ''
}

export const profileReducer = (state: ProfileStateType = initialState, action: AllProfileActionsType): ProfileStateType => {
    switch(action.type){

        case ACTIONS_TYPE.CHANGE_INPUT: {
            return {
                ...state,
                newPostText: action.payload.inputValue
            }
        }
        case ACTIONS_TYPE.ADD_POST: {
            return {
                ...state,
                posts: [{id: v1(), author: 'Kirill Laptev', message: state.newPostText, time: '1 min ago', photo: 'https://i.ibb.co/Cv7tZC8/man-student.png'}, ...state.posts],
                newPostText: ''
            }

        }
            
        default:
            return state
    }
}