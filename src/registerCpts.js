// 引入注册组件
import pageBox from './components/pageBox.vue'
import searchModel from './components/searchModel.vue'
import tableAndPage from './components/tableAndPage.vue'

export default [
  {
    name: 'pageBox', // 组件名
    src: pageBox, // 组件地址
    remark: '外壳' // 备注
  },
  {
    name: 'searchModel', // 组件名
    src: searchModel, // 组件地址
    remark: '搜索模块' // 备注
  },
  {
    name: 'tableAndPage', // 组件名
    src: tableAndPage, // 组件地址
    remark: '表格模块' // 备注
  }
]
