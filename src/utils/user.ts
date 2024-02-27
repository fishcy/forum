import { login } from '@/api'
import { type Router } from 'vue-router'

export const autoLogin = () => {
    let _resolve: any, _reject: any
    const promise = new Promise((resolve, reject) => {
        _resolve = resolve
        _reject = reject
    })
    const Authorization = localStorage.getItem('Authorization')
    if (Authorization) {
        login(
            {},
            {
                headers: {
                    Authorization
                }
            }
        )
            .then((res) => {
                if (res.data.msg === '成功') {
                    _resolve(res.data)
                } else {
                    _reject(res.data)
                }
            })
            .catch((err) => {
                _reject(err)
            })
    } else {
        _reject()
    }

    return promise
}

export const handleLoginSuccess = (router: Router) => {
    const redirectPath = sessionStorage.getItem('REDIRECT_PATH')
    if (redirectPath) {
        router.push(redirectPath)
        sessionStorage.removeItem('REDIRECT_PATH')
    } else {
        router.push('/')
    }
}
