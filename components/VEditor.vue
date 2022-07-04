<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useClipboard, usePermission } from '@vueuse/core'
import MdEditor from 'md-editor-v3'
import { useArticleStore } from '@/stores/article'
import { getNow } from '@/utils/time'
import sendRequest from '@/utils/request'

const props = defineProps<{
  modelValue: Article
  type: 'add' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'updated', status: boolean): void
  (e: 'focusoutFilename', foundArticle: Article): void
  (e: 'focusoutTitle'): void
  (e: 'focusoutContent'): void
}>()

const nowTime = ref(getNow())
const { copy } = useClipboard()
const permissionWrite = usePermission('clipboard-write')
const article = useArticleStore()

async function updateNewArticle() {
  if (props.type === 'add')
    emit('updated', await article.addArticle(props.modelValue.title, props.modelValue.filename, props.modelValue.content))
  else
    emit('updated', await article.updateArticle(props.modelValue.title, props.modelValue.filename, props.modelValue.content))
}

function copyTime() {
  nowTime.value = getNow()
}

async function isFilenameRepeat() {
  if (props.type === 'add') {
    if (isFilenameExist()) {
      ElMessage({
        showClose: true,
        message: '文章名重复',
        type: 'error',
      })
    }
  }
  if (props.type === 'edit') {
    if (isFilenameExist()) {
      emit('focusoutFilename', article.articles.filter(item => item.filename === `${props.modelValue.filename}.md`)[0] as Article)
    }
    else {
      ElMessage({
        showClose: true,
        message: '文章名不存在',
        type: 'error',
      })
    }
  }
}

function isFilenameExist() {
  return article.articles.some(item => item.filename === `${props.modelValue.filename}.md`)
}

async function uploadImages(files: File[], callback: (urls: string[]) => void) {
  const resp = sendRequest(await window.API.image.upload(files))
  if (resp.status) { callback(resp.urls) }
  else {
    ElMessage({ showClose: true, message: '上传失败', type: 'error' })
    callback([])
  }
}

watch(nowTime, () => {
  copy(nowTime.value)
})
</script>

<template>
  <el-form :model="$props.modelValue" label-position="top">
    <div class="component-veditor-form-basic">
      <el-form-item label="标题" class="component-veditor-form-basic-item">
        <el-input v-model="$props.modelValue.title" @focusout="emit('focusoutTitle')" />
      </el-form-item>
      <el-form-item label="文件名" class="component-veditor-form-basic-item">
        <div class="component-veditor-form-basic-item-filename">
          <el-input v-model="$props.modelValue.filename" @focusout="isFilenameRepeat" />
          <span>.md</span>
        </div>
      </el-form-item>
    </div>

    <el-form-item label="内容">
      <md-editor v-model="$props.modelValue.content" @upload-img="uploadImages" @focusout="emit('focusoutContent')" />
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
@media screen and (max-width: 768px) {
  .component-veditor-form-basic {
    flex-direction: column;
  }
}

.component-veditor-form-basic {
  display: flex;
  gap: 40px;

  .component-veditor-form-basic-item {
    flex: 1;

    .component-veditor-form-basic-item-filename {
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
  }
}
</style>
