# CSS面试题总结

### 1.CSS选择器及其优先级

| **选择器**     | **格式**      | **优先级权重** |
| -------------- | ------------- | -------------- |
| id选择器       | #id           | 100            |
| 类选择器       | #classname    | 10             |
| 属性选择器     | a[ref=“eee”]  | 10             |
| 伪类选择器     | li:last-child | 10             |
| 标签选择器     | div           | 1              |
| 伪元素选择器   | li:after      | 1              |
| 相邻兄弟选择器 | h1+p          | 0              |
| 子选择器       | ul>li         | 0              |
| 后代选择器     | li a          | 0              |
| 通配符选择器   | *             | 0              |

> 权重越高 优先级越大
>
> 当权重相同 最后出现的样式生效
>
> !important声明的样式的优先级最高；
>
> 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。



### 2.CSS中可继承与不可继承属性有哪些?

**可继承属性:**

1. **display**
2. **文本属性**：
   1. - vertical-align：垂直文本对齐
   2. - text-decoration：规定添加到文本的装饰
   3. - text-shadow：文本阴影效果
   4. - white-space：空白符的处理
   5. - unicode-bidi：设置文本的方向
3. **盒子模型的属性**：width、height、margin、border、padding
4. **背景属性**：background、background-color、background-image、background-repeat、background-position、background-attachment
5. **定位属性**：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
6. **生成内容属性**：content、counter-reset、counter-increment
7. **轮廓样式属性**：outline-style、outline-width、outline-color、outline
8. **页面样式属性**：size、page-break-before、page-break-after
9. **声音样式属性**：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

**不可继承属性:**

**字体系列属性**

- ·font-family：字体系列
- font-weight：字体的粗细
- font-size：字体的大小
- font-style：字体的风格

**文本系列属性**

- text-indent：文本缩进
- text-align：文本水平对齐
- line-height：行高
- word-spacing：单词之间的间距
- letter-spacing：中文或者字母之间的间距
- text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
- color：文本颜色

**元素可见性**

- visibility：控制元素显示隐藏

**列表布局属性**

- list-style：列表风格，包括list-style-type、list-style-image等

**光标属性**

- cursor：光标显示为何种形态



### 3.display的属性值及其作用

| **属性值**   | **作用**                                                   |
| ------------ | ---------------------------------------------------------- |
| none         | 元素不显示，并且会从文档流中移除。                         |
| block        | 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。       |
| inline       | 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示。               |
| list-item    | 像块类型元素一样显示，并添加样式列表标记。                 |
| table        | 此元素会作为块级表格来显示。                               |
| inherit      | 规定应该从父元素继承display属性的值。                      |



### 4.display的block、inline和inline-block的区别

- **block**:独占一行,**将元素变成块级元素**,可以设置width、height、margin和padding属性；
- **inline：** 元素不会独占一行,将元素变成**行内元素**，设置width、height属性无效。
- **inline-block：** 将对象设置为inline对象，但对象的内容作为block对象呈现，之后的内联对象会被排列在同一行内。



### 5.隐藏元素的方法有哪些?

- **display:none**:渲染树不会包含该渲染对象，因此该**元素不会在页面中占据位置**，也不会响应绑定的监听事件。
- **visibility: hidden**:**元素在页面中仍占据空间**，但是不会响应绑定的监听事件。
- **opacity:0**: 将元素透明度改为0,实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
- **position: absolute**：通过使用绝对定位将元素移除可视区域内容。
- **z-index: 负值**:来使其他元素遮盖住该元素，以此来实现隐藏。(必须在定位的情况下才能使用)
- **clip/clip-path**：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
- **transform: scale(0,0)** ：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。



### 6.display:none与visibility:hidden的区别

- **display:none**:渲染树不会包含该渲染对象，因此该**元素不会在页面中占据位置**，也不会响应绑定的监听事件。
- **visibility: hidden**:**元素在页面中仍占据空间**，但是不会响应绑定的监听事件。



### 7.link和@import的区别

两者都是外部引用CSs样式

- link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
- link引用CSS时，在页面载入时**同时**加载；@import需要页面网页完全**载入以后**加载。
- link是XHTML标签，**无兼容问题**；@import是在CSS2.1提出的**，低版本的浏览器不支持**。
- link支持使用Javascript控制DOM去改变样式；而@import不支持



### 8.transition和animation的区别

**transition是过度属性**，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，**设置一个开始关键帧，一个结束关键帧。**

```js
<button class="my-button">Hover Me</button>
.my-button {
  padding: 10px 20px;
  background-color: #007bff; /* 初始背景色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, width 0.3s ease; 
  /* 也可以使用 shorthand: transition: all 0.3s ease; */
  /* 如果只改变一个属性，可以只写一个：transition: background-color 0.3s ease; */
  width: 150px; 
}7
.my-button:hover {
  background-color: #0056b3; /* 悬停时的背景色 */
  width: 180px; /* 悬停时的宽度 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 悬停时添加阴影，这个属性也会自动过渡 */
}
/* 提示：为了更好的浏览器兼容性，有时需要添加前缀，
.my-button {
  -webkit-transition: background-color 0.3s ease, width 0.3s ease;
  transition: background-color 0.3s ease, width 0.3s ease;
}
*/
```

