import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import store from '@/store'
import tools from './../utils'

Vue.use(Router)
// 路由目录
const router = new Router({
  scrollBehavior: () => ({ y: 0 }), // 页面回到顶部
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/layout/login'], resolve)
    },
    {
      path: '/404',
      name: '404',
      component: (resolve) => require(['@/components/layout/404'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// 路由拦截器
// 跳转路由前，需要做什么，to：目的路由，from：当前路由，next：跳转路由
router.beforeEach((to, from, next) => {
  // 动态添加导航历史标签页
  store.dispatch('saveNavTabList', to)
  // 开启加载条
  NProgress.start()
  // 判断是否进入默认地址
  if (to.path === '/login') {
    // 清除浏览器缓存
    tools.clearStorage()
    // store.dispatch('restartNavTabList', '')
  }
  // 判断是否登陆
  if (!sessionStorage.getItem('token') && to.path !== '/login') {
    next({ path: '/login' })
    NProgress.done()
  } else {
    next()
  }
})
// 后置的路由拦截器
router.afterEach(transition => {
  NProgress.done()
})

export default router
