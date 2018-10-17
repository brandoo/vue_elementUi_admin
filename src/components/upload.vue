<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      :action="config.uploadUrl"
      :on-success="onSuccess"
      :on-error="onError"
      multiple
      :on-exceed="handleExceed"
      :show-file-list="false">
      <el-button :size="option.btnSize" :type="option.btnTYpe">{{option.btnText}}</el-button>
    </el-upload>
  </div>
</template>

<script>
import config from '@/config'
export default {
  name: 'upload',
  data() {
    return {
      config: config
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          btnText: '点解上传',
          btnType: 'primary',
          btnSize: 'small'
        } 
      }
    }
  },
  methods: {
    onSuccess(response, file, fileList) {
      this.$emit('onSuccess', response, file, fileList)
    },
    onError(err, file, fileList) {
      this.$emit('onError', err, file, fileList)
    }
  }
}
</script>

<style>

</style>
