---
title: Bootstrap类名快速记忆
date: 2025-7-27
categories:
  - 前端
tags:
  - 前端
  - bootstrap
createTime: 2025/07/27 10:00:00
permalink: /article/bootstrap笔记/
---



### 响应式尺寸转化基础

**1.rem转化**

eg.  me-3    右边距1rem

​	me-3  me-md-1  576以下右边距1rem  576以上0.25rem

| 间距 | rem     | 屏幕尺寸 | 屏幕范围 |
| ---- | ------- | -------- | -------- |
| 1    | 0.25rem | sm       | ≥ 576px  |
| 2    | 0.5rem  | md       | ≥ 768px  |
| 3    | 1rem    | lg       | ≥ 992px  |
| 4    | 1.5rem  | xl       | ≥ 1200px |
| 5    | 3rem    | xxl      | ≥ 1400px |

> - `rem` (root em) 是一个相对单位，它相对于 HTML 根元素 (`<html>`) 的字体大小。
> - 如果你的根字体大小设置为 `16px` (常见默认值)，那么 `1rem` 就是 `16px`，`0.25rem` 就是 `4px`，`0.5rem` 就是 `8px`

### 一、 布局与网格 (Layout & Grid)

这是 Bootstrap 的基石，也是最常用的。

1. **容器 (Containers):**

   - `container`: 固定宽度容器（响应式）。

   - `container-fluid`: 100% 宽度容器。

     > *记忆点：* `container` 就是“容器”，`fluid` 意味着“流动的”，所以是全宽。

2. **行与列 (Rows & Columns):**

   - `row`: 定义一行。

   - `col`: 定义一个列。

   - ```
     col-{breakpoint}-{size}
     ```

     : 响应式列，如

     ```
     col-md-6
     ```
     
     (中等屏幕及以上占6列)。

     - `breakpoint` (断点): `sm` (small), `md` (medium), `lg` (large), `xl` (extra large), `xxl` (extra extra large)。
     - `size`: 1 到 12。

   - **`offset-{breakpoint}-{size}`: 列偏移**，如 `offset-md-3` (中等屏幕及以上偏移3列)。

     > *记忆点：* `row` 和 `col` 是英文单词本身。断点就是屏幕尺寸的缩写，`offset` 就是“偏移”。
     >
     > size：1到12 是指将页面分为12等份 size为多少就占几份

3. **间距 (Gutters):**

   - `g-{size}`: 设置行和列的水平垂直间距。

   - `gx-{size}`: 只设置水平间距。

   - `gy-{size}`: 只设置垂直间距。

     > 记忆点：* `g` 代表 `gutter` (排水沟，引申为间隙)。`x` 是横轴，`y` 是纵轴。`size` 0-5。

4. **Flexbox (弹性盒):**

   - `d-flex`: 将元素设置为 Flex 容器。
   
   - `flex-row`, `flex-column`: 设置主轴方向。
   
   - `flex-wrap`: 设置是否换行。
   
   - `justify-content-{alignment}`: 主轴对齐。`start`, `end`, `center`, `between`, `around`, `evenly`.
   
   - `align-items-{alignment}`: 交叉轴对齐。`start`, `end`, `center`, `baseline`, `stretch`.
   
   - `order-{number}`: 改变 Flex 项目的顺序。
   
   - `m-auto` / `mx-auto`: 自动外边距，常用于 Flex 项目居中。
   
     > *记忆点：* `d-flex` 是 `display: flex` 的缩写。`flex-row` 就是行，`flex-column` 就是列。`justify` 是“使...对齐”，`align` 是“对齐”。

------

### 二、 内容与排版 (Content & Typography)

