<template>
  <div class="page-header">
    <div class="condition">
      <slot name="condition"></slot>
    </div>
    <slot></slot>
    <div class="f-right">
      <slot name="right-float"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .page-header {
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e6e6e6;
    > .right {
      text-align: right;
    }
    > .f-right {
      float: right;
      margin-right: .5rem;
    }
    > .condition {
      display: inline-block;
      margin-right: 5px;
      > span {
        padding: 0 10px;
        font-size: .9rem;
      }
    }
  }
</style>
