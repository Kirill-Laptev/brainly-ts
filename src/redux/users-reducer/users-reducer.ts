import { UserType } from './../../api/users-api';
import { ACTIONS_TYPE_USERS, UsersActionType } from './actions';

export type UsersStateType = {
    users: Array<UserType>
    totalUsersCount: number
    countItems: number
    currentPage: number
    followingInProgress: Array<number>
}

const initialState: UsersStateType = {
    users: [],
    totalUsersCount: 0,
    countItems: 12,
    currentPage: 1,
    followingInProgress: [],
}

export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType) => {
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

        case ACTIONS_TYPE_USERS.TOGGLE_FOLLOWING_PROGRESS: 
            return {
                ...state,
                followingInProgress: action.isLoading
                ? [...state.followingInProgress, action.userID]
                : [...state.followingInProgress.filter((id) => id !== action.userID)]
            }    

        default:
            return state;
    }
}
