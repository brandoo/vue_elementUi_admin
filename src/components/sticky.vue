<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div class="sticky-box" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 80
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String
    },
    scrollParent: {
      type: String,
      default: 'content-view'
    }
  },
  data() {
    return {
      active: false,
      position: '',
      currentTop: '',
      width: undefined,
      height: undefined,
      child: null,
      stickyHeight: 0
    }
  },
  mounted() {
    this.height = this.$el.height
    document.getElementById(this.scrollParent).addEventListener('scroll', this.handleScroll)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    document.getElementById(this.scrollParent).removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
    },
    reset() {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    }
  }
}
</script>
<style lang="less" scoped>
  .sticky-box {
    padding: .8rem 0;
    background-color: #fff;
  }
</style>

