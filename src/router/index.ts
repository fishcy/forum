import { createRouter, createWebHistory } from 'vue-router'
import { useUserInfoStore, useCommunicationStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { autoLogin } from '@/utils/user'

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
            meta: { requiresAuth: false }
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
                    meta: { requiresAuth: true },
                    props: true
                },
                {
                    path: 'posts',
                    component: () => import('@/views/userHome/UserPosts.vue'),
                    meta: { requiresAuth: true },
                    props: true
                },
                {
                    path: 'collections',
                    component: () => import('@/views/userHome/UserCollections.vue'),
                    meta: { requiresAuth: true },
                    props: true
                },
                {
                    path: 'tags',
                    component: () => import('@/views/userHome/UserTags.vue'),
                    meta: { requiresAuth: true },
                    props: true
                }
            ]
        },
        {
            path: '/published',
            component: () => import('@/views/PostPublished.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/privateChat',
            component: () => import('@/views/PrivateChatPage.vue'),
            meta: { requiresAuth: true },
            props: true
        }
    ]
})

// 导航路由
router.beforeEach(async (to) => {
    const user = useUserInfoStore()
    // 每次进入路由前，都判断一下是否登录了，没有登录则登录
    if (!user.isLogin) {
        try {
            await autoLogin()
        } catch (err) {
            /* empty */
        }
    }
    // 如果需要权限且没有登录，则弹出登录页面
    if (to.meta.requiresAuth && !user.isLogin) {
        sessionStorage.setItem('REDIRECT_PATH', to.fullPath)
        const { loginOrRegisterVisible } = storeToRefs(useCommunicationStore())
        loginOrRegisterVisible.value = true
        return '/'
    }
})

export default router
