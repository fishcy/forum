import { createRouter, createWebHistory } from 'vue-router'
import { useUserInfoStore } from '@/stores'

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
            component: () => import('@/views/CreatePage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/post/:article_id',
            component: () => import('@/views/ArticleDetailPage.vue'),
            meta: { requiresAuth: true },
            props: true
        },
        {
            path: '/user/:user_id',
            component: () => import('@/views/UserHomePage.vue'),
            meta: { requiresAuth: true },
            props: true,
            children: [
                {
                    path: '',
                    redirect: (to) => {
                        return `/user/${to.params.user_id}/dynamic`
                    }
                },
                {
                    path: 'dynamic',
                    component: () => import('@/views/userHome/UserDynamic.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'posts',
                    component: () => import('@/views/userHome/UserPosts.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'collections',
                    component: () => import('@/views/userHome/UserCollections.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'tags',
                    component: () => import('@/views/userHome/UserTags.vue'),
                    meta: { requiresAuth: true }
                }
            ]
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
