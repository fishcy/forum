import type { AxiosRequestConfig } from 'axios'
import registerInstance from './instance/registerInstance'

export async function register(data: any, config: AxiosRequestConfig = {}) {
    config.withCredentials = true
    return await registerInstance.post('/register', data, config)
}
