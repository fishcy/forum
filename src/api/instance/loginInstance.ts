import axios, { type AxiosInstance } from 'axios'
import { useUserInfoStore } from '@/stores'

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (response.data.msg === '成功') {
            const { setAuth, setAvatar, setUserName, setThemeColor } = useUserInfoStore()
            setAuth(response.headers.authorization)
            const { avatar, userName, themeColor } = response.data.data
            setAvatar(avatar)
            setUserName(userName)
            setThemeColor(themeColor)
        }
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance
