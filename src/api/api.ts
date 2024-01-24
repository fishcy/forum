import { type AxiosRequestConfig } from 'axios'
import apiInstance from './instance/apiInstance'

export async function postThemeColor(data: any, config: AxiosRequestConfig = {}) {
    return await apiInstance.post('/themeColor', data, config)
}

export async function uploadImage(data: any, config: AxiosRequestConfig = {}) {
    config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' }
    return await apiInstance.post('/upload', data, config)
}
