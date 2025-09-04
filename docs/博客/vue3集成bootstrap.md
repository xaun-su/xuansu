---
title: Vue3集成bootstrap
date: 2025--25
categories:
  - 前端
tags:
  - vue3
  - bootstrap
createTime: 2025/08/25 10:20:57
permalink: /article/Vue3集成bootstrap/

---

# Vue3集成bootstrap

### 1.搭建vue3+vite项目

项目搭建详情：[vite+vue3框架搭建](./vite+vue3框架搭建.md)

### 2.集成bootstrap5

```js
npm install bootstrap @popperjs/core
```

```js
yarn add bootstrap @popperjs/core
```

### 3.将bootstrap挂载到main.js上

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入 Bootstrap JavaScript (包含 Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).mount('#app')
```

### 4.验证 Bootstrap 集成

```js
<script setup>
// 如果你需要单独导入 Bootstrap 的 JS 组件，可以这样做
// import { Modal } from 'bootstrap'; // 导入 Modal 组件
// import { Collapse } from 'bootstrap'; // 导入 Collapse 组件

// 在这里可以定义一些响应式数据或方法
import { ref } from 'vue';

const showCollapse = ref(false);

function toggleCollapse() {
  showCollapse.value = !showCollapse.value;
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-primary mb-4">Vue 3 + Vite + Bootstrap 集成示例</h1>

    <!-- Bootstrap CSS 示例 -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-info text-white">
        CSS 类示例
      </div>
      <div class="card-body">
        <p class="lead">这是一个使用 Bootstrap 样式的段落。</p>
        <button class="btn btn-success me-2">成功按钮</button>
        <button class="btn btn-danger">危险按钮</button>
      </div>
    </div>

    <!-- Bootstrap JavaScript 组件示例 (Collapse) -->
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-secondary text-white">
        JavaScript 组件示例 (Collapse 折叠面板)
      </div>
      <div class="card-body">
        <button class="btn btn-primary" type="button" @click="toggleCollapse">
          {{ showCollapse ? '隐藏内容' : '显示内容' }}
        </button>

        <!-- 使用 v-show 或 v-if 控制折叠面板的显示/隐藏 -->
        <!-- Bootstrap 的 JS 会自动处理 data-bs-toggle 和 data-bs-target 属性 -->
        <div :class="{ 'collapse': true, 'show': showCollapse }" id="collapseExample">
          <div class="card card-body mt-3">
            这是折叠面板里的内容。
            <p class="text-muted mt-2">点击按钮可以切换我的显示状态。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航栏示例 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">首页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">功能</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">价格</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </div>
</template>

<style scoped>
/* 这里可以添加组件特有的样式，它们不会影响 Bootstrap 的全局样式 */
.container {
  max-width: 960px;
}
</style>
```

5.npm run dev 运行查看结果