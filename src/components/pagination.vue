<template>
  <div class="pagination">
    <el-pagination
      @current-change="pageChange"
      :current-page.sync="pageNumber"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      pageNumber: this.pageNum
    }
  },
  props: {
    pageSize: {
      default: 10,
      type: Number
    },
    total: {
      default: 1,
      type: Number
    },
    pageNum: {
      default: 1,
      type: Number
    }
  },
  methods: {
    pageChange (val) {
      this.$emit('pageChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    padding: 1rem 0;
    text-align: right;
  }
</style>
