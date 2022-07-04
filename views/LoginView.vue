<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const loginForm = reactive({
  baseUrl: '',
  username: '',
  password: '',
})

init()
async function init() {
  loginForm.baseUrl = await window.API.config.get('base_url') || ''
}

async function submitLoginForm() {
  if (await useUserStore().login(loginForm.baseUrl, loginForm.username, loginForm.password))
    router.push({ name: 'home' })
}
</script>

<template>
  <div class="login">
    <el-form
      label-width="100px"
      :model="loginForm"
      class="login-form"
      label-position="top"
    >
      <el-form-item>
        <h1>Valaxy Admin 登录</h1>
      </el-form-item>
      <el-form-item label="公共链接">
        <el-input v-model="loginForm.baseUrl" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-form-submit-btn" @click="submitLoginForm">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
.login {
  height: 100vh;
  width: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  background-image: url('https://cdn.jsdelivr.net/gh/YunYouJun/cdn/img/bg/stars-timing-0-blur-30px.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.login-form {
  max-width: 400px;
  width: 70%;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 2px 4px 6px #33333349;

  // 提交按钮
  .login-form-submit-btn {
    width: 100%;
  }

  h1 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }
}
</style>
