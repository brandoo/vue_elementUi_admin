import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import tools from './utils'
import fullRouter from './router/fullRouter'
import config from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tab历史菜单列表
    navTabList: sessionStorage.getItem('navTabList') ? JSON.parse(sessionStorage.getItem('navTabList')) : [{'title': '首页', 'path': '/'}],
    // 当前页面菜单地址
    activeNav: sessionStorage.getItem('activeNav') || ''
  },
  mutations: {
    // 保存tab历史菜单
    SAVNAVTABLIST (state, value) {
      // 不保存登陆页
      if (value.path === '/login' || value.path === '/404') {
        return
      }
      // 保存tab历史菜单
      state.navTabList.push({'title': value.meta.title, 'path': value.path, 'active': false})
      // 遍历去重
      const res = new Map()
      state.navTabList = state.navTabList.filter((item, index) => {
        if (item.path !== value.path) {
          item.active = false
        } else {
          item.active = true
          // 保存当前活跃的菜单地址
          state.activeNav = item.path
        }
        return !res.has(item.path) && res.set(item.path, 1)
      })
      sessionStorage.setItem('navTabList', JSON.stringify(state.navTabList))
    },
    // 删除tab历史菜单
    DELETENAVTABLIST (state, value) {
      // 判断是否删除最后一个且正在当前页面的tab菜单页
      if (value === (state.navTabList.length - 1) && state.navTabList[state.navTabList.length - 1].active) {
        // 遍历设置新的菜单的正在显示页面
        state.navTabList = state.navTabList.filter((item, index, array) => {
          if (index === (array.length - 2)) {
            item.active = true
            // 保存当前活跃的菜单地址
            state.activeNav = item.path
          } else {
            item.active = false
          }
          return true
        })
        router.push(state.navTabList[state.navTabList.length - 2].path)
      }
      // 删除tab菜单页
      state.navTabList.splice(value, 1)
      sessionStorage.setItem('navTabList', JSON.stringify(state.navTabList))
    },
    // 保存当前页面地址
    SAVEACTIVENAV (state, value) {
      state.activeNav = value
      sessionStorage.setItem('activeNav', state.activeNav)
    },
    // 重置历史菜单
    RESTARTNAVTABLIST (state, value) {
      state.navTabList = [{'title': '首页', 'path': '/'}]
      router.push('/')
    },
    // 启用动态路由
    DYNAMICROUTER (state, value) {
      if (config.dynamicRouter) {
        let localRoutes = sessionStorage.getItem('routes')
        if (localRoutes) {
          const newRouter = tools.addNewRouters(JSON.parse(localRoutes))
          router.addRoutes(newRouter)
        }
      } else {
        router.addRoutes(fullRouter)
      }
    }
  },
  // 暴露外部调用的方法
  actions: {
    saveNavTabList (state, value) {
      state.commit('SAVNAVTABLIST', value)
    },
    deleteNavTabList (state, value) {
      state.commit('DELETENAVTABLIST', value)
    },
    saveActiveNav (state, value) {
      state.commit('SAVEACTIVENAV', value)
    },
    restartNavTabList (state, value) {
      state.commit('RESTARTNAVTABLIST', value)
    },
    dynamicRouter (state, value) {
      state.commit('DYNAMICROUTER', value)
    }
  },
  getters: {
    // 暴露navTabList
    navTabList: state => {
      return state.navTabList
    },
    // 暴露activeNav
    activeNav: state => {
      return state.activeNav
    }
  }
})
