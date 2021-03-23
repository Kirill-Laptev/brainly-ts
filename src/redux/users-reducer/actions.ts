import { UserType } from './users-reducer';

export enum ACTIONS_TYPE_USERS {
    FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET_USERS',
    SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
    SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
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

export type AllUsersActionType = FollowType | UnfollowType | SetUsersType | CurrentPageType | SetTotalUsersCountType


export const followAC = (userID: number) => {
    return {type: ACTIONS_TYPE_USERS.FOLLOW, userID}
}

export const unfollowAC = (userID: number) => {
    return {type: ACTIONS_TYPE_USERS.UNFOLLOW, userID}
}

export const setUsersAC = (users: Array<UserType>) => {
    return {type: ACTIONS_TYPE_USERS.SET_USERS, users}
}

export const setCurrentPageAC = (currentPage: number) => {
    return {type: ACTIONS_TYPE_USERS.SET_CURRENT_PAGE, currentPage}
}

export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {type: ACTIONS_TYPE_USERS.SET_TOTAL_USERS_COUNT, totalUsersCount}
}