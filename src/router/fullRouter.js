export default [
  {
    path: '/',
    name: 'layout',
    component: (resolve) => require(['@/components/layout/layout'], resolve),
    children: [
      {
        path: 'test1',
        name: 'test1',
        meta: {
          title: '基本表格测试',
          group: '1',
          groupTitle: '页面测试',
          single: false
        },
        component: (resolve) => require(['@/views/test1'], resolve)
      },
      {
        path: 'test3',
        name: 'test3',
        meta: {
          title: '其他页面测试',
          group: '2',
          groupTitle: '页面测试',
          single: true
        },
        component: (resolve) => require(['@/views/test2'], resolve)
      }
    ]
  }
]
