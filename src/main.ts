import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/index.scss'
import '@/assets/scss/global.scss'
import '@/assets/scss/elStyle.scss'
import 'highlight.js/scss/stackoverflow-light.scss'
import { pinia } from '@/stores'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faCheck,
    faXmark,
    faShirt,
    faBold,
    faCode,
    faRotateLeft,
    faRotateRight,
    faListUl,
    faListOl,
    faListCheck,
    faFillDrip,
    faItalic,
    faStrikethrough,
    faQuoteLeft,
    faA,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash, faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

import router from './router'

import { login } from '@/api/login'

library.add(
    faCheck,
    faXmark,
    faEye,
    faEyeSlash,
    faShirt,
    faUser,
    faThumbsUp,
    faBold,
    faCode,
    faRotateLeft,
    faRotateRight,
    faListUl,
    faListOl,
    faListCheck,
    faFillDrip,
    faItalic,
    faStrikethrough,
    faQuoteLeft,
    faA,
    faCaretDown
)

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

// 自动登录
async function tryAutoLogin() {
    const Authorization = localStorage.getItem('Authorization')
    if (Authorization) {
        const res = await login({}, { headers: { Authorization } })
        if (res.data.message === '成功') {
            console.log('自动登录成功')
            console.log(res.headers.authorization)
        }
    }
}

tryAutoLogin()
