import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import productRoutes from './mudules/products'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      productRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  nprogress.start()

  if (to.meta.requiresAuth && !store.state.user) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

export default router
