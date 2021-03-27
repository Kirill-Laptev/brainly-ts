import axios from "axios"

const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
      "api-key": "1e60f3eb-a2f7-4f18-b8e9-f6ea4b15f04b"
    }
}

export const instance = axios.create(settings)


