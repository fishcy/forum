import { type AxiosRequestConfig } from 'axios'
import apiInstance from './instance/apiInstance'

export async function postThemeColor(data: any, config: AxiosRequestConfig = {}) {
    return await apiInstance.post('/themeColor', data, config)
}
