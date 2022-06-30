<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import VEditor from '../../components/VEditor.vue'

const router = useRouter()
const articleInfo = reactive({
  title: '',
  filename: '',
  content: '',
})

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
</script>

<template>
  <VEditor v-model="articleInfo" type="edit" @updated="edited" @focusout-filename="updateArticleInfo" />
</template>
