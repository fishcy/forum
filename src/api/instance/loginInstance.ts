import axios, { type AxiosInstance } from 'axios'
import { useUserInfoStore } from '@/stores'

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        console.log(config)
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (response.data.message === '成功') {
            const { setAuth, setAvatar, setUserName } = useUserInfoStore()
            console.log(response.data)
            console.log(response.headers.authorization)
            setAuth(response.headers.authorization)
            const { avatar, userName } = response.data.data
            setAvatar(avatar)
            setUserName(userName)
        }
        return response
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default instance
