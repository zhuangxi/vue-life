import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from './utils/axios'
import { getToken } from './utils/cookie'

Vue.use(ElementUI)

Vue.prototype.$http = axios

Vue.config.productionTip = false

// 路由拦截器
// const whiteList = ['Login'] // 白名单
// router.beforeEach(async (to, from, next) => {
//   if (whiteList.indexOf(to.name) == -1 && !getToken()) {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
