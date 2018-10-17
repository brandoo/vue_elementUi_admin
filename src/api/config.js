// 引入依赖包
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import config from '@/config'
import { Message } from 'element-ui'

// 创建axios实例
axios.create({
  baseURL: config.baseURL, // 因为我本地做了反向代理
  timeout: 10000
})

// 添加接口请求拦截器
axios.interceptors.request.use(
  config => {
    // 放置发送请求前，需要修改的内容
    if (config.toJson) {
      config.data = qs.stringify(config.data)
    }
    // 验证时候有token，有则加入请求头部
    // if (sessionStorage.getItem('token')) { config.headers.Authorization = sessionStorage.getItem('token') };
    // 使用form表单提交
    if (config.toForm) {
      // config.responseType = 'blob'
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      const params = new FormData()
      for (let key of Object.keys(config.data)) {
        params.append(key, config.data[key])
      }
      config.data = params
    }
    // 返回请求数据
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加接口响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    switch (response.data.code) {
      case 401:
        router.push('/')
        break
      default:
        break
    }
    return response
  },
  error => {
    // 对响应错误做点什么
    switch (error.response.status) {
      case 401:
        router.push('/login')
        break
      case 500:
        Message({
          message: '服务器异常',
          type: 'warning'
        })
        // router.push('/login')
        break
    }
    return Promise.reject(error)
  }
)
// 定义请求方法
export default {
  get: (url = '', data = {}, toast = {}) => {
    return axios({
      url: `${config.baseUrl}${url}`,
      method: 'get',
      params: data,
      toast,
      withCredentials: false
    }).then(response => response.data)
  },
  post: (url = '', data = {}, toast = {}, toJson = false, toForm = false) => {
    return axios({
      url: `${config.baseUrl}${url}`,
      method: 'post',
      data: data,
      toast,
      toJson,
      toForm,
      withCredentials: false
    }).then(response => response.data)
  },
  put: (url = '', data = {}, toast = {}, toJson = false) => {
    return axios({
      url: `${config.baseUrl}${url}`,
      method: 'put',
      data: data,
      toast,
      toJson,
      withCredentials: false
    }).then(response => response.data)
  },
  delete: (url = '', data = {}, toast = {}, toJson = false) => {
    return axios({
      url: `${config.baseUrl}${url}`,
      method: 'delete',
      data: data || {},
      toast,
      toJson,
      withCredentials: false
    }).then(response => response.data)
  }
}
