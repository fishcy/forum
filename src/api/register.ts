import registerInstance from './instance/registerInstance'

export async function register(data: any) {
    return await registerInstance.post('/register', data)
}