**animation是动画属性**，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类似于flash的补间动画，但是它可以**设置多个关键帧（用@keyframe定义）完成动画。**

```js
loader {
  width: 50px;
  height: 50px;
  background-color: #ffc107; /* 初始颜色 */
  margin: 50px auto; /* 居中显示 */
  border-radius: 8px; /* 稍微圆角 */

  /* === 核心：定义动画效果 === */
  /* animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode> <play-state>; */
  /* 这里我们应用名为 'spin' 的动画，持续1秒，线性速度，无限循环 */
  animation: spin 1s linear infinite;
}

/* === 定义关键帧 === */
/* @keyframes <animation-name> { <keyframe-selector> { <css-properties> } } */
@keyframes spin {
  0% {
    transform: rotate(0deg); /* 动画开始时旋转0度 */
    background-color: #ffc107;
  }
  50% {
    transform: rotate(180deg) scale(1.1); /* 动画进行到一半时旋转180度，并稍微放大 */
    background-color: #fd7e14; /* 颜色也变化 */
  }
  100% {
    transform: rotate(360deg) scale(1); /* 动画结束时旋转360度，恢复大小 */
    background-color: #ffc107; /* 颜色恢复 */
  }
}
/* 提示：为了更好的浏览器兼容性，有时需要添加前缀，例如：
.loader {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
*/
```



### 9. **伪元素和伪类的区别和作用？**



### 10.对requestAnimationframe的理解



### 11. 对盒模型的理解

盒模型由margin padding content border四个部分组成

盒模型分为IE盒模型(怪异盒模型)

怪异盒模型的width和height属性的范围包含了border、padding和content

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4040de9fef1a49f4ae0ae66039edcfe0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

标准盒模型的width和height属性的范围只包含了content

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4544d45b5a0c47a58c0c33a7d8fbac09~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 可以通过修改box-sizing属性来改变元素的盒模型
>
> - `box-sizeing: content-box`表示标准盒模型（默认值）
> - `box-sizeing: border-box`表示IE盒模型（怪异盒模型）



### 12. 为什么有时候用**translate**来改变位置⽽不是定位？





### 13. li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？



### 14. CSS3中有哪些新特性

**新增各种CSS选择器** （: not(.input)：所有 class 不是“input”的节点）

圆角 （border-radius:8px）

多列布局 （multi-column layout）

**阴影和反射 （Shadoweflect）**

文字特效 （text-shadow）

文字渲染 （Text-decoration）

**线性渐变 （gradient）**

**旋转 （transform）**

增加了旋转,缩放,定位,倾斜,动画,多背景



### 15. 替换元素的概念及计算规则



### 16. 常见的图片格式及使用场景



### 17. 对 CSSSprites(精灵图) 的理解

​	CSSSprites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

优点:减少请求,提高页面性能  把多张图片合为一张能减少图片的字节

缺点:维护麻烦,使用的时候要借助其他工具对背景单元进行准确的测量

### 18. 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？



### 19. **margin 和 padding 的使用场景**

- 需要在border外侧添加空白，且空白处不需要背景（色）时，使用 margin；
- 需要在border内测添加空白，且空白处需要背景（色）时，使用 padding。

### 20. 对**line-height 的理解及其赋值方式**



### 21. CSS 优化和提高性能的方法有哪些？



### 22. CSS预处理器/后处理器是什么？为什么要使用它们？



### 23. ::before 和 :after 的双冒号和单冒号有什么区别？



### 24. display:inline-block 什么时候会显示间隙？



### 25. 单行、多行文本溢出隐藏



### 26. Sass、Less 是什么？为什么要使用他们？



### 27. 对媒体查询的理解？



### 28. 对 CSS 工程化的理解



### 29. 如何判断元素是否到达可视区域



### 30. z-index属性在什么情况下会失效



### 31. CSS3中的transform有哪些属性



# 二、页面布局

### 1. 常见的CSS布局单位

### 2. px、em、rem的区别及使用场景

### 3. 两栏布局的实现

### 4. 三栏布局的实现

### 5. 水平垂直居中的实现

### 6. 如何根据设计稿进行移动端适配?

### 7. 对Flex布局的理解及其使用场景

### 8. 响应式设计的概念及基本原理

# 三、定位与浮动

### 1. 为什么需要清除浮动?清除浮动的...

### 2. 使用 clear 属性清除浮动的原理?

### 3. 对BFC的理解,如何创建BFC

### 4. 什么是margin重叠问题?如何解...

### 5. 元素的层叠顺序

### 6. position的属性有哪些,区别是什么

### 7. display、float、position的关系

### 8. absolute与fixed共同点与不同点

### 9. 对 sticky 定位的理解

# 四、场景应用

### 1. 实现一个三角形

### 2. 实现一个扇形

### 3. 实现一个宽高自适应的正方形

### 4. 画一条0.5px的线

### 5. 设置小于12px的字体

### 6. 如何解决 1px 问题?

思路一:直接写 0.5px

思路二:伪元素先放大后缩小

思路三:viewport 缩放来解决





