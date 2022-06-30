import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import sendRequest from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  const isInit = ref(false)
  const info = ref({
    username: '',
    token: '',
  } as UserInfo)

  async function init() {
    isInit.value = true
    const resp = sendRequest(await window.API.user.state())
    if (resp)
      info.value = resp
  }

  async function login(baseUrl: string, username: string, password: string) {
    const resp = sendRequest(await window.API.user.login(baseUrl, username, password))
    if (resp.status)
      info.value = { username, token: resp.token }
    else
      ElMessage({ showClose: true, message: '登录失败，用户名或密码错误', type: 'error' })
    return resp.status
  }

  return { info, init, login }
})
