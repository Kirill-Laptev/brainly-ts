import { instance } from './api-config'

export const profileAPI = {
    getUserProfile: (userID: string) => {
        return instance.get(`/profile/${userID}`)
    }
}