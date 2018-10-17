import BaseAjax from '../index.js'

class User extends BaseAjax {
  constructor (baseUrl) {
    super(baseUrl)
    // 配置该模块的跟路径
    this.baseUrl = '/user'
  }
  // 定制化的请求方法
  async changeStatus (id, status) {
    const data = this.get(`/${id}/${status}`)
    return data
  }
  async login (params) {
    const data = this.post(`/login`)
    return data
  }
}

export default new User()
