import { defineStore } from 'pinia'
const authKey = 'Authorization'
export const useUserInfoStore = defineStore('authorization', {
    state: () => ({ authorization: '', avatar: '', userName: '' }),
    actions: {
        setAuth(auth: string) {
            this.authorization = auth
            auth ? localStorage.setItem(authKey, auth) : localStorage.removeItem(authKey)
        },
        getAuth() {
            return this.authorization
        },
        setAvatar(avatar: string) {
            this.avatar = avatar
        },
        getAvatar() {
            return this.avatar
        },
        setUserName(userName: string) {
            this.userName = userName
        },
        getUserName() {
            return this.userName
        },
        logout() {
            this.setAuth('')
            this.setAvatar('')
            this.setUserName('')
        }
    },
    getters: {
        //  判断是否登录
        isLogin(state): Boolean {
            return state.authorization ? true : false
        }
    }
})
