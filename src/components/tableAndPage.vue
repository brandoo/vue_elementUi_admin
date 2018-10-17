<template>
    <page-box>
      <el-table :data="data" border style="width: 100%" size="small" v-loading="loading" @selection-change="option.selectChange">
        <el-table-column v-if="option.select" type="selection" width="50" align="center" :selectable="option.selectable">
        </el-table-column>
        <el-table-column v-if="option.sequence" type="index" width="50" align="center">
        </el-table-column>
        <el-table-column v-for="(item, index) in option.columns" :key="index" :label="item.label" :width="item.width" align="center">
          <template slot-scope="scope">
            <span v-if="!item.slot">{{scope.row[item.key]}}</span>
            <slot v-else v-bind:row="scope.row" :name="item.key"></slot>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <slot v-bind:row="scope.row" name="ctrl"></slot>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination background :current-page.sync="option.pageNum" layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :total="option.total" :page-size="option.pageSize"></el-pagination>
      </div>
    </page-box>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: this.pageNum
    }
  },
  props: {
    // columns: {
    //   type: Array,
    //   default: []
    // },
    data: {
      type: Array,
      default: []
    },
    // pageNum: {
    //   type: Number,
    //   default: 1
    // },
    // total: {
    //   type: Number,
    //   default: 1
    // },
    // pageSize: {
    //   type: Number,
    //   default: 10
    // },
    loading: {
      type: Boolean,
      default: false
    },
    // select: {
    //   type: Boolean,
    //   default: false
    // },
    // index: {
    //   type: Boolean,
    //   default: false
    // },
    // selectable: {
    //   type: Function,
    //   default: () => {
    //     return true
    //   }
    // },
    option: {
      type: Object,
      default: () => {
        return {
          sequence: true,
          select: true,
          selectable: (row, index) => true ,
          columns: [],
          pageConfig: {
            pageNum: 1,
            pageSize: 10,
            total: 1
          }
        } 
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('changePage', val)
    },
    // selectChange(selection) {
    //   this.$emit('selectChange', selection)
    // }
  }
}
</script>

<style lang="less" scoped>
  .page {
    margin-top: 1rem;
    text-align: right;
  }
</style>