1. **文本 (Text):**
   
   - `text-{color}`: 文本颜色，如 `text-primary`, `text-success`, `text-danger`, `text-muted`, `text-dark`, `text-light`, `text-white`.
   
   - `text-{alignment}`: 文本对齐，如 `text-start`, `text-center`, `text-end`.
   
   - `text-uppercase`, `text-lowercase`, `text-capitalize`: 文本大小写转换。
   
   - `fw-bold`, `fw-normal`, `fw-light`: 字体粗细 (`font-weight`)。
   
   - `fs-{size}`: 字体大小 (`font-size`)，1-6。
   
     > *记忆点：* `text` 是前缀。颜色就是语义化的英文单词。`alignment` 是对齐方式。`fw` 是 `font-weight`，`fs` 是 `font-size`。
   
2. **背景 (Backgrounds):**
   - `bg-{color}`: 背景颜色，如 `bg-primary`, `bg-dark`, `bg-transparent`.
   
     > 记忆点：* `bg` 是 `background` 的缩写。
   
3. **边框 (Borders):**
   - `border`: 添加所有边框。
   
   - `border-{direction}`: `border-top`, `border-bottom`, `border-start`, `border-end`.
   
   - `border-0`: 移除所有边框。
   
   - `border-{color}`: 边框颜色。
   
   - `rounded`, `rounded-circle`, `rounded-pill`: 圆角。
   
     > 记忆点：* `border` 是边框。`rounded` 是圆角。
   
4. **阴影 (Shadows):**
   - `shadow-sm`, `shadow`, `shadow-lg`: 不同大小的阴影。
   
   - `shadow-none`: 移除阴影。
   
     > *记忆点：* `shadow` 是阴影。

------

### 三、 间距与尺寸 (Spacing & Sizing - Utilities)

这是最常用的工具类，非常强大。

1. **外边距 (Margin) & 内边距 (Padding):**

   - `m-{size}`: 所有方向外边距。

   - `p-{size}`: 所有方向内边距。

   - ```
     mt-{size},mb-{size},ms-{size},me-{size}
     ```

     : 特定方向。

     - `t`: top (上)
     - `b`: bottom (下)
     - `s`: start (左，LTR模式下)
     - `e`: end (右，LTR模式下)
     
   - ```
     mx-{size},my-{size}
     ```
   
     : 水平/垂直方向。
   
     - `x`: horizontal (水平，左右)
     - `y`: vertical (垂直，上下)
     
   - ```
     {size}: 0 到 5，以及auto(自动)。
     ```

     - `0`: margin/padding: 0
     - `1`: margin/padding: .25rem
     - `2`: margin/padding: .5rem
     - `3`: margin/padding: 1rem
     - `4`: margin/padding: 1.5rem
     - `5`: margin/padding: 3rem
     - `auto`: margin: auto
   
     > *记忆点：* `m` 是 `margin`，`p` 是 `padding`。方向缩写是关键。数字代表大小。
   
2. **宽度 (Width) & 高度 (Height):**

   - `w-{percentage}`: 宽度，如 `w-25`, `w-50`, `w-75`, `w-100` (百分比)。
   
   - `h-{percentage}`: 高度，如 `h-25`, `h-50`, `h-75`, `h-100` (百分比)。
   
   - `mw-100`: 最大宽度 100%。
   
   - `mh-100`: 最大高度 100%。
   
   - `vw-100`: 视口宽度 100%。
   
   - `vh-100`: 视口高度 100%。
   
     > *记忆点：* `w` 是 `width`，`h` 是 `height`。`m` 是 `max`。`v` 是 `viewport`。

------

### 四、 组件 (Components)

组件类通常有自己的核心前缀。

1. **按钮 (Buttons):**
   - `btn`: 基础按钮样式。
   
   - `btn-{color}`: 按钮颜色，如 `btn-primary`, `btn-outline-success`.
   
   - `btn-{size}`: 按钮大小，如 `btn-sm`, `btn-lg`.
   
   - `btn-link`: 链接样式按钮。
   
   - `disabled`: 禁用状态。
   
     > *记忆点：* `btn` 是 `button` 的缩写。
   
