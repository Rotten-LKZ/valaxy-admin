<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useClipboard, usePermission } from '@vueuse/core'
import { useArticleStore } from '@/stores/article'

const newArticle = reactive({
  title: '',
  filename: '',
  content: '',
})
const nowTime = ref(new Date().toLocaleString().replace(/\//g, '-'))
const { copy } = useClipboard()
const permissionWrite = usePermission('clipboard-write')

async function updateNewArticle() {
  const result = await useArticleStore().addArticle(newArticle.title, newArticle.filename, newArticle.content)
  if (result) {
    newArticle.title = ''
    newArticle.filename = ''
    newArticle.content = ''

    ElMessage({
      showClose: true,
      message: '文章添加成功',
      type: 'success',
    })
  }
  else {
    ElMessage({
      showClose: true,
      message: '文章添加失败',
      type: 'error',
    })
  }
}

function copyTime() {
  nowTime.value = new Date().toLocaleString().replace(/\//g, '-')
}

watch(nowTime, () => {
  copy(nowTime.value)
})
</script>

<template>
  <el-form :model="newArticle" label-position="top">
    <el-form-item label="标题">
      <el-input v-model="newArticle.title" />
    </el-form-item>
    <el-form-item label="文件名">
      <div class="article-add-form-filename">
        <el-input v-model="newArticle.filename" />
        <span>.md</span>
      </div>
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="newArticle.content" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateNewArticle">
        提交
      </el-button>
      <el-button type="default" @click="copyTime">
        复制当前时间
      </el-button>&nbsp;&nbsp;
      <span>时间：{{ nowTime }}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
      <span>权限：{{ permissionWrite }}</span>
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.article-add-form-filename {
  display: flex;
  width: 100%;

  // 标题 input 框
  .el-input__wrapper {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  // .md 后缀
  span {
    user-select: none;
    background-color: dimgray;
    color: white;
    padding: 0 6px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
