<template>
  <div class="layout">
    <!-- 顶部 -->
    <header class="top-side">
      <div class="logo-box">
        <span>锋锐科技</span>
      </div>
      <i :class="{'nav-show-btn iconfont': true, 'icon-weibiaoti15': !isCollapse, 'icon-kuaijiecaidan': isCollapse}" @click="isCollapse = !isCollapse"></i>
      <aside class="right-side">
        <!-- 全屏模式 -->
        <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
          <i class="iconfont icon-quanping" @click="toggleScreenfull"></i>
        </el-tooltip>
        <!-- 个人信息 -->
          <el-dropdown :hide-on-click="false" class="myself" @command="selfCtl">
            <img src="./../../assets/photo.png" alt="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </aside>
    </header>
    <!-- 侧边栏 -->
    <aside :class="{'nav-side': true, 'nav-hiden': isCollapse}">
      <!-- <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened router> -->
      <el-menu :default-active="activeNav" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened router @select="saveActiveNav">
        <template v-for="(item, index) in tools.newRouter(config, routes, fullRouter)">
          <el-submenu :index="`${index}`" :key="index" v-if="item.children">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.groupTitle}}</span>
            </template>
            <el-menu-item :index="`/${itemChild.path}`" v-for="(itemChild, indexChild) in item.children" :key="indexChild" :route="itemChild.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{itemChild.meta.title}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="`/${item.path}`" :key="index" v-if="!item.children" :route="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </aside>
    <!-- 历史菜单栏 -->
    <!-- <div style="position: absolute; left: 200px; top: 50px; right: 0; height: 40px;"> -->
      <nav-tab-box :navShow="isCollapse"></nav-tab-box>
    <!-- </div> -->
    <!-- 内容页面 -->
    <div :class="{'content-view': true, 'nav-hiden-content-view': isCollapse}" id="content-view">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import screenfull from 'screenfull'
  import navTabBox from './../../components/navTabBox'
  import config from './../../config/'
  import fullRouter from './../../router/fullRouter'
  import tools from './../../utils/'
  export default {
    name: 'layout',
    data() {
      return {
        tools: tools,
        fullRouter: fullRouter,
        config: config,
        routes: sessionStorage.getItem('routes'),
        isCollapse: false,
        navTabList: [{
          name: '首页'
        }]
      }
    },
    created() {
      // this.newRouter()
    },
    methods: {
      ...mapActions([
        'saveActiveNav'
      ]),
      // 启动全屏
      toggleScreenfull () {
        if (!screenfull.enabled) {
          this.$message({
            message: '该浏览器不支持全屏模式',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      // 个人控制中心
      selfCtl (type) {
        switch (type) {
          case 'logOut':
            this.$confirm('次操作将退出当前用户，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login')
            }).catch(() => {          
            })
            break
        
          default:
            break
        }
      }
    },
    components: {
      navTabBox
    },
    computed: {
      ...mapGetters(['activeNav'])
    }
  }
</script>

<style lang="less" scoped>
  .layout {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    >.top-side {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      border-bottom: solid 1px #e6e6e6;
      box-sizing: border-box;
      >.logo-box {
        display: inline-block;
        width: 200px;
        text-align: center;
      }
      >.nav-show-btn {
        display: inline-block;
        padding: 0 1rem;
        cursor: pointer;
        transition: .6s all ease;
      }
      >.nav-show-btn:hover {
        background-color: #e6e6e6;
      }
      > .right-side {
        float: right;
        padding: 0 1rem;
        > .iconfont {
          display: inline-block;
          padding: 0 1rem;
          cursor: pointer;
          transition: .6s all ease;
        }
        > .iconfont:hover, .myself:hover {
          background-color: #e6e6e6;
        }
        .myself {
          // display: inline-block;
          float: right;
          padding: 7px .5rem;
          width: 36px;
          height: 36px;
          overflow: hidden;
          cursor: pointer;
          transition: .6s all ease;
          img {
            width: 100%;
          }
        }
      }
    }
    >.nav-side {
      position: absolute;
      top: 50px;
      left: 0;
      bottom: 0;
      width: 200px;
      border-right: solid 1px #e6e6e6;
      box-sizing: border-box;
      transition: .8s all ease;
      overflow-y: auto;
      >.el-menu {
        border: none
      }
    }
    >.nav-hiden {
      width: 65px;
    }
    >.content-view {
      position: absolute;
      top: 90px;
      left: 200px;
      right: 0;
      bottom: 0;
      padding: .8rem;
      box-sizing: border-box;
      transition: .8s all ease;
      overflow-y: auto;
      overflow-x: hidden;
      // background-color:rgba(230,230,230,.5);
    }
    >.nav-hiden-content-view {
      left: 65px;
    }
  }
  .fade-enter-active {
    transition: all .5s;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
</style>
