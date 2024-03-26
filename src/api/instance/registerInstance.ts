import { useUserInfoStore } from '@/stores'
import { connect } from '@/websocket/chat'
import axios, { type AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        if (response.data.msg === '成功') {
            const { setAuth, setAvatar, setUserName, setThemeColor, setUserId } = useUserInfoStore()
            setAuth(response.headers.authorization)
            const { user_id, avatar, username, themeColor } = response.data.data
            setUserId(user_id)
            setAvatar(avatar)
            setUserName(username)
            setThemeColor(themeColor)
            connect()
        }
        return response
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default instance
