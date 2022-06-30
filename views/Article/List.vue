<script setup lang="ts">
import { useArticleStore } from '@/stores/article'

const article = useArticleStore()

article.init()

function deleteArticle(filename: string) {
  // article.deleteArticle(filename)
}
</script>

<template>
  <el-table :stripe="true" :data="article.articles" class="article-list-table">
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="filename" label="文件名" />
    <el-table-column fixed="right" label="操作" width="100">
      <template #default="scope">
        <el-button link type="primary" size="small">
          修改
        </el-button>
        <el-popconfirm title="确认删除？" @confirm="deleteArticle(scope.row.filename)">
          <template #reference>
            <el-button link type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss">
.article-list-table {
  width: 100%
}
</style>
