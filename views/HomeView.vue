<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useArticleStore } from '@/stores/article'

const autoUpdateTitle = ref('false')

init()
async function init() {
  autoUpdateTitle.value = await window.API.config.get('autoUpdateTitle') || 'false'
}

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

watch(autoUpdateTitle, () => {
  window.API.config.set('autoUpdateTitle', autoUpdateTitle.value)
})
</script>

<template>
  <el-button type="primary" @click="pushArticle">
    更新文章
  </el-button>
  <el-divider />
  自动填充文章标题：
  <el-radio-group v-model="autoUpdateTitle">
    <el-radio label="true">
      开启
    </el-radio>
    <el-radio label="false">
      关闭
    </el-radio>
  </el-radio-group>
</template>
