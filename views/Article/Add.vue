<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import VEditor from '../../components/VEditor.vue'

const newArticle = reactive({
  title: '',
  filename: '',
  content: '',
})

function added(status: boolean) {
  if (status) {
    newArticle.title = ''
    newArticle.filename = ''
    newArticle.content = ''

    ElMessage({
      showClose: true,
      message: '添加成功',
      type: 'success',
    })
  }
  else {
    ElMessage({
      showClose: true,
      message: '添加失败',
      type: 'error',
    })
  }
}
</script>

<template>
  <VEditor v-model="newArticle" type="add" @updated="added" />
</template>
