import { createRouter, createWebHashHistory } from 'vue-router'

import PublicLayout from '../views/Layout.vue'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/article',
      name: 'article',
      component: () => PublicLayout,
      children: [
        {
          path: '/article/add',
          name: 'article-add',
          component: () => import('@/views/Article/Add.vue'),
        },
        {
          path: '/article/edit',
          name: 'article-edit',
          component: () => import('@/views/Article/Edit.vue'),
        },
        {
          path: '/article/list',
          name: 'article-list',
          component: () => import('@/views/Article/List.vue'),
        },
      ],
    },
    {
      path: '/image',
      name: 'image',
      component: PublicLayout,
      children: [
        {
          path: '/image/list',
          name: 'image-list',
          component: () => import('@/views/Image/List.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const user = useUserStore()
  await user.init()

  if (to.name?.toString().startsWith('article'))
    await useArticleStore().init()

  if (user.info.token === '' && to.name !== 'login')
    return { name: 'login' }

  if (user.info.token !== '' && to.name === 'login')
    return { name: 'home' }
})

export default router
