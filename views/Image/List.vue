<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import sendRequest from '@/utils/request'

const images = ref([] as Image[])
const urls = computed(() => images.value.map(image => image.url))
init()

async function init() {
  const resp = sendRequest(await window.API.image.get())
  images.value = resp.images
}

async function deleteImage(id: string) {
  const resp = sendRequest(await window.API.image.del(id))
  if (resp.status) {
    images.value = images.value.filter(image => image.id !== id)
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success',
    })
  }
  else {
    ElMessage({
      showClose: true,
      message: '删除失败',
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="image-list">
    <div v-for="(image, index) in images" :key="image.id" class="image-list-item">
      <el-image
        :key="image.id"
        :src="image.url"
        :size="{ width: 100, height: 100 }"
        fit="cover"
        :preview-src-list="urls"
        loading="lazy"
        :initial-index="index"
        class="image-list-item-img"
      />
      <div class="image-list-item-operation">
        <span v-text="image.filename" />
        <el-button type="danger" size="small" @click="deleteImage(image.id)">
          删除
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image-list {
  column-count: 5;
  column-width: 240px;
  column-gap: 20px;

  .image-list-item {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 4px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.774);
    box-sizing: border-box;
    break-inside: avoid;

    .image-list-item-operation {
      padding: 4px 2px;
      display: flex;
      justify-content: space-between;
      margin-top: 2px;
    }
  }
}
</style>
