<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, watch } from 'vue'
import VEditor from '@/components/VEditor.vue'
import { getNow } from '@/utils/time'
import { frontmatterToContnet, parseFrontmatter } from '@/utils/article'

const newArticle = reactive({
  title: '',
  filename: '',
  content: initArticleContent(),
})

function added(status: boolean) {
  if (status) {
    newArticle.title = ''
    newArticle.filename = ''
    newArticle.content = initArticleContent()

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

function initArticleContent() {
  return `---
title: 
date: '${getNow()}'
updated: '${getNow()}'
categories: Category
tags:
  - Tag
---`
}

async function updateFrontmatterTitle() {
  const needAutoUpdateTitle = await getAutoUpdateTitleConfig()
  if (needAutoUpdateTitle === 'false')
    return
  const data = parseFrontmatter(newArticle.content)
  data.title = newArticle.title
  newArticle.content = frontmatterToContnet(newArticle.content, data)
}

async function updateTitle() {
  const needAutoUpdateTitle = await getAutoUpdateTitleConfig()
  if (needAutoUpdateTitle === 'false')
    return
  const data = parseFrontmatter(newArticle.content)
  newArticle.title = data.title
}

async function getAutoUpdateTitleConfig() {
  return await window.API.config.get('autoUpdateTitle') || 'false'
}
</script>

<template>
  <VEditor v-model="newArticle" type="add" @updated="added" @focusout-title="updateFrontmatterTitle" @focusout-content="updateTitle" />
</template>
