<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useRouteStore } from './stores/route'

const route = useRoute()
const collapse = ref(isLess768Px())
const isSmallSize = ref(isLess768Px())
const nowPage = ref()

window.onresize = function () {
  isSmallSize.value = isLess768Px()
  collapse.value = isLess768Px()
}

function isLess768Px() {
  return window.innerWidth <= 768
}

watch(() => route.path, () => {
  nowPage.value = useRouteStore().getRouteName(route.path)
}, { immediate: true })
</script>

<template>
  <RouterView v-if="route.name === 'login'" />
  <el-container v-if="route.name !== 'login'" class="container">
    <el-aside :class="`container-aside ${collapse ? 'container-aside-collapse' : ''}`">
      <el-scrollbar>
        <el-header class="container-aside-header">
          Valaxy Admin
          <el-icon v-if="isSmallSize" class="cur-pointer" @click="collapse = !collapse">
            <Expand v-if="collapse" />
            <Fold v-else />
          </el-icon>
        </el-header>
        <el-menu class="container-aside-menu" :router="true" :default-active="route.path">
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            主页
          </el-menu-item>
          <el-sub-menu index="/article">
            <template #title>
              <el-icon><Document /></el-icon>
              博文
            </template>
            <el-menu-item index="/article/list">
              <el-icon><MessageBox /></el-icon>
              博文列表
            </el-menu-item>
            <el-menu-item index="/article/add">
              <el-icon><DocumentAdd /></el-icon>
              添加博文
            </el-menu-item>
            <el-menu-item index="/article/edit">
              <el-icon><EditPen /></el-icon>
              修改博文
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/image">
            <template #title>
              <el-icon><Picture /></el-icon>
              图片
            </template>
            <el-menu-item index="/image/list">
              <el-icon><Tickets /></el-icon>
              图片列表
            </el-menu-item>
          </el-sub-menu>
          <!-- <el-menu-item index="bill">
            <el-icon><Notebook /></el-icon>
            账簿
          </el-menu-item> -->
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container class="container-content">
      <el-header class="container-content-header">
        <el-icon class="cur-pointer" @click="collapse = !collapse">
          <Expand v-if="collapse" />
          <Fold v-else />
        </el-icon>
        <p class="container-content-header-route" v-text="nowPage" />
      </el-header>
      <el-scrollbar>
        <el-main class="container-content-main">
          <RouterView />
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<style lang="scss">
@media screen and (max-width: 768px) {
  .container-aside {
    width: 260px;
    position: fixed;
    left: 0;
    z-index: 100000;
  }

  .container-aside-collapse {
    left: -260px;
  }
}

.container {
  height: 100vh;
  width: 100%;

  // 收缩时侧边栏
  .container-aside-collapse {
    width: 0 !important;
  }

  // 侧边栏
  .container-aside {
    width: 260px;
    height: 100vh;
    background-color: #fff;
    transition: all .8s ease-in-out;

    // 侧边栏头部
    .container-aside-header {
      text-align: center;
      padding-top: 20px;
      font-size: 1.4rem;
      font-weight: 500;
      white-space: nowrap;
    }

    // 侧边栏菜单
    .container-aside-menu {
      border: none;
    }
  }

  // 内容部分
  .container-content {
    padding: 0 20px;
    padding-top: 10px;
    background-color: rgb(240, 240, 240);

    // 内容部分头部
    .container-content-header {
      display: flex;
      background-color: #fff;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;

      // 内容部分头部 当前路由提示
      .container-content-header-route {
        margin-left: 4px;
        font-size: 0.96rem;
        color: rgba($color: #000000, $alpha: 0.8);
        user-select: none;
      }

      // 内容部分头部 图标
      i {
        font-size: 1.5rem
      }
    }

    // 内容部分主体
    .container-content-main {
      // padding: 20px;
      background-color: #fff;

      // .container-content-main-scrollbar {
      //   box-sizing: border-box;
      //   padding: 20px;
      // }
    }
  }

  header {
    width: 100%;
  }
}
</style>
