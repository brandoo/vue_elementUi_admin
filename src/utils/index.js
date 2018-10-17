// 存放项目公用工具或函数
const tools = {
  // 产生随机数，len：长度
  getUUID: (len) => {
    len = len || 6
    len = parseInt(len, 10)
    len = isNaN(len) ? 6 : len
    const seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
    const seedLen = seed.length - 1
    let uuid = ''
    while (len--) {
      uuid += seed[Math.round(Math.random() * seedLen)]
    }
    return uuid
  },
  // 深拷贝
  deepCopy: (data) => {
    if (!data) {
      return data
    }
    let sourceCopy = data instanceof Array ? [] : {}
    for (let item in data) {
      sourceCopy[item] = typeof data[item] === 'object' ? this.deepcopy(data[item]) : data[item]
    }
    return sourceCopy
  },
  // 清除当前所有的缓存
  clearStorage: (item) => {
    const _item = item || ''
    // 如果不传入参数值，默认删除所有缓存
    if (_item === '') {
      sessionStorage.clear()
      localStorage.clear()
    } else {
      sessionStorage.removeItem(_item)
      localStorage.removeItem(_item)
    }
  },
  // 左侧导航数据格式化, 从新组合路由地址，进行分类去重
  newRouter: (config, val, fullRouter) => {
    let _val = []
    if (config.dynamicRouter) {
      const localRoutes = JSON.parse(val)
      _val = this.addNewRouters(localRoutes, fullRouter)
    } else {
      _val = fullRouter[0].children
    }
    // 去重，获取组别数组
    const res = new Map()
    const _group = _val.filter((item, index) => {
      if (res.has(item.meta.group) && !item.meta.single) {
        return false
      } else {
        res.set(item.meta.group, 1)
        return true
      }
    })
    // 定义方法， 对组别数据进行重新赋值定义
    const __map = (array, fn) => {
      let results = []
      for (const value of array) { results.push(fn(value)) }
      return results
    }
    // 获取新组别数据
    let _newGroup = __map(_group, (item) => {
      if (item.meta.single) {
        return item
      } else {
        return ({
          group: item.meta.group,
          groupTitle: item.meta.groupTitle,
          children: []
        })
      }
    })
    // 分类，对组别数据进行添加子数据
    const _map = (array, brray) => {
      let results = []
      array.forEach((item, index) => {
        results.push(item)
        brray.forEach((_item, _index) => {
          if (item.group === _item.meta.group) {
            results[index].children.push(_item)
          }
        })
      })
      return results
    }
    let _endNav = _map(_newGroup, _val)
    return _endNav
  },
  // 动态加载路由
  addNewRouters: (authority = [], fullRouter) => {
    let newRouter = []
    const _fullRouter = fullRouter[0]
    newRouter.push({
      path: _fullRouter.path,
      name: _fullRouter.name,
      component: _fullRouter.component,
      children: []
    })
    authority.forEach((item, index) => {
      if (item.operations.length > 0) {
        item.operations.forEach(_item => {
          newRouter[0].children.push(
            (_fullRouter.children.filter(fullRouter => {
              return _item.id === fullRouter.id
            }))[0]
          )
        })
      } else {
        newRouter[0].children.push(
          (_fullRouter.children.filter(_item => {
            return _item.id === item.id
          })[0])
        )
      }
    })
    // console.log(newRouter)
    return newRouter
  }
}

export default tools
