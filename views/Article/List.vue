<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/article'

const router = useRouter()
const article = useArticleStore()

async function deleteArticle(filename: string) {
  const result = await article.delArticle(filename)
  if (result) {
    ElMessage({
      showClose: true,
      message: '文章删除成功',
      type: 'success',
    })
  }
  else {
    ElMessage({
      showClose: true,
      message: '文章删除失败',
      type: 'error',
    })
  }
}

function editArticle(filename: string) {
  router.push({ name: 'article-edit', query: { filename } })
}
</script>

<template>
  <el-table :stripe="true" :data="article.articles" class="article-list-table">
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="filename" label="文件名" />
    <el-table-column fixed="right" label="操作" width="100">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="editArticle(scope.row.filename)">
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
