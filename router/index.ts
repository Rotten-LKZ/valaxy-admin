import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import PublicLayout from '../views/Layout.vue'
import ArticleAdd from '../views/Article/Add.vue'
import ArticleEdit from '../views/Article/Edit.vue'
import ArticleList from '../views/Article/List.vue'
import ImageList from '../views/Image/List.vue'
import { useUserStore } from '@/stores/user'
import { useArticleStore } from '@/stores/article'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/article',
      name: 'article',
      component: PublicLayout,
      children: [
        {
          path: '/article/add',
          name: 'article-add',
          component: ArticleAdd,
        },
        {
          path: '/article/edit',
          name: 'article-edit',
          component: ArticleEdit,
        },
        {
          path: '/article/list',
          name: 'article-list',
          component: ArticleList,
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
          component: ImageList,
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

  if (user.info.username === '' && to.name !== 'login')
    return { name: 'login' }

  if (user.info.username !== '' && to.name === 'login')
    return { name: 'home' }
})

export default router
