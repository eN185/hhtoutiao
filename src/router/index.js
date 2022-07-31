import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 一级路由渲染再App.vur里面
/* <router-view /> */
const routes = [
  {
    path: '/login',
    // 路由懒加载 优化首屏加载速度
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    // 如果子路由的 path 没有/ 那么会把父级的path和子级的 path 拼接
    // 如果子路由的 path 有/ 就不会拼接
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/question',
        component: () => import('@/views/Question')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
