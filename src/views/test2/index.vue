<template>
  <div class="test2">
    <!-- 搜索模块 -->
    <search-model :config="searchConf" :data="searchForm">
      <template slot="btn">
        <el-button type="primary" size="small" @click="testOnclick">测试</el-button>
      </template>
    </search-model>
    <!-- 表格 -->
    <table-and-page :option="option" :loading="false" :data="data" @changePage="changePage">
      <template slot-scope="scope" slot="sex">
        <el-button type="primary" size="mini">{{scope.row.sex === 1 ? '男' : '女'}}</el-button>
      </template>
      <template slot-scope="scope" slot="ctrl">
        <el-button type="primary" size="mini">编辑</el-button>
      </template>
    </table-and-page>
  </div>
</template>

<script>
import userAip from './../../api/index'
import BaseAjax from './../../api/index';
export default {
  data() {
    return {
      searchConf:[
        {
          type: 'input',
          value: '',
          label: '名称',
          key: 'name'
        },
        {
          type: 'date',
          value: '',
          label: '注册时间',
          key: 'registerTime',
          valueFormat: 'yyyy-MM-dd'
        },
        {
          type: 'select',
          value: '',
          label: '性别',
          key: 'sex',
          list: [
            {
              label: '男',
              value: 1
            }
          ]
        }
      ],
      searchForm: {},
      columns: [
        { 
          label: '名称',
          key: 'name'
        },
        {
          label: '性别',
          key: 'sex',
          slot: true
        }
      ],
      data: [
        {
          name: '1',
          sex: 1
        },
        {
          name: '2',
          sex: 2
        }
      ],
      option: {
        // 是否使用多选
        select: true,
        // 多选回调的方法
        selectChange: val => {},
        // 判断该数据是否允许选择
        selectable: (row, index) => row.name === '1' ,
        // 配置表格选项
        columns: [
          { 
            label: '名称',
            key: 'name'
          },
          {
            label: '性别',
            key: 'sex',
            slot: true
          }
        ],
        // 分页配置
        pageConfig: {
          pageNum: 1,
          pageSize: 10,
          total: 100
        }
      }
    }
  },
  methods: {
    // 页码改变调用的事件
    changePage(val) {
      const params = {
        ...this.searchForm,
        pageSize: val
      }
      const data = BaseAjax.query(params).then(res => {

      })
    },
    // changePage() {
    //   alert(JSON.stringify(this.searchForm))
    // }
  }
}
</script>

<style>

</style>
