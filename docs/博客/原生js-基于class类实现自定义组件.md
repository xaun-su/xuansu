---
title: 原生js-基于class类实现自定义组件
date: 2025-7-29
categories:
  - 前端
tags:
  - JavaScript
  - 自定义组件
createTime: 2025/07/29 10:10:10
permalink: /article/原生js-基于class类实现自定义组件/
---



##  原生js-基于class类实现自定义组件

通过 JavaScript 类，用于动态创建和管理组件元素。它不是一个 Web Component（即不是自定义 HTML 标签），而是通过实例化类并在指定 DOM 元素中渲染 HTML。

> 该方法用于ES6及以后

## 1.创建Class类

```js
class NavbarComponent {
    
}
```

## 2.构建构造函数

接受传递到组件的数据

```js
/**
     * 构造函数
     * @param {string} targetElementId - 标题将被渲染到的目标元素的ID
     * @param {object} config - 标题的配置对象
     * @param {number} [config.level=1] - 标题的级别 (1-6)
     * @param {string} [config.text='默认标题'] - 标题的文本内容
     * @param {string} [config.color='#333'] - 标题的颜色
     * @param {function} [config.onClick=null] - 标题被点击时触发的回调函数
     */
    constructor(targetElementId, config) {
        this.targetElementId = targetElementId;

        // 合并默认配置和用户传入的配置
        const defaultConfig = {
            level: 1,
            text: '默认标题',
            color: '#333',
            onClick: null
        };
        this.config = { ...defaultConfig, ...config };

        // 绑定事件处理函数，确保 this 指向组件实例
        this._handleClick = this._handleClick.bind(this);
    }

```

## 3.内部定义方法  

用于处理接受的数据 并进行数据的渲染

```js
 /**
     * 内部方法：获取并验证标题级别
     * @returns {number} 经过验证的标题级别
     */
    _getValidatedLevel() {
        let level = parseInt(this.config.level, 10);
        if (isNaN(level) || level < 1 || level > 6) {
            level = 1; // 默认值或无效值处理
        }
        return level;
    }

    /**
     * 生成标题的HTML字符串
     * @returns {string} 标题的HTML字符串
     */
    _generateHeadingHtml() {
        const level = this._getValidatedLevel();
        const text = this.config.text;
        const color = this.config.color;
        const headingTag = `h${level}`; // 根据 level 动态生成标签名

        // 注意：这里没有使用 Shadow DOM，所以样式会直接应用到主文档，需要注意命名冲突
        // 为了避免冲突，可以考虑使用更具体的类名或内联样式
        return `
            <${headingTag} class="my-heading-component-title" style="color: ${color};">
                ${text}
            </${headingTag}>
        `;
    }

    /**
     * 内部方法：处理标题点击事件
     * @param {Event} event - 点击事件对象
     */
    _handleClick(event) {
        console.log(`标题被点击了: ${this.config.text}`);
        // 如果用户提供了 onClick 回调函数，则调用它
        if (typeof this.config.onClick === 'function') {
            this.config.onClick(event);
        }
    }
```

## 4.定义render函数将数据渲染

```js
/**
     * 将标题组件渲染到DOM中
     */
    render() {
        const targetElement = document.getElementById(this.targetElementId);
        if (!targetElement) {
            console.error(`Target element with ID "${this.targetElementId}" not found for MyHeadingComponent.`);
            return;
        }

        // 清空目标元素内容，并插入标题HTML
        targetElement.innerHTML = this._generateHeadingHtml();

        // 获取刚刚插入的标题元素，并绑定点击事件
        const headingElement = targetElement.querySelector('.my-heading-component-title');
        if (headingElement) {
            headingElement.addEventListener('click', this._handleClick);
        }
    }

```

## 5.组件销毁 清理时 移除事件监听器和DOM元素

```js
destroy() {
        const targetElement = document.getElementById(this.targetElementId);
        if (targetElement) {
            const headingElement = targetElement.querySelector('.my-heading-component-title');
            if (headingElement) {
                headingElement.removeEventListener('click', this._handleClick);
            }
            targetElement.innerHTML = ''; // 清空内容
        }
        console.log(`MyHeadingComponent for target ID "${this.targetElementId}" destroyed.`);
    }
```

## 6.在html文件中实例化类并传递节点和数据

```js
//传递dom节点和对应的配置数据
const heading1 = new MyHeadingComponent('headingContainer1', {
            level: 1,
            text: '欢迎来到我的页面！',
            color: 'darkblue',
            onClick: (event) => {
                console.log('第一个标题被点击了！事件对象:', event);
                alert('你点击了第一个标题！');
            }
        });
        heading1.render();

```

## 7.完整代码

### inex.js文件

