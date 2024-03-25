import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/index.scss'
import '@/assets/scss/global.scss'
import '@/assets/scss/elStyle.scss'
import '@/assets/scss/tiptap.scss'
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
    faCaretDown,
    faLink,
    faEllipsis,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import {
    faEye,
    faEyeSlash,
    faUser,
    faThumbsUp,
    faImage,
    faCommentDots,
    faFaceSmile,
    faEnvelope
} from '@fortawesome/free-regular-svg-icons'

import router from './router'

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
    faCaretDown,
    faImage,
    faLink,
    faCommentDots,
    faEllipsis,
    faFaceSmile,
    faEnvelope,
    faPen,
    faTrash
)

import InfiniteScrollUp from './directives/infiniteScroll'

const app = createApp(App)

app.directive('infinite-scroll-up', InfiniteScrollUp)
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
