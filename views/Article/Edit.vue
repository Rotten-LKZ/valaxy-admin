<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import VEditor from '../../components/VEditor.vue'
import { useArticleStore } from '@/stores/article'

const router = useRouter()
const article = useArticleStore()
const params = useUrlSearchParams('hash')
const articleInfo = reactive(getArticleInfo())

function edited(status: boolean) {
  if (status) {
    ElMessage({
      showClose: true,
      message: '修改成功',
      type: 'success',
    })
    router.push('/article/list')
  }
  else {
    ElMessage({
      showClose: true,
      message: '修改失败',
      type: 'error',
    })
  }
}

function updateArticleInfo(foundArticle: Article) {
  articleInfo.title = foundArticle.title
  articleInfo.content = foundArticle.content
}

function getArticleInfo(): Article {
  const filename = params.filename
  if (filename) {
    const foundArticle = (article.articles.filter(item => item.filename === filename)[0] || { title: '', filename: '', content: '' }) as Article
    return {
      title: foundArticle.title,
      filename: foundArticle.filename.substring(0, foundArticle.filename.length - 3),
      content: foundArticle.content,
    }
  }
  else {
    return { title: '', filename: '', content: '' }
  }
}
</script>

<template>
  <VEditor v-model="articleInfo" type="edit" @updated="edited" @focusout-filename="updateArticleInfo" />
</template>
