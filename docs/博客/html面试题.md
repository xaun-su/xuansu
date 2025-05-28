---
title: html面试题
createTime: 2025/05/27 21:39:21
permalink: /article/eqapmxlq/
---
# html面试题

## 1.src与href的区别

**sre与href都是用来引入外部的资源**

区别如下

1.**引入方式不同**

sre是对资源的引用 ,用于引入图片,js链接等

```js
<script src='abc.js'></script>
<img src='./img.png'/>
```

href是对超文本的引用,用于引入超链接 网站等,常在a,link标签上

```js
<a href='baidu.com'></a>

<head>
<link rel="stylesheet" href="styles.css">
</head>
```

2.**指向不同**

- src指向的内容会嵌入到当前标签所在的位置。src会将其指向的资源下载并应⽤到⽂档内。
- href指向一些网络资源，建立和当前元素或本文档的链接关系。

3.**游览器解析过程不同**

​	当浏览器解析到src元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执⾏完毕，所以⼀般js脚本会放在页面底部。

​	当浏览器识别到href他指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。



## 2.html5更新内容有哪些(html5与html的区别)

### 2.1语义化标签

​	**语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）**。通俗来讲就是用正确的标签做正确的事情。

**优点:**

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用**语义类标签增强了可读性，结构更加清晰**，开发者能清晰的看出网页的结构，便于团队的开发与维护。

- header：定义文档的页眉（头部）；
- nav：定义导航链接的部分；
- footer：定义文档或节的页脚（底部）；
- article：定义文章内容；
- section：定义文档中的节（section、区段）；
- aside：定义其所处内容之外的内容（侧边）；

```js
<header></header>  头部

<nav></nav>  导航栏

<section></section>  区块（有语义化的div）

<main></main>  主要区域

<article></article>  主要内容

<aside></aside>  侧边栏

<footer></footer>  底部
```



### 2.2媒体标签

1. **audio：音频标签**

   ```js
   <audio src='' controls autoplay loop='true'></audio>
   ```

   **属性：**

   - controls 控制面板
   - autoplay 自动播放
   - loop=‘true’ 循环播放

2. **video:视频标签**

```js
<video src='' poster='imgs/aa.jpg' controls></video>
```

**属性：**

- poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过poster也可以自己指定。
- controls 控制面板
- width 视频宽度
- height 视频高度

 3.**source标签**

 因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过source来指定视频源。

```html
<video>
 	<source src='aa.flv' type='video/flv'></source>
 	<source src='aa.mp4' type='video/mp4'></source>
</video>
```



### 2.3Dom查询操作

- document.querySelector()  获取单个dom节点
- document.querySelectorAll() 获取多个dom节点

