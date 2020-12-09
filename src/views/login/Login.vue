<template>
  <div class="login-container">
    <div class="header-container">
      <top-bar :menu-list="[]"></top-bar>
    </div>
    <div class="login-box">
      <div class="login-form">
        <p style="text-align: left;font-size: 24px;font-weight:600;">登录</p>
        <el-form :model="loginForm" status-icon ref="loginForm" label-width="auto" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="button-box">
            <el-button size="large" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import * as user from '@/api/user'
export default {
  name: 'Login',
  components: {
    TopBar
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          user
            .login(this.loginForm)
            .then(res => {
              let token = res.token
              this.$store.dispatch('user/setToken', token)
              this.$router.push({ path: '/' })
            })
            .catch(err => {
              this.$message.error(err)
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  .login-box {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      width: 400px;
      height: 500px;
    }
  }
}
</style>