```js
class MyHeadingComponent {
    /**
     * 构造函数
     * @param {string} targetElementId - 标题将被渲染到的目标元素的ID
     * @param {object} config - 标题的配置对象
     * @param {number} [config.level=1] - 标题的级别 (1-6)
     * @param {string} [config.text='默认标题'] - 标题的文本内容
     * @param {string} [config.color='#333'] - 标题的颜色
     * @param {function} [config.onClick=null] - 标题被点击时触发的回调函数
     */
    constructor(targetElementId, config) {
        this.targetElementId = targetElementId;

        // 合并默认配置和用户传入的配置
        const defaultConfig = {
            level: 1,
            text: '默认标题',
            color: '#333',
            onClick: null
        };
        this.config = { ...defaultConfig, ...config };

        // 绑定事件处理函数，确保 this 指向组件实例
        this._handleClick = this._handleClick.bind(this);
    }

    /**
     * 内部方法：获取并验证标题级别
     * @returns {number} 经过验证的标题级别
     */
    _getValidatedLevel() {
        let level = parseInt(this.config.level, 10);
        if (isNaN(level) || level < 1 || level > 6) {
            level = 1; // 默认值或无效值处理
        }
        return level;
    }

    /**
     * 生成标题的HTML字符串
     * @returns {string} 标题的HTML字符串
     */
    _generateHeadingHtml() {
        const level = this._getValidatedLevel();
        const text = this.config.text;
        const color = this.config.color;
        const headingTag = `h${level}`; // 根据 level 动态生成标签名

        // 注意：这里没有使用 Shadow DOM，所以样式会直接应用到主文档，需要注意命名冲突
        // 为了避免冲突，可以考虑使用更具体的类名或内联样式
        return `
            <${headingTag} class="my-heading-component-title" style="color: ${color};">
                ${text}
            </${headingTag}>
        `;
    }

    /**
     * 内部方法：处理标题点击事件
     * @param {Event} event - 点击事件对象
     */
    _handleClick(event) {
        console.log(`标题被点击了: ${this.config.text}`);
        // 如果用户提供了 onClick 回调函数，则调用它
        if (typeof this.config.onClick === 'function') {
            this.config.onClick(event);
        }
    }

    /**
     * 将标题组件渲染到DOM中
     */
    render() {
        const targetElement = document.getElementById(this.targetElementId);
        if (!targetElement) {
            console.error(`Target element with ID "${this.targetElementId}" not found for MyHeadingComponent.`);
            return;
        }

        // 清空目标元素内容，并插入标题HTML
        targetElement.innerHTML = this._generateHeadingHtml();

        // 获取刚刚插入的标题元素，并绑定点击事件
        const headingElement = targetElement.querySelector('.my-heading-component-title');
        if (headingElement) {
            headingElement.addEventListener('click', this._handleClick);
        }
    }

    /**
     * 清理组件，移除事件监听器和DOM元素
     */
    destroy() {
        const targetElement = document.getElementById(this.targetElementId);
        if (targetElement) {
            const headingElement = targetElement.querySelector('.my-heading-component-title');
            if (headingElement) {
                headingElement.removeEventListener('click', this._handleClick);
            }
            targetElement.innerHTML = ''; // 清空内容
        }
        console.log(`MyHeadingComponent for target ID "${this.targetElementId}" destroyed.`);
    }
}

```



### index.html文件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Class 标题组件示例</title>
    <!-- 引入自定义组件的 JavaScript 文件 -->
    <script src="index.js"></script>
    <style>
        body {
            font-family: sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        .component-container {
            background-color: #fff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: 1px dashed #ccc; /* 标记出组件渲染的容器 */
        }
        .my-heading-component-title {
            /* 默认样式，可以被组件的 color 配置覆盖 */
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0; /* 移除默认的 h 标签外边距 */
            padding: 0;
            line-height: 1.2;
            cursor: pointer; /* 提示可点击 */
        }
        /* 可以添加一些额外的样式来区分不同级别的标题 */
        .my-heading-component-title[style*="font-size: 2.5em"] { border-bottom: 2px solid #eee; padding-bottom: 8px; }
        .my-heading-component-title[style*="font-size: 2em"] { font-style: italic; }

        button {
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            margin-right: 10px;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>JavaScript Class 标题组件 `MyHeadingComponent` 示例</h1>

    <div class="component-container" id="headingContainer1">
        <!-- 标题组件将渲染到这里 -->
    </div>

    <div class="component-container" id="headingContainer2">
        <!-- 另一个标题组件将渲染到这里 -->
    </div>

    <div class="component-container" id="headingContainer3">
        <!-- 第三个标题组件将渲染到这里 -->
    </div>

    <button id="updateHeading2">更新第二个标题</button>
    <button id="destroyHeading3">销毁第三个标题</button>

    <script>
        // 示例 1: 基本使用
        const heading1 = new MyHeadingComponent('headingContainer1', {
            level: 1,
            text: '欢迎来到我的页面！',
            color: 'darkblue',
            onClick: (event) => {
                console.log('第一个标题被点击了！事件对象:', event);
                alert('你点击了第一个标题！');
            }
        });
        heading1.render();

        // 示例 2: 不同的级别和颜色，动态更新
        const heading2 = new MyHeadingComponent('headingContainer2', {
            level: 3,
            text: '这是一个可更新的标题',
            color: 'green',
            onClick: () => {
                console.log('第二个标题被点击了！');
            }
        });
        heading2.render();

        document.getElementById('updateHeading2').addEventListener('click', () => {
            // 改变配置，然后重新渲染
            heading2.config.level = (heading2.config.level % 6) + 1;
            heading2.config.text = `更新后的标题 (级别 ${heading2.config.level})`;
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // 随机颜色
            heading2.config.color = randomColor;
            heading2.render(); // 重新渲染会重新绑定事件监听器
            console.log('第二个标题已更新和重新渲染。');
        });

        // 示例 3: 默认配置，并演示销毁
        const heading3 = new MyHeadingComponent('headingContainer3', {
            text: '点击我，然后尝试销毁我',
            onClick: () => {
                console.log('第三个标题被点击了！');
            }
        });
        heading3.render();

        document.getElementById('destroyHeading3').addEventListener('click', () => {
            heading3.destroy();
            console.log('第三个标题已销毁。');
        });
    </script>
</body>
</html>

```

