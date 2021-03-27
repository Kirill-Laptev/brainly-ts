import { UserType } from '../redux/users-reducer/users-reducer';
import { instance } from './api-config'

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

export const usersAPI = {
    getUsers: (pageCount: number, currentPage: number) => {
        return instance.get<UsersResponseType>(`/users?count=${pageCount}&page=${currentPage}`)
    }
}