2. **表单 (Forms):**
   - `form-control`: 输入框、文本域等。
   
   - `form-label`: 表单标签。
   
   - `form-check`, `form-check-input`, `form-check-label`: 复选框和单选框。
   
   - `input-group`: 输入框组。
   
   - `is-valid`, `is-invalid`: 表单验证状态。
   
     > *记忆点：* `form` 是前缀。`control` 是控件。
   
3. **导航 (Navs & Navbar):**
   
   - `nav`, `nav-item`, `nav-link`: 基础导航。
   
   - `navbar`, `navbar-expand-{breakpoint}`, `navbar-brand`, `navbar-nav`, `nav-link`: 导航栏。
   
     > *记忆点：* `nav` 是 `navigation` 的缩写。
   
4. **卡片 (Cards):**
   
   - `card`, `card-body`, `card-title`, `card-text`, `card-img-top`, `card-footer`, `card-header`.
   
     > *记忆点：* `card` 是前缀，后面跟着卡片的不同部分。
   
5. **警告 (Alerts):**
   - `alert`, `alert-{color}`: 警告框。
   
   - `alert-dismissible`: 可关闭的警告框。
   
     > *记忆点：* `alert` 是警告。
   
6. **徽章 (Badges):**
   - `badge`, `badge-{color}`, `text-bg-{color}` (Bootstrap 5+): 徽章。
   
     > *记忆点：* `badge` 是徽章。
   
7. **模态框 (Modals):**
   
   - `modal`, `modal-dialog`, `modal-content`, `modal-header`, `modal-body`, `modal-footer`.
   
     > *记忆点：* `modal` 是模态框。
   
8. **图片 (Images):**
   
   - **`img-fluid`: 响应式图片（最大宽度100%，高度自动）。**
   
   - `figure`, `figure-img`, `figure-caption`: 图片带标题。
   
     > *记忆点：* `img` 是 `image`，`fluid` 是流体。
   
9. **表格 (Tables):**
   - `table`: 基础表格样式。
   
   - `table-striped`: 斑马纹表格。
   
   - `table-bordered`: 带边框表格。
   
   - `table-hover`: 鼠标悬停高亮。
   
   - `table-{color}`: 表格行/单元格颜色。
   
     > *记忆点：* `table` 是表格。

------

### 五、 实用工具 (Utilities)

除了上面提到的间距、尺寸、文本、背景、边框、阴影，还有一些：

1. **显示 (Display):**
   
   - `d-{type}`: `d-none`, `d-block`, `d-inline`, `d-inline-block`, `d-flex`, `d-grid`.
   
   - `d-{breakpoint}-{type}`: 响应式显示，如 `d-md-none` (中等屏幕及以上隐藏)。
   
   - `visible`, `invisible`: 控制可见性。
   
     > 记忆点：* `d` 是 `display`。`none` 是隐藏，`block` 是块级，`inline` 是行内。

------

### 快速记忆技巧总结：

1. **语义化命名：** 大多数类名都是其英文含义的缩写或完整单词，如 `text-center` (文本居中), `bg-primary` (主色背景)。

2. 前缀是关键：
   - `m-` (margin), `p-` (padding)
   - `w-` (width), `h-` (height)
   - `d-` (display)
   - `text-` (text)
   - `bg-` (background)
   - `border-` (border)
   - `btn-` (button)
   - `card-` (card)
   - `alert-` (alert)
   - `form-` (form)
   - `col-` (column)

3. 方向缩写：
   - `t` (top), `b` (bottom), `s` (start), `e` (end)
   - `x` (horizontal), `y` (vertical)

4. **尺寸/断点缩写：**

   - `sm`, `md`, `lg`, `xl`, `xxl` (屏幕尺寸)
   - `sm`, `lg` (组件大小)
   - `0-5` (间距、字体大小等数值)

5. **颜色名称：** `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`, `white`, `transparent`.

   

