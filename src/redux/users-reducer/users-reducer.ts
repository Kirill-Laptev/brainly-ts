import { ACTIONS_TYPE_USERS, AllUsersActionType } from './actions';

export type UserType = {
    name: string
    id: number
    photos: {
    small: null | string
    large: null | string
    },
    status: null | string
    followed: boolean
    uniqueUrlName: null
}

export type UsersStateType = {
    users: Array<UserType>
    totalUsersCount: number
    countItems: number
    currentPage: number
}


const initialState: UsersStateType = {
    users: [],
    totalUsersCount: 0,
    countItems: 12,
    currentPage: 1
}

export const usersReducer = (state: UsersStateType = initialState, action: AllUsersActionType) => {
    switch(action.type){
        case ACTIONS_TYPE_USERS.SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case ACTIONS_TYPE_USERS.FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userID){
                        return {...user, followed: true}
                    } else{
                        return user
                    }
                })
            }   
            
        case ACTIONS_TYPE_USERS.UNFOLLOW: 
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userID){
                        return {...user, followed: false}
                    } else{
                        return user
                    }
                })
            }

        case ACTIONS_TYPE_USERS.SET_TOTAL_USERS_COUNT: 
            return {
                ...state,
                totalUsersCount: action.totalUsersCount / 10  // Это исправить, сделал меньше выводимых страниц с пользователями на странице
            }    

        case ACTIONS_TYPE_USERS.SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.currentPage
            }

        default:
            return state;
    }
}