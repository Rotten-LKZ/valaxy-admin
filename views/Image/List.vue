<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import sendRequest from '@/utils/request'

const DAY_LENGTH_MS = 24 * 60 * 60 * 1000 - 1

const images = ref([] as Image[])
const selectedImages = ref([] as Image[])
const range = ref([] as Date[])
const urls = computed(() => selectedImages.value.map(image => image.url))
init()

async function init() {
  const resp = sendRequest(await window.API.image.get())
  images.value = resp.images
  selectedImages.value = resp.images
}

async function deleteImage(id: string) {
  const resp = sendRequest(await window.API.image.del(id))
  if (resp.status) {
    images.value = images.value.filter(image => image.id !== id)
    updateSelectedImages(range.value)
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

watch(range, (newRange) => {
  updateSelectedImages(newRange)
})

function updateSelectedImages(newRange: Date[]) {
  if (newRange && newRange.length === 2) {
    const start = newRange[0].getTime()
    const end = newRange[1].getTime() + DAY_LENGTH_MS
    selectedImages.value = images.value.filter(image => image.updatedAt >= start && image.updatedAt <= end)
  }
  else {
    selectedImages.value = images.value
  }
}
</script>

<template>
  <div class="image-list">
    <el-date-picker
      v-model="range"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      unlink-panels
    />

    <div class="image-list-container">
      <div v-for="(image, index) in selectedImages" :key="image.id" class="image-list-container-item">
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
        <div class="image-list-container-item-operation">
          <span v-text="image.filename" />
          <el-button type="danger" size="small" @click="deleteImage(image.id)">
            删除
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image-list {

  .image-list-container {
    margin-top: 20px;
    column-count: 5;
    column-width: 240px;
    column-gap: 20px;

    .image-list-container-item {
      display: flex;
      flex-direction: column;
      padding: 10px;
      margin: 4px;
      border-radius: 4px;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.774);
      box-sizing: border-box;
      break-inside: avoid;

      .image-list-container-item-operation {
        padding: 4px 2px;
        display: flex;
        justify-content: space-between;
        margin-top: 2px;
      }
    }
  }
}
</style>
