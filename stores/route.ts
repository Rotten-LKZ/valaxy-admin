import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteStore = defineStore('route', () => {
  const routes = ref({
    '/': '主页',
    '/article': '博文',
    '/article/edit': '博文 / 修改博文',
    '/article/add': '博文 / 添加博文',
    '/article/list': '博文 / 博文列表',
  } as { [key: string]: string })

  function getRouteName(route: string) {
    return routes.value[route] || '未知'
  }

  return { routes, getRouteName }
})
