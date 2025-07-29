---
title: 原生js-基于webComponent实现自定义组件
date: 2025-7-29
categories:
  - 前端
tags:
  - JavaScript
  - 自定义组件
createTime: 2025/07/29 10:10:10
permalink: /article/原生js-基于webComponent实现自定义组件/
---

## 原生js-webComponent实现自定义组件

webComponent讲解网址:[Web Component - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)

### 一.概念

Web Components 是一套 W3C 标准 API，允许你创建可复用、封装好的自定义 HTML 元素。它们是浏览器原生支持的组件化技术，无需任何前端框架即可使用，旨在解决前端组件化开发中的痛点，如样式冲突、JS 作用域污染、组件复用等。

### 二.四大基石

Web Components 主要由以下四个标准组成：

#### 1.**Custom Elements (自定义元素)**

- 允许你定义自己的 HTML 标签（例如 `<my-button>`、`<user-card>`）。
- **通过 JavaScript 类继承 `HTMLElement` 并注册到浏览器。**
- 自定义元素的名称必须包含一个连字符（`-`），以避免与现有或未来的 HTML 标签冲突。

#### 2.**Shadow DOM (影子 DOM)**

- 提供了一种将 DOM 树和样式封装到组件内部的方式。
- 组件内部的结构、样式和行为与外部文档完全隔离，不会相互影响。
- **解决了全局 CSS 污染和 DOM 结构泄露的问题。**
- 通过 `element.attachShadow({ mode: 'open' })` 创建。

#### 3.**HTML Templates (`<template>` 和 `<slot>`)**

- **`<template>` 标签**：用于声明可复用的 HTML 结构片段。其内容在页面加载时不会被渲染，但可以通过 JavaScript 克隆并在需要时插入到 DOM 中。
- **`<slot>` 标签**：作为占位符，用于在 Shadow DOM 内部定义内容分发（Content Distribution）的插入点。允许用户在使用自定义组件时插入自己的内容。

#### 4.**ES Modules (ES 模块)**

- 虽然不是 Web Components 规范的一部分，但它是现代 JavaScript 模块化开发的标准，对于组织和导入/导出 Web Components 代码至关重要。
- 通过 `import` 和 `export` 语句实现模块化。



### 三、创建自定义组件的步骤

#### 1.**定义 JavaScript 类**：

- 创建一个 JavaScript 类，它必须继承自 `HTMLElement`。
- 在这个类中定义组件的行为和结构。

```js
class MyGreeting extends HTMLElement{
    // 1. 定义要观察的属性
    static get observedAttributes() {
        return ['name'];
    }

    // 2. 构造函数：在元素被创建时调用
    constructor() {
        super(); // 必须调用 super()

        // 创建 Shadow DOM 并设置为 open 模式，允许外部 JS 访问
        this.shadow = this.attachShadow({ mode: 'open' });

        // 初始渲染或准备模板
        this._render();
    }
}
```



#### 2.**实现生命周期回调函数（可选但常用）**：

- **`constructor()`**: 构造函数，在元素被创建时调用。通常在这里创建 Shadow DOM 并进行初始化设置。
- **`connectedCallback()`**: 当自定义元素首次被插入到文档 DOM 时调用。适合进行初始渲染、事件监听器的添加等。
- **`disconnectedCallback()`**: 当自定义元素从文档 DOM 中移除时调用。适合进行清理工作，如移除事件监听器。
- **`attributeChangedCallback(name, oldValue, newValue)`**: 当自定义元素的一个被观察的属性（通过 `static get observedAttributes()` 定义）被添加、移除或更改时调用。
- **`static get observedAttributes()`**: 静态 getter，返回一个数组，包含你希望观察其变化的属性名称。

#### 3.**注册自定义元素**：

- 使用 `customElements.define()` 方法将你的类注册为新的自定义元素。
- 语法：`customElements.define('your-tag-name', YourClass);`

