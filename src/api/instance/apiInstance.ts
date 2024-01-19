import axios, { type AxiosInstance } from 'axios'
import { useUserInfoStore } from '@/stores'

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        const store = useUserInfoStore()
        config.headers.Authorization = store.authorization
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance
