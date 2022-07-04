<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useArticleStore } from '@/stores/article'

const autoUpdateTitle = ref('false')
const githubConfig = ref('')
const isGithub = window.API.config.apiEnv === 'GITHUB'
const showGithubConfig = ref(false)

init()
async function init() {
  autoUpdateTitle.value = await window.API.config.get('autoUpdateTitle') || 'false'
  githubConfig.value = await window.API.config.get('github_config') || '{"articlesApi":"","imgStore":"GITHUB","githubImg":{"imgApi":""}}'
}

function updateGithubConfig() {
  window.API.config.set('github_config', githubConfig.value)
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

  <div v-if="isGithub">
    <el-divider />

    <p>GitHub 配置</p>
    <el-input v-if="showGithubConfig" v-model="githubConfig" type="textarea" />
    <div style="margin-top: 6px;">
      <el-button type="primary" @click="updateGithubConfig">
        提交
      </el-button>
      <el-button style="margin-left: 10px;" @click="showGithubConfig = !showGithubConfig">
        显示 / 隐藏配置
      </el-button>
    </div>
  </div>
</template>