```js
// my-greeting.js
class MyGreeting extends HTMLElement {
    // 1. 定义要观察的属性 传递给组件的数据
    static get observedAttributes() {
        return ['name']; //多个['name1','name2']
    }

    // 2. 构造函数：在元素被创建时调用
    constructor() {
        super(); // 必须调用 super()

        // 创建 Shadow DOM 并设置为 open 模式，允许外部 JS 访问
        this.shadow = this.attachShadow({ mode: 'open' });

        // 初始渲染或准备模板
        this._render();
    }

    // 3. connectedCallback：当元素被添加到 DOM 时调用
    connectedCallback() {
        console.log('MyGreeting 组件已添加到 DOM');
        // 确保在连接时渲染，以防属性在连接前设置
        this._render();
    }

    // 4. disconnectedCallback：当元素从 DOM 移除时调用
    //在组件移除销毁的时候 移除事件监听器或清理资源 避免造成内存泄漏
    disconnectedCallback() {
        console.log('MyGreeting 组件已从 DOM 移除');
        // 可以在这里移除事件监听器或清理资源
    }

    // 5. attributeChangedCallback：当观察的属性变化时调用
    //name发生改变的数据
    attributeChangedCallback(name, oldValue, newValue) {
         if (oldValue === newValue) {// 只有当值真正改变时才执行逻辑，避免不必要的渲染
            return;
        }
        console.log(`属性 ${name} 从 "${oldValue}" 变为 "${newValue}"`);
        if (name === 'name' && oldValue !== newValue) {
            this._render(); // 属性变化时重新渲染
        }
        //可以通过switch(name)根据不同的属性名执行不同的逻辑
    }

    // 内部渲染方法，根据当前属性更新 Shadow DOM
    _render() {
        //如果是多个属性则要分别获取
        const name = this.getAttribute('name') || '访客'; // 获取 name 属性，默认值为 '访客'

        this.shadow.innerHTML = `
            <style>
                /* 这些样式只作用于 Shadow DOM 内部，不会影响外部文档 */
                .greeting {
                    font-family: Arial, sans-serif;
                    color: #333;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    display: inline-block;
                }
                .highlight {
                    color: blue;
                    font-weight: bold;
                }
            </style>
            <div class="greeting">
                你好，<span class="highlight">${name}</span>！
                <slot></slot> <!-- 这是一个 slot，允许插入外部内容 -->
            </div>
        `;
    }
}

// 6. 注册自定义元素
customElements.define('my-greeting', MyGreeting);
```

#### 4.html代码的使用

```js
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Components 示例</title>
    <!-- 引入自定义组件的 JavaScript 文件 -->
    <script type="module" src="my-greeting.js"></script>
    <style>
        /* 外部样式，不会影响 Shadow DOM 内部 */
        body {
            font-family: sans-serif;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>Web Components 原生 JS 自定义组件</h1>

    <h2>使用自定义元素</h2>

    <!-- 使用自定义元素，并传递 name 属性 -->
    <my-greeting name="世界"></my-greeting>
    <br><br>
    <my-greeting name="Web Components 爱好者">
        <!-- 插入到 <slot> 中的内容 -->
        <p>很高兴见到你！</p>
    </my-greeting>
    <br><br>
    <my-greeting></my-greeting> <!-- 没有 name 属性，将显示默认值 -->

    <button id="changeName">改变第一个组件的名称</button>

    <script>
        // 动态改变属性
        const firstGreeting = document.querySelector('my-greeting');
        document.getElementById('changeName').addEventListener('click', () => {
            firstGreeting.setAttribute('name', '动态用户');
        });

        // 移除组件示例
        setTimeout(() => {
            // firstGreeting.remove(); // 尝试移除第一个组件，观察 console 输出 disconnectedCallback
        }, 5000);
    </script>
</body>
</html>

```

> 在vscode里面下载live server插件 使用本地服务器打开 open with live server