<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useArticleStore } from '@/stores/article'

async function pushArticle() {
  if (await useArticleStore().pushArticle()) {
    ElMessage({
      showClose: true,
      message: '更新成功',
      type: 'success',
    })
  }
  else {
    ElMessage({
      showClose: true,
      message: '更新失败',
      type: 'error',
    })
  }
}
</script>

<template>
  <el-button type="primary" @click="pushArticle">
    更新文章
  </el-button>
</template>
