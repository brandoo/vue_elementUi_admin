<template>
    <page-box>
      <el-form :model="data" class="demo-form-inline">
        <el-row>
          <el-col v-for="(item, index) in config" :key="index" :span="6">
            <el-form-item :label="item.label" :prop="item.label" label-width="120px">
              <template v-if="item.type === 'input'">
                <el-input v-model="data[item.key]" size="small" :placeholder="`请输入${item.label}`"></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="data[item.key]" size="small" :placeholder="`请选择${item.label}`" style="width: 100%">
                  <el-option
                    v-for="item in item.list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'select-search'">
                <el-select
                  v-model="data[item.key]"
                  size="small"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="item.method"
                  :loading="item.loading"
                  style="width: 100%">
                  <el-option
                    v-for="item in item.list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'date'">
                <el-date-picker
                  v-model="data[item.key]"
                  type="date"
                  size="small"
                  :value-format="item.valueFormat"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <template v-if="item.type === 'datetime'">
                <el-date-picker
                  v-model="data[item.key]"
                  type="datetime"
                  size="small"
                  :value-format="item.valueFormat"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn">
        <slot name="btn"></slot>
      </div>
    </page-box>
</template>

<script>
export default {
  name: 'searchModel',
  data() {
    return {
    }
  },
  props: {
    config: {
      type: Array,
      default: []
    },
    data: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="less" scope>
  .btn {
    margin-top: .5rem;
    text-align: right;
  }
  .el-form-item {
    margin-bottom: 10px
  }
</style>
