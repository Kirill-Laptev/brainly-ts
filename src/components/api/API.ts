import { UserType } from './../../redux/users-reducer/users-reducer';
import axios from "axios"

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

const config = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
      "api-key": "1e60f3eb-a2f7-4f18-b8e9-f6ea4b15f04b"
    }
}

const instance = axios.create(config)

export const API = {
    getUsers: (pageCount: number, currentPage: number) => {
        return instance.get<UsersResponseType>(`/users?count=${pageCount}&page=${currentPage}`)
        .then((response) => response.data)
    }
}
