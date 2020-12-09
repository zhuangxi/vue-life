import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    name: 'Index',
    redirect: 'Spend',
    component: Index,
    children: [
      {
        path: '/spend',
        name: 'Spend',
        redirect: 'spend/statistics',
        component: () => import('@/views/spend/Index'),
        children: [
          {
            path: 'statistics',
            name: 'Statistics',
            component: () => import('@/views/spend/Statistics')
          },
          {
            path: 'analysis',
            name: 'Analysis',
            component: () => import('@/views/spend/Analysis')
          }
        ]
      },
      {
        path: '/fund',
        name: 'Fund',
        redirect: 'fund/statistics',
        component: () => import('@/views/fund/Index'),
        children: [
          {
            path: 'statistics',
            name: 'Statistics',
            component: () => import('@/views/fund/Statistics')
          }
          // {
          //   path: 'analysis',
          //   name: 'Analysis',
          //   component: () => import('@/views/fund/Analysis')
          // }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
