import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'babel-polyfill'
import registerCpts from './registerCpts'

Vue.use(Element)

Vue.config.productionTip = false

// 注册全局组件
registerCpts.forEach(item => {
  const { name, src } = item
  Vue.component(name, src)
})

// 注册全局过滤器

// 启用路由配置
store.dispatch('dynamicRouter')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