选择的对象可以是标签，可以是类(加点)，可以是ID(加#)



### 2.4 Web存储

HTML5 提供了两种在客户端存储数据的新方法：

1.**localStorage** - **本地存储**(没有时间限制的数据存储) 

- **容量大：** 通常为 5MB 或更多。
- **键值对存储：** 存储的数据都是字符串形式的键值对

```js
localStorage.setItem(key, value): //存储一个键值对。key 和 value 都会被转换为字符串。
localStorage.getItem(key): //根据键获取存储的值。如果键不存在，返回 null。
localStorage.removeItem(key): //根据键删除存储的值。
localStorage.clear(): //清除所有存储在 localStorage 中的数据。
localStorage.key(index): //获取指定索引位置的键名。
localStorage.length: //获取存储的键值对数量。
```

2.**sessionStorage** - **会话存储**(针对一个 session 的数据存储)

- `sessionStorage` 对象用于存储针对单个会话的数据。这意味着存储在 `sessionStorage` 中的数据在浏览器标签页或窗口关闭时就会被 **清除**。
- api与loaclstorage相同



### 2.5 表单

**表单类型：**

```js
- email ：能够验证当前输入的邮箱地址是否合法
- url ： 验证URL
- number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max属性可以设置为最大值，min可以设置为最小值，value为默认值。
- search ： 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
- range ： 可以提供给一个范围，其中可以设置max和min以及value，其中value属性可以设置为默认值
- color ： 提供了一个颜色拾取器
- time ： 时分秒
- data ： 日期选择年月日
- datatime ： 时间和日期(目前只有Safari支持)
- datatime-local ：日期时间控件
- week ：周控件
- month：月控件
```

**表单属性：**

```js
- placeholder ：提示信息
- autofocus ：自动获取焦点
- autocomplete=“on” 或者 autocomplete=“off” 使用这个属性需要有两个前提：
  - 表单必须提交过
  - 必须有name属性。
- required：要求输入框不能为空，必须有值才能够提交。
- pattern=" " 里面写入想要的正则模式，例如手机号patte="^(+86)?\d{10}$"
- multiple：可以选择多个文件或者多个邮箱
- form=" form表单的ID"
```

**表单事件：**

- oninput 每当input里的输入框内容发生变化都会触发此事件。
- oninvalid 当验证不通过时触发此事件。



### 2.6拖放,画布(canvas),SVG

- 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放

```HTML
<img draggable="true" />
```

- 画布（canvas ）： canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

- [SVG](./使用svg绘制图形并添加流光动画.md)：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准

- 地理定位：Geolocation（地理定位）用于定位用户的位置。



## 3.行内元素有哪些？块级元素有哪些？ 空元素有那些？

1.**块级元素**: 

块级元素在浏览器中通常会独立占据一整行，并且在它之前和之后都会有换行符。

包括

​	h5语义化标签、div、h1-h5、p、ul、li、ol、form、tr、th、td、table

2.**行内元素**

行内元素不会独占一行，与其他行内元素在同一行显示，不能设置宽高（或者说设置了也不影响布局）。

包括

```js
<span>: 最常用的行内容器，用于对文本进行分组或应用样式。
<a>: 超链接。
<strong>: 加粗文本（强调重要性）。
<em>: 斜体文本（强调）。
<b>: 加粗文本（不强调重要性）。
<i>: 斜体文本（不强调重要性）。
<u>: 下划线文本。
<small>: 小号文本。
<code>: 代码片段。
<img>: 图像（虽然是空元素，但通常显示为行内或行内块）。
<input>: 输入框（虽然是空元素，但通常显示为行内或行内块）。
<textarea>: 多行文本输入框。
<select>: 下拉列表。
<label>: 表单控件的标签。
<button>: 按钮。
```



3. 常用的空元素

​		空元素没有内容，不需要闭合标签。

```js
`<br>`: 换行符。

`<hr>`: 水平线。

`<img>`: 图像。

`<input>`: 输入控件。

`<link>`: 外部资源链接（常用于引入 CSS）。

`<meta>`: 元数据（如字符集、视口设置）。
```



## 4. DOCTYPE(⽂档类型) 的作用

doctype是一个标准通用标记语言的文档声明类型,它的目的是**告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档**，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在HTML⽂档的第⼀⾏。

游览器渲染页面的两种模式:1**.标准模式(严格模式)** 采用[W3C](./W3C与ES规范.md)的标准解析渲染页面

​						2.**怪异模式(混杂模式) **浏览器使用自己的怪异模式解析渲染页面。

> 混杂模式说明:混杂模式是浏览器为了 **向后兼容** 那些在 Web 标准出现之前编写的、不符合规范的旧网页而采用的一种渲染模式。在这种模式下，浏览器会模拟旧版浏览器的非标准行为，尤其是 IE 5/6 时代的渲染行为。
>
> 区分:没有或者DOCTYPE不完整的文档声明类型



## 5.文档声明（Doctype）和`<!Doctype html>`有何作用? 严格模式与混杂模式如何区分？它们有何意义?

文档声明(Doctype)作用:

​	文档声明是为了告诉浏览器，当前`HTML`文档使用什么版本的`HTML`来写的，这样浏览器才能按照声明的版本来正确的解析。

​	**`<!doctype html>` 的作用**就是让浏览器进入标准模式，使用最新的 `HTML5` 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。



## 6.说一下 HTML5 drag API (拖放)

dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。

darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。

dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。

dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。

dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。

drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。

dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。



## **7. Canvas和SVG的区别**

**（1）SVG：** SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图,数据大屏）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

> 注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

**（2）Canvas：** Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘



## 8.title与h1的区别、b与strong的区别、i与em的区别？

1. strong标签有语义，是起到加重语气的效果，而b标签是没有的，b标签只是一个简单加粗标签。b标签之间的字符都设为粗体，strong标签加强字符的语气都是通过粗体来实现的，而搜索引擎更侧重strong标签。
2. title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取有很大的影响
3. **i内容展示为斜体，em表示强调的文本**。



## 9.head 标签有什么作用，其中什么标签必不可少？

​	head标签用于定义文档的头部,是所有头部元素的容器。元素包括引入脚本、指引游览器查找样式表、提供设置游览器界面信息。

​	文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。

```js
<title> //定义文档的标题
<style> //包含文档内部的 CSS 样式规则。这些样式只应用于当前 HTML 文档。
<link> //定义文档与外部资源之间的关系。它主要用于链接外部样式表、网站图标等
<meta> //提供关于 HTML 文档的元数据。它是一个非常通用的标签，通过不同的属性来定义不同的元数据
<script> //用于嵌入或引用可执行的 JavaScript 代码。
<base> //为文档中的所有相对 URL 指定一个基础 URL
```

其中 `<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。

> ```js
> <base href="https://www.example.com/images/" target="_blank">
> <!-- 此时，<img src="logo.png"> 会被解析为 https://www.example.com/images/logo.png -->
> <!-- 此时，<a href="product.html"> 会在新窗口打开 https://www.example.com/images/product.html -->
> ```



## 10.常用的mate标签

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些`name`作为大家使用的共识，开发者还可以自定义name。

常用的meta标签： （1）`charset`，用来描述HTML文档的编码类型：

```html
<meta charset="UTF-8" >
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新：

```html
html

 体验AI代码助手
 代码解读
复制代码<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

其中，`content` 参数有以下几种：

- `width viewport` ：宽度(数值/device-width)
- `height viewport` ：高度(数值/device-height)
- `initial-scale` ：初始缩放比例
- `maximum-scale` ：最大缩放比例
- `minimum-scale` ：最小缩放比例
- `user-scalable` ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
```

其中，`content` 参数有以下几种：

- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；
- `index`：文件将被检索；
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索；
- `nofollow`：页面上的链接不可以被查询。。

