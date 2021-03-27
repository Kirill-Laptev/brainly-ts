import { instance } from './api-config'

export type AuthDataType = {
    id: string 
    email: string 
    login: string 
}

export type AuthDataResponseType = {
    data: AuthDataType
    resultCode: number
    messages: Array<string>
}

export const authAPI = {
    getAuthData: () => {
        return instance.get<AuthDataResponseType>('/auth/me')
    }
}