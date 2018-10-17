<template>
  <div class="login">
    <div class="login-box">
      <el-card class="box-card">
        <div solt="header" class="login-title">用户登陆</div>
        <div class="login-content">
          <el-input placeholder="请输入账号" v-model="username" autofocus class="login-input">
            <template slot="prepend">账号</template>
          </el-input>
          <el-input placeholder="请输入密码" v-model="password" type="password" class="login-input">
            <template slot="prepend">密码</template>
          </el-input>
          <el-input placeholder="请输入验证码" v-model="code" class="login-input" @keyup.enter.native="submitLogin">
            <template slot="append">abcdef</template>
          </el-input>
          <div class="login-btn">
            <el-button type="text">忘记密码</el-button>
            <el-button type="primary" class="btn-r" @click="submitLogin">登陆</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import user from './../../api/group/user'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      code: ''
    }
  },
  methods: {
    submitLogin () {
      if (this.code) {
        if (this.username || this.password) {
          // 登陆接口
          // const params = {
          //   username: this.username,
          //   password: this.password
          // }
          // const data = user.login(params)
          // if (data) {

          // }
          sessionStorage.setItem('token', 'fengrui')
          this.$router.push('/')
        } else {
          this.$message({
            message: '账号或密码不能为空',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="less">
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('./../../assets/bg.jpg') 100%;
    background-position-x: -300px;
    background-size: cover;
    > .login-box {
      position: absolute;
      right: 10%;
      top: 45%;
      margin-top: -150px;
      width: 400px;
      .login-title, .login-input {
        margin-bottom: 20px;
      }
      .login-btn {
        > .btn-r {
          float: right;
        }
      }
    }
  }
</style>
