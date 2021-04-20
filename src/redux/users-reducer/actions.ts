import { AppStateType, AppActionsType } from './../store/store';
import { usersAPI, UserType } from './../../api/users-api';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export enum ACTIONS_TYPE_USERS {
    FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET_USERS',
    SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
    SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',
    TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS'
}

type FollowType = {
    type: ACTIONS_TYPE_USERS.FOLLOW
    userID: number
}

type UnfollowType = {
    type: ACTIONS_TYPE_USERS.UNFOLLOW
    userID: number
}

type SetUsersType = {
    type: ACTIONS_TYPE_USERS.SET_USERS
    users: Array<UserType>
}

type SetTotalUsersCountType = {
    type: ACTIONS_TYPE_USERS.SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}

type CurrentPageType = {
    type: ACTIONS_TYPE_USERS.SET_CURRENT_PAGE
    currentPage: number
}

type ToggleFollowingProgressType = {
    type: ACTIONS_TYPE_USERS.TOGGLE_FOLLOWING_PROGRESS 
    userID: number
    isLoading: boolean
}

export type UsersActionType = 
| FollowType 
| UnfollowType 
| SetUsersType 
| CurrentPageType 
| SetTotalUsersCountType 
| ToggleFollowingProgressType

// Actions
export const followAC = (userID: number): FollowType => {
    return {type: ACTIONS_TYPE_USERS.FOLLOW, userID}
}

export const unfollowAC = (userID: number): UnfollowType => {
    return {type: ACTIONS_TYPE_USERS.UNFOLLOW, userID}
}

export const setUsersAC = (users: Array<UserType>): SetUsersType => {
    return {type: ACTIONS_TYPE_USERS.SET_USERS, users}
}

export const setCurrentPageAC = (currentPage: number): CurrentPageType => {
    return {type: ACTIONS_TYPE_USERS.SET_CURRENT_PAGE, currentPage}
}

export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountType => {
    return {type: ACTIONS_TYPE_USERS.SET_TOTAL_USERS_COUNT, totalUsersCount}
}

export const toggleFollowingProgressAC = (isLoading: boolean, userID: number): ToggleFollowingProgressType => {
    return {type: ACTIONS_TYPE_USERS.TOGGLE_FOLLOWING_PROGRESS, isLoading, userID}
}



// Thunk's

// ThunkAction
// 1) Описываем что возвращает thunk
// 2) state всего приложения
// 3) экстра-аргументы
// 4) все action всего App

// ThunkDispatch
// 1) state всего приложения
// 2) экстра-аргументы
// 3) все action всего App



type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>

export const getUsersTC = (countItems: number, currentPage: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>, getState: () => AppStateType) => {
        usersAPI.getUsers(countItems, currentPage)
        .then(({data}) => {
            dispatch(setUsersAC(data.items))
            dispatch(setTotalUsersCountAC(data.totalCount))
        })
    }
}

export const followTC = (userID: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        dispatch(toggleFollowingProgressAC(true, userID))
        usersAPI.followUser(userID)
        .then(({data}) => {
            debugger
            if(data.resultCode === 0){
                dispatch(followAC(userID))
            }
            dispatch(toggleFollowingProgressAC(false, userID))
        })
    }
}

export const unfollowTC = (userID: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        dispatch(toggleFollowingProgressAC(true, userID))
        usersAPI.unfollowUser(userID)
        .then(({data}) => {
            if(data.resultCode === 0){
                dispatch(unfollowAC(userID))
            }
            dispatch(toggleFollowingProgressAC(false, userID))
        })
    }
} 

export const onPageChangedTC = (countItems: number, page: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>) => {
        usersAPI.getUsers(countItems, page)
        .then(({data}) => dispatch(setUsersAC(data.items)))
        .finally(() => dispatch(setCurrentPageAC(page)))
    }
}