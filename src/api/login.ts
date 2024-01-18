import loginInstance from './instance/loginInstance'
export async function login(data: any, config: {} = {}) {
    return await loginInstance.post('/login', data, config)
}
