import ajax from './config'
import { Notification } from 'element-ui'

// 定义基础公共请求
class BaseAjax {
  // 暴露请求路径
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  // 基本的增、删、改、查
  async get (params = {}, url = '') {
    const data = await ajax.get(`${this.baseUrl}${url}`, params)
    return this.checkCode(data)
  }
  async post (params = {}, url = '') {
    const data = await ajax.post(`${this.baseUrl}${url}`, params)
    return this.checkCode(data)
  }
  async put (params = {}, url = '') {
    const data = await ajax.put(`${this.baseUrl}${url}`, params)
    return this.checkCode(data)
  }
  async delete (id, url = '') {
    const data = await ajax.delete(`${this.baseUrl}${url}/${id}`)
    return this.checkCode(data)
  }
  // 使用于自定义的接口
  async all (methods = 'get', url = '', params = {}) {
    switch (methods) {
      case 'get':
        return this.get(params, url)
      case 'post':
        return this.post(params, url)
      case 'put':
        return this.put(params, url)
      case 'delete':
        return this.delete(params, url)
      default:
        return -1
    }
  }

  // 个别独立公共接口
  async getById (id, url = '') {
    const data = await ajax.get(`${this.baseUrl}${url}/${id}`)
    return this.checkCode(data)
  }

  // 检验请求返回值，剔除code和msg等数据，直接返回data
  checkCode (data) {
    try {
      switch (data.errorCode) {
        case '0':
          return data.data
        case '-1':
          //  弹出全局错误提示
          Notification.error({
            title: '网络错误',
            message: data.errorMsg
          })
          return -1
      }
    } catch (error) {

    }
  }
}

export default BaseAjax
