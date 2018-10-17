// 开发环境
const development = {
  baseUrl: 'http://localhost:3000',
  whiteList: [],
  dynamicRouter: false,
  uploadUrl: ''
}

// 生产环境
const product = {
  baseUrl: 'http://localhost:3000',
  whiteList: [''],
  dynamicRouter: true,
  uploadUrl: ''
}

export default process.env.NODE_ENV === 'development' ? development : product
