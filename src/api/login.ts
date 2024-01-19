import { type AxiosRequestConfig } from 'axios'
import loginInstance from './instance/loginInstance'
export async function login(data: any, config: AxiosRequestConfig = {}) {
    return await loginInstance.post('/login', data, config)
}
