import { createRouter, createWebHistory } from 'vue-router'
import { useUserInfoStore } from '@/stores'
import 'vue-router'

declare module 'vue-router' {
    interface RouterMeta {
        requiresAuth: boolean
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/HomePage.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/create',
            component: () => import('@/views/createPage.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

// 导航路由
router.beforeEach((to) => {
    const user = useUserInfoStore()
    if (to.meta.requiresAuth && !user.isLogin) {
        return '/'
    }
})

export default router
