import { instance } from './api-config'

export type UserProfileType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
    large: string
    }
}

export const profileAPI = {
    getUserProfile: (userID: string) => {
        return instance.get<UserProfileType>(`/profile/${userID}`)
    }
}