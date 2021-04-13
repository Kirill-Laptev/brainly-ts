import { instance } from './api-config'

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

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type FollowResponseType = {
    resultCode: number
    messages: Array<string>
    data: object
}

export const usersAPI = {
    getUsers: (pageCount: number, currentPage: number) => {
        return instance.get<UsersResponseType>(`/users?count=${pageCount}&page=${currentPage}`)
    },
    followUser: (userID: number) => {
        return instance.post<FollowResponseType>(`/follow/${userID}`)
    },
    unfollowUser: (userID: number) => {
        return instance.delete<FollowResponseType>(`/follow/${userID}`)
    }
}