import { defineStore } from 'pinia'
const authKey = 'Authorization'
export const useUserInfoStore = defineStore('authorization', {
    state: () => ({
        authorization: '',
        avatar: '',
        userName: '',
        themeColor: 'rgb(50, 202, 153)',
        userId: ''
    }),
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
        getThemeColor() {
            return this.themeColor
        },
        setThemeColor(themeColor: string) {
            this.themeColor = themeColor
        },
        getUserId() {
            return this.userId
        },
        setUserId(userId: string) {
            this.userId = userId
        },
        logout() {
            this.setAuth('')
            this.setAvatar('')
            this.setUserName('')
            this.setThemeColor('rgb(50, 202, 153)')
            this.setUserId('')
        }
    },
    getters: {
        //  判断是否登录
        isLogin(state): Boolean {
            return state.authorization ? true : false
        }
    }
})
