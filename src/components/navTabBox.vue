<template>
  <div :class="{'nav-tab-box': true, 'nav-tab-box-show': navShow}">
    <scroll-pane>
      <ul class="tags-list">
        <li class="tag-item" v-for="(item, index) in navTabList" :key="index" :class="{'is-active': item.active}" @click="turnRouter(item.path)">
          <span class="icon-yuan tag-item-icon"></span>
          <span class="tag-text">{{item.title}}</span>
          <i class="el-icon-close tag-close" @click.stop="deleteNavTabList(index)" v-if="index !== 0"></i>
        </li>
      </ul>
    </scroll-pane>
    <el-dropdown class="tags-menu pull-right">
        <el-button type="primary"
                   size="mini">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="restartNavTabList('')">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import scrollPane from './scrollPane.vue'
  export default {
    data() {
      return {
        // active: 0
      }
    },
    props: {
      navShow: {
        defalut: true,
        type: Boolean
      },
      // navTabList: {
      //   defalut: [],
      //   type: Array
      // }
    },
    methods: {
      turnRouter (path) {
        this.$router.push(path)
      },
      ...mapActions([
        'deleteNavTabList',
        'restartNavTabList'
      ])
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'navTabList'
      ])
    },
    components: {
      scrollPane
    }
  }
</script>

<style lang="less" scpeod>
  .nav-tab-box {
    position: absolute;
    left: 200px;
    top: 50px;
    right: 0;
    height: 40px;
    line-height: 29px;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
    transition: .8s all ease;
  .tags-list {
    // position: absolute;
    padding: 2px 110px 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left .3s ease;
    }
    .tag-item-icon {
      color: #eee;
      font-size: 11px !important;
    }
    .tag-item {
      position: relative;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin: 2px 4px 2px 0;
      padding: 0 10px;
      border: 1px solid #eee;
      border-radius: 3px;
      color: #495060!important;
      font-size: 12px;
      vertical-align: middle;
      opacity: 1;
      overflow: hidden;
      cursor: pointer;
      transition: all .4s ease-in-out;
      > .icon-yuan {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #eee;
      }
      &.is-active {
      .tag-item-icon {
        color: #409eff;
        background-color: #409eff;
      }
      .tag-text {
        color: #409eff;
      }
      .tag-close {
        color: #409eff;
      }
        border-color: #409eff;
      }
    }
    .tag-text {
      margin-left: 8px;
    }
    .tag-close {
      margin-left: 8px;
    }
    .tag-item:hover {
      opacity: .85;
    }
    .tags-menu {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 15px;
      height: 100%;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    }
  }

  .nav-tab-box-show {
    left: 64px;
  }
</style>