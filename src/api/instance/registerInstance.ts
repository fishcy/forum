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
        return response
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default instance
