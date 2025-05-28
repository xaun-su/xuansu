---
title: react路由7的搭建
date: 2025-5-18
categories:
  - react
tags:  
  - react
  - 路由
createTime: 2025/05/18 12:15:12
permalink: /article/asdfaf/
---

# react路由7的搭建

## 1.安装react路由

局部安装react路由

```js
npx react-router-dom@版本号
```

## 2.在main.tsx中添加BrowserRouter

**`BrowserRouter` 的作用就是作为整个 React 路由系统的“驱动器”或“协调者”，它负责监听 URL 的变化，管理浏览器历史记录，并通知 React 渲染与当前 URL 匹配的组件，从而在不进行整页刷新的情况下实现流畅的页面切换体验。**

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </StrictMode>,
)

```

## 3.在src下创建router/index.tsx

在index.tsx下放置路由的配置信息包括path,element等

```js
import ArticleUpload from '../Views/ArticlePreviews'
import ArticlePreviews from '../Views/ArticleUpload'

export const routes = [
  {
    path: '/',
    element: <ArticlePreviews />
  },
  {
    path: '/article-upload',
    element: <ArticleUpload />
  }
]
export default routes;

```

## 4.在app.tsx中映入路由配置
在app.tsx中引入路由配置，并且使用Routes和Route来包裹路由配置信息，并且使用map来遍历路由配置信息，将路由配置信息映射到对应的路由组件上。

```js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import router from'./router/index';

function App() {
  return (
    <Routes>
      {router.map((item, index) => {
        return <Route key={index} path={item.path} element={item.element} />;
      })}
    </Routes>
  );
}
export default App;
```

