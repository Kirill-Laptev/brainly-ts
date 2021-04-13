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

export type LoginizationResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId?: string
    }
}

export const authAPI = {
    getAuthData: () => {
        return instance.get<AuthDataResponseType>('/auth/me')
    },
    login: (email: string, password: string) => {
        return instance.post<LoginizationResponseType>('/auth/login', {email, password})
    },
    logout: () => {
        return instance.delete<LoginizationResponseType>('/auth/login')
    }
}