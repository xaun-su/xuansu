---
title: Vue2_3
createTime: 2025/05/02 14:54:21
permalink: /article/rja5phwl/
---
# 脚手架的创建

``` http://localhost:5173/
yarn create vite my-vue-app --template vue     
npm create vue@latest
```

![](.\image3\4.png)

## 一、Vue中的常用指令

**概念：**指令（Directives）是 Vue 提供的带有 **v- 前缀** 的 特殊 标签**属性**。

为啥要学：提高程序员操作 DOM 的效率。

vue 中的指令按照不同的用途可以分为如下 6 大类：

-  内容渲染指令（v-html、v-text）
-  条件渲染指令（v-show、v-if、v-else、v-else-if）
-  事件绑定指令（v-on）
-  属性绑定指令 （v-bind）
-  双向绑定指令（v-model）
-  列表渲染指令（v-for）

指令是 vue 开发中最基础、最常用、最简单的知识点。



## 二、内容渲染指令v-html

内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下2 个：

- v-text（类似innerText）


- - 使用语法：`<p v-text="uname">hello</p>`，意思是将 uame 值渲染到 p 标签中
  - 类似 innerText，使用该语法，会覆盖 p 标签原有内容


- v-html（类似 innerHTML）


- - 使用语法：`<p v-html="intro">hello</p>`，意思是将 intro 值渲染到 p 标签中
  - 类似 innerHTML，使用该语法，会覆盖 p 标签原有内容
  - 类似 innerHTML，使用该语法，能够将HTML标签的样式呈现出来。

代码演示：

```js
 
  <div id="app">
    <h2>个人信息</h2>
	// 既然指令是vue提供的特殊的html属性，所以咱们写的时候就当成属性来用即可
    <p v-text="uname">姓名：</p> 
    <p v-html="intro">简介：</p>  // <p v-html="intro">简介：<h2>这是一个<strong>非常优秀</strong>的boy<h2> </p>
  </div> 

<script>
        const app = new Vue({
            el:'#app',
            data:{
                uname:'张三',
                intro:'<h2>这是一个<strong>非常优秀</strong>的boy<h2>'
            }
        })
</script>
```



## 三、条件渲染指令v-show v-if v-else

条件判断指令，用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：

1. v-show

   1. 作用：  控制元素显示隐藏
   2. 语法：  v-show = "表达式"   表达式值为 true 显示， false 隐藏
   3. 原理：  切换 display:none 控制显示隐藏
   4. 场景：频繁切换显示隐藏的场景

2. v-if

   1. 作用：  控制元素显示隐藏（条件渲染）
   2. 语法：  v-if= "表达式"          表达式值 true显示， false 隐藏
   3. 原理：  基于条件判断，是否创建 或 移除元素节点
   4. 场景：  要么显示，要么隐藏，不频繁切换的场景

   示例代码：

   ```js
     <div id="app">
       <div class="box">我是v-show控制的盒子</div>
       <div class="box">我是v-if控制的盒子</div>
     </div>
   
     <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
     <script>
       const app = new Vue({
         el: '#app',
         data: {
           flag: false
         }
       })
     </script>
   ```
   
3. v-else 和 v-else-if

   1. 作用：辅助v-if进行判断渲染
   2. 语法：v-else  v-else-if="表达式"
   3. 需要紧接着v-if使用

示例代码：

```js
  <div id="app">
    <p>性别：♂ 男</p>
    <p>性别：♀ 女</p>
    <hr>
    <p>成绩评定A：奖励电脑一台</p>
    <p>成绩评定B：奖励周末郊游</p>
    <p>成绩评定C：奖励零食礼包</p>
    <p>成绩评定D：惩罚一周不能玩手机</p>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>

    const app = new Vue({
      el: '#app',
      data: {
        gender: 2,
        score: 95
      }
    })
  </script>
```



## 四、事件绑定指令 @click

使用Vue时，如需为DOM注册事件，及其的简单，语法如下：

- ```vue
  <button v-on:事件名="内联语句" > 按钮 </button>
  ```

- ```vue
  <button v-on:事件名="处理函数" > 按钮 </button>
  ```

- ```vue
  <button v-on:事件名="处理函数(实参)"> 按钮 </button>
  ```

- `v-on:` 简写为 **@**

1. 内联语句

   ```js
   <div id="app">
       <button @click="count--">-</button>
       <span>{{ count }}</span>
       <button v-on:click="count++">+</button>
     </div>
     <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
     <script>
       const app = new Vue({
         el: '#app',
         data: {
           count: 100
         }
       })
     </script>
   ```

2. 事件处理函数

   注意：

   - 事件处理函数应该写到一个跟data同级的配置项（methods）中
   - methods中的函数内部的this都指向Vue实例

```js
<div id="app">
    <button>切换显示隐藏</button>
    <h1 v-show="isShow">黑马程序员</h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        isShow: true
      }
    })
  </script>
```

  3.给事件处理函数传参

- 如果不传递任何参数，则方法无需加小括号；methods方法中可以直接使用 e 当做事件对象


- 如果传递了参数，则实参 `$event` 表示事件对象，固定用法。

```js
 <style>
    .box {
      border: 3px solid #000000;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
      width: 200px;
    }
    h3 {
      margin: 10px 0 20px 0;
    }
    p {
      margin: 20px;
    }
  </style>

 <div id="app">
    <div class="box">
      <h3>小黑自动售货机</h3>
      <button>可乐5元</button>
      <button>咖啡10元</button>
      <button>牛奶8元</button>
    </div>
    <p>银行卡余额：{{ money }}元</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        money: 100
      }
    })
  </script>
```



## 五、属性绑定指令:title

1. **作用：**动态设置html的标签属性 比如：src、url、title
2. **语法**：**v-bind:**属性名=“表达式”
3. **v-bind:**可以简写成 =>   **:**

比如，有一个图片，它的 `src` 属性值，是一个图片地址。这个地址在数据 data 中存储。

则可以这样设置属性值：

- `<img v-bind:src="url" />`
- `<img :src="url" />`   （v-bind可以省略）

```js
  <div id="app">
    <img v-bind:src="imgUrl" v-bind:title="msg" alt="">
    <img :src="imgUrl" :title="msg" alt="">
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        imgUrl: './imgs/10-02.png',
        msg: 'hello 波仔'
      }
    })
  </script>
```



## 6、小案例-波仔的学习之旅

需求：默认展示数组中的第一张图片，点击上一页下一页来回切换数组中的图片

实现思路：

1.数组存储图片路径 ['url1','url2','url3'，...]

2.可以准备个下标index 去数组中取图片地址。

3.通过v-bind给src绑定当前的图片地址

4.点击上一页下一页只需要修改下标的值即可

5.当展示第一张的时候，上一页按钮应该隐藏。展示最后一张的时候，下一页按钮应该隐藏

```js
 <div id="app">
    <button>上一页</button>
    <div>
      <img src alt="">
    </div>
    <button>下一页</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        list: [
          './imgs/11-00.gif',
          './imgs/11-01.gif',
          './imgs/11-02.gif',
          './imgs/11-03.gif',
          './imgs/11-04.png',
          './imgs/11-05.png',
        ]
      }
    })
  </script>
```



## 7、列表渲染指令v-for

Vue 提供了 v-for 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。

v-for 指令需要使用 `(item, index) in arr` 形式的特殊语法，其中：

- item 是数组中的每一项
- index 是每一项的索引，不需要可以省略
- arr 是被遍历的数组

此语法也可以遍历**对象和数字**

```js
//遍历对象
<div v-for="(value, key, index) in object">{{value}}</div>
value:对象中的值
key:对象中的键
index:遍历索引从0开始

//遍历数字
<p v-for="item in 10">{{item}}</p>
item从1 开始
```



## 8、小案例-小黑的书架

需求：

1.根据左侧数据渲染出右侧列表（v-for）

2.点击删除按钮时，应该把当前行从列表中删除（获取当前行的id，利用filter进行过滤）

准备代码：

```js
<div id="app">
    <h3>小黑的书架</h3>
    <ul>
      <li v-from="(item, index) in booksList" :key='item.id'>
        <span>{item.name}</span>
        <span>{item.author}</span>
        <button @click="del(item.id)">删除</button>
      </li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        booksList: [
          { id: 1, name: '《红楼梦》', author: '曹雪芹' },
          { id: 2, name: '《西游记》', author: '吴承恩' },
          { id: 3, name: '《水浒传》', author: '施耐庵' },
          { id: 4, name: '《三国演义》', author: '罗贯中' }
        ]
      },
        methods: {
            del(id) {
                this.booksList = booksList.filter(item => item.id != id)
            }
        }
    })
  </script>
```



## 9、v-for中的key

**语法：** key="唯一值"

**作用：**给列表项添加的**唯一标识**。便于Vue进行列表项的**正确排序复用**。

**为什么加key：**Vue 的默认行为会尝试原地修改元素（**就地复用**）

实例代码：

```js
<ul>
  <li v-for="(item, index) in booksList" :key="item.id">
    <span>{{ item.name }}</span>
    <span>{{ item.author }}</span>
    <button @click="del(item.id)">删除</button>
  </li>
</ul>
```

注意：

1.  key 的值只能是字符串 或 数字类型
2.  key 的值必须具有唯一性
3.  推荐使用  id 作为 key（唯一），不推荐使用 index 作为 key（会变化，不对应）



## 10、双向绑定指令v-model

所谓双向绑定就是：

1. 数据改变后，呈现的页面结果会更新
2. 页面结果更新后，数据也会随之而变

**作用：** 给**表单元素**（input、radio、select）使用，双向绑定数据，可以快速 **获取** 或 **设置** 表单元素内容

**语法：**v-model="变量"

**需求：**使用双向绑定实现以下需求

1. 点击登录按钮获取表单中的内容
2. 点击重置按钮清空表单中的内容



```js
<div id="app">
    账户：<input type="text"> <br><br>
    密码：<input type="password"> <br><br>
    <button>登录</button>
    <button>重置</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        username: '',
        password: ''
      },
    })
  </script>
```

## 11、指令修饰符

### 1.什么是指令修饰符？

​	所谓指令修饰符就是通过“.”指明一些指令**后缀** 不同的**后缀**封装了不同的处理操作  —> 简化代码

### 2.按键修饰符

- @keyup.enter  —>当点击enter回车键的时候才触发
- @v-model.trim  -> 去掉前后空格
- v-model.number —>转数字
- @事件名.stop —> 阻止冒泡
- @事件名.prevent  —>阻止默认行为
- @事件名.stop.prevent —>可以连用 即阻止事件冒泡也阻止默认行为

## 12、v-bind对样式控制的增强-操作class

为了方便开发者进行样式控制， Vue 扩展了 v-bind 的语法，可以针对 **class 类名** 和 **style 行内样式** 进行控制 。

### 1.语法：

```html
<div> :class = "对象/数组">这是一个div</div>
```

### 2.对象语法

当class动态绑定的是**对象**时，**键就是类名，值就是布尔值**，如果值是**true**，就有这个类，否则没有这个类

```html
<div class="box" :class="{ 类名1: 布尔值, 类名2: 布尔值 }"></div>
```

​    适用场景：一个类名，来回切换



### 3.数组语法

当class动态绑定的是**数组**时 → 数组中所有的类，都会添加到盒子上，本质就是一个 class 列表

```html
<div class="box" :class="[ 类名1, 类名2, 类名3 ]"></div>
```

   使用场景:批量添加或删除类

## 4、京东秒杀-tab栏切换导航高亮

### 1.需求：

​	当我们点击哪个tab页签时，哪个tab页签就高亮

### 2.准备代码:

```html
 <style>
  * {
    margin: 0;
    padding: 0;
  }

  ul {
    display: flex;
    border-bottom: 2px solid #e01222;
    padding: 0 10px;
  }

  li {
    width: 100px;
    height: 50px;
    line-height: 50px;
    list-style: none;
    text-align: center;
  }

  li a {
    display: block;
    text-decoration: none;
    font-weight: bold;
    color: #333333;
  }

  li a.active {
    background-color: #e01222;
    color: #fff;
  }
</style>

<div id="app">
  <ul>
    <li @click="clickFn(item.id)" v-for="item in list" :key="item.id">
      <a :class="{active:  index === item.id}" href="#">{{ item.name
        }}
      </a>
    </li>
  </ul>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      index: 1,
      list: [
        { id: 1, name: '京东秒杀' },
        { id: 2, name: '每日特价' },
        { id: 3, name: '品类秒杀' }
      ]
    },
    methods: {
      clickFn(id) {
        this.index = id
      }
    },
  })
</script>
```

### 3.思路：

1.基于数据，动态渲染tab（v-for）

2.准备一个下标 记录高亮的是哪一个 tab

3.基于下标动态切换class的类名

## 13、v-bind对有样式控制的增强-操作style

### 1.语法

```html
<div class="box" :style="{ CSS属性名1: CSS属性值, CSS属性名2: CSS属性值 }"></div>
```

### 2.进度条案例

```html
<style>
  .progress {
    height: 25px;
    width: 400px;
    border-radius: 15px;
    background-color: #272425;
    border: 3px solid #272425;
    box-sizing: border-box;
    margin-bottom: 30px;
  }

  .inner {
    width: 50%;
    height: 20px;
    border-radius: 10px;
    text-align: right;
    position: relative;
    background-color: #409eff;
    background-size: 20px 20px;
    box-sizing: border-box;
    transition: all 1s;
  }

  .inner span {
    position: absolute;
    right: -20px;
    bottom: -25px;
  }
</style>

<div id="app">
  <div class="progress">
    <div class="inner" :style="{width: w }">
      <span>{{ w }}</span>
    </div>
  </div>
  <button @click="fn('25%')">设置25%</button>
  <button @click="fn('50%')">设置50%</button>
  <button @click="fn('75%')">设置75%</button>
  <button @click="fn('100%')">设置100%</button>
</div>

<script src=" https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      w: '0%'
    },
    methods: {
      fn(w) {
        this.w = w
      }
    },
  })
</script>
```

## 14、v-model在其他表单元素的使用

### 1.讲解内容：

常见的表单元素都可以用 v-model 绑定关联  →  快速 **获取** 或 **设置** 表单元素的值

它会根据  **控件类型** 自动选取  **正确的方法** 来更新元素

```js
输入框  input:text   ——> value
文本域  textarea	 ——> value
复选框  input:checkbox  ——> checked
单选框  input:radio   ——> checked
下拉菜单 select    ——> value
...
```

### 2.代码准备

```html
 <style>
  textarea {
    display: block;
    width: 240px;
    height: 100px;
    margin: 10px 0;
  }
</style>
<div id="app">
  <h3>小黑学习网</h3>
  姓名：
  <input type="text" v-model="name">
  <br><br>
  是否单身：
  <input type="checkbox" v-model="dan">
  <br><br>
  <!-- 
    前置理解：
      1. name:  给单选框加上 name 属性 可以分组 → 同一组互相会互斥
      2. value: 给单选框加上 value 属性，用于提交给后台的数据
    结合 Vue 使用 → v-model
  -->
  性别:
  <input type="radio" name="x" value="男" v-model="xing">男
  <input type="radio" name="x" value="女" v-model="xing">女
  <br><br>
  <!-- 
    前置理解：
      1. option 需要设置 value 值，提交给后台
      2. select 的 value 值，关联了选中的 option 的 value 值
    结合 Vue 使用 → v-model
  -->
  所在城市:
  <select v-model="city">
    <option value="北京">北京</option>
    <option value="上海">上海</option>
    <option value="成都">成都</option>
    <option value="南京">南京</option>
  </select>
  <br><br>
  自我描述：
  <textarea v-model="zi"></textarea>
  <button @click="fn">立即注册</button>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      name: '',
      dan: false,
      xing: '',
      city: '',
      zi: ''
    },
    methods: {
      fn() {
        console.log(this.name)
        console.log(this.dan)
        console.log(this.xing)
        console.log(this.city)
        console.log(this.zi)

      }
    },
  })
</script>
```

# 15. 计算属性computed

### 1.概念

基于**现有的数据**，计算出来的**新属性**。 **依赖**的数据变化，**自动**重新计算。

- vue2 语法

  ```js
  computed: {
      sum() {
          // 相应计算逻辑
          return  计算后的值
      }
  }
  
  // 直接使用
  {{ sum }}
  ```

- vue3 语法

  ```js
  //计算属性
  const getAge = computed(()=>{
    return '我的年龄'+user.age
  })
  
  
  
  // 可读写的计算属性
  const fullName = computed({
    // Getter
    get() {
      return `${firstName.value} ${lastName.value}`;
    },
    // Setter
    set(newValue) {
      const [first, last] = newValue.split(' ');
      firstName.value = first;
      lastName.value = last || '';
    }
  });
  ```

- 案例计算商品个数

  ```html
  <style>
    table {
      border: 1px solid #000;
      text-align: center;
      width: 240px;
    }
  
    th,
    td {
      border: 1px solid #000;
    }
  
    h3 {
      position: relative;
    }
  </style>
  
  <div id="app">
    <h3>小黑的礼物清单</h3>
    <table>
      <tr>
        <th>名字</th>
        <th>数量</th>
      </tr>
      <tr v-for="(item, index) in list" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.num }}个</td>
      </tr>
    </table>
  
    <!-- 目标：统计求和，求得礼物总数 -->
    <p>礼物总数：{{ sum }} 个</p>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        // 现有的数据
        list: [
          { id: 1, name: '篮球', num: 1 },
          { id: 2, name: '玩具', num: 2 },
          { id: 3, name: '铅笔', num: 5 },
        ]
      },
      computed: {
        sum() {
          let sumNum = this.list.reduce((sum, item) => {
            return sum + item.num
          }, 0)
          return sumNum
        }
      }
    })
  </script>
  ```

## 2.计算属性的优势

1. 缓存特性（提升性能）

   计算属性会对计算出来的结果缓存，再次使用直接读取缓存，

   依赖项变化了，会自动重新计算 → 并再次缓存

2. methods没有缓存特性, 调用就执行一次

3. 通过代码比较

## 3.计算属性的完整写法

**既然计算属性也是属性，能访问，应该也能修改了？**

1. 计算属性默认的简写，只能读取访问，不能 "修改"
2. 如果要 "修改"  → 需要写计算属性的完整写法

![](.\image3\1.png)

- 案例修改名字

  ```html
  <div id="app">
    姓：<input type="text" v-model="firstName"> +
    名：<input type="text" v-model="lastName"> =
    <span> {{ name }}</span><br><br>
    <button @click="clickFn">改名卡</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        firstName: '刘',
        lastName: '备'
      },
      computed: {
        name: {
          get() {
            return this.firstName + this.lastName
          },
          set(value) { // 在修改值的时候name  会将修改后的值传进来
            this.firstName = value.slice(0, 1)
            this.lastName = value.slice(1)
          }
        }
      },
      methods: {
        clickFn() {
          this.name = '刁晓成'
        }
      }
    })
  </script>
  ```

  

# 16 .watch侦听器（监视器）

### 1.作用：

​	**监视数据变化**，执行一些业务逻辑或异步操作

## 2.语法：

### 1.vue2的语法

1. watch同样声明在跟data同级的配置项中

2. 简单写法： 简单类型数据直接监视

3. 完整写法：添加额外配置项

   ```js
   data: { 
     words: '苹果',
     obj: {
       words: '苹果'
     }
   },
   
   watch: {
     // 该方法会在数据变化时，触发执行
     数据属性名 (newValue, oldValue) {
       一些业务逻辑 或 异步操作。 
     },
         // 不可对象.属性名 方法名要加引号
     '对象.属性名' (newValue, oldValue) {
       一些业务逻辑 或 异步操作。 
     }
   }
   ```

- 完整写法

  完整写法 —>添加额外的配置项

  1. deep:true 对复杂类型进行深度监听
  2. immdiate:true 初始化 立刻执行一次

  ```js
  
  data: {
    obj: {
      words: '苹果',
      lang: 'italy'
    },
  },
  
  watch: {// watch 完整写法
    对象: {
      deep: true, // 深度监视
      immdiate:true,//立即执行handler函数
      handler (newValue) {
        console.log(newValue)
      }
    }
  }
  
  ```

  

- 案例实时翻译

  ```js
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-size: 18px;
    }
  
    #app {
      padding: 10px 20px;
    }
  
    .query {
      margin: 10px 0;
    }
  
    .box {
      display: flex;
    }
  
    textarea {
      width: 300px;
      height: 160px;
      font-size: 18px;
      border: 1px solid #dedede;
      outline: none;
      resize: none;
      padding: 10px;
    }
  
    textarea:hover {
      border: 1px solid #1589f5;
    }
  
    .transbox {
      width: 300px;
      height: 160px;
      background-color: #f0f0f0;
      padding: 10px;
      border: none;
    }
  
    .tip-box {
      width: 300px;
      height: 25px;
      line-height: 25px;
      display: flex;
    }
  
    .tip-box span {
      flex: 1;
      text-align: center;
    }
  
    .query span {
      font-size: 18px;
    }
  
    .input-wrap {
      position: relative;
    }
  
    .input-wrap span {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-size: 12px;
    }
  
    .input-wrap i {
      font-size: 20px;
      font-style: normal;
    }
  </style>
  
  <div id="app">
    <!-- 条件选择框 -->
    <div class="query">
      <span>翻译成的语言：</span>
      <select>
        <option value="italy">意大利</option>
        <option value="english">英语</option>
        <option value="german">德语</option>
      </select>
    </div>
  
    <!-- 翻译框 -->
    <div class="box">
      <div class="input-wrap">
        <textarea v-model="words"></textarea>
        <span><i>⌨️</i>文档翻译</span>
      </div>
      <div class="output-wrap">
        <div class="transbox">{{mela }}</div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    // 接口地址：https://applet-base-api-t.itheima.net/api/translate
    // 请求方式：get
    // 请求参数：
    // （1）words：需要被翻译的文本（必传）
    // （2）lang： 需要被翻译成的语言（可选）默认值-意大利
    // -----------------------------------------------
  
    const app = new Vue({
      el: '#app',
      data: {
        words: '',
        timeId: null,
        mela: ''
      },
      // 具体讲解：(1) watch语法 (2) 具体业务实现
      watch: {
        words(newValue) {
          // 防抖
          clearTimeout(this.timeId)
          this.timeId = setTimeout(async () => {
            let res = await axios.get(`https://applet-base-api-t.itheima.net/api/translate?words = ${newValue}`)
            this.mela = res.data.data
          }, 300)
  
        }
      }
    })
  </script>
  ```

### 2. **vue3 的语法**

```js
watch(监听数据源,执行函数,[配置参数])  

//配置参数： 立即执行 深度监听
{immediate: true, deep: true }
```

- ### 6.1 监听基本数据类型单一数据源

  ```vue
  <script setup>
  import {ref, watch} from 'vue'
   let name = ref('张麻子')
  
   //监听器
  watch(name,(newVal,oldVal)=>{
      console.log('变量发生了改变...',newVal);
  })
  </script>
  ```

  ### [#](https://gotang.cn/pages/6355cf/#_6-2-监听引用数据类型单一数据源)6.2 监听引用数据类型单一数据源

  ```vue
  <script setup>
  import {reactive, ref, watch} from 'vue'
  let user = reactive({name:'张三',age:14})
   //监听器
  watch(()=>user.name,(newVal,oldVal)=>{
    console.log('对象user中的name属性发生了变化..',newVal);
  })
  </script>
  ```

  ### [#](https://gotang.cn/pages/6355cf/#_6-3-监听引用数据类型-多数据源-深度监听)6.3 监听引用数据类型 多数据源[深度监听]

  ```vue
  <template>
    <div>
      <button @click="addNum()"> 添加随机数</button>
      <div v-for="item in nums" :key="item">{{ item }}</div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, watch } from 'vue'
  let nums = reactive([]);
  
  //添加随机数
  const addNum = () => {
    let num = Math.ceil(Math.random() * 100);
    nums.push(num);
  }
  //监听数组变化-深度监听
  watch(()=>nums,(newVal,oldVal)=>{
      console.log('nums数组发生了变化..',newVal);
  },{deep:true})
  
  </script>
  ```

  

- 案例实时翻译

  ```html
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-size: 18px;
    }
  
    #app {
      padding: 10px 20px;
    }
  
    .query {
      margin: 10px 0;
    }
  
    .box {
      display: flex;
    }
  
    textarea {
      width: 300px;
      height: 160px;
      font-size: 18px;
      border: 1px solid #dedede;
      outline: none;
      resize: none;
      padding: 10px;
    }
  
    textarea:hover {
      border: 1px solid #1589f5;
    }
  
    .transbox {
      width: 300px;
      height: 160px;
      background-color: #f0f0f0;
      padding: 10px;
      border: none;
    }
  
    .tip-box {
      width: 300px;
      height: 25px;
      line-height: 25px;
      display: flex;
    }
  
    .tip-box span {
      flex: 1;
      text-align: center;
    }
  
    .query span {
      font-size: 18px;
    }
  
    .input-wrap {
      position: relative;
    }
  
    .input-wrap span {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-size: 12px;
    }
  
    .input-wrap i {
      font-size: 20px;
      font-style: normal;
    }
  </style>
  
  <div id="app">
    <!-- 条件选择框 -->
    <div class="query">
      <span>翻译成的语言：</span>
      <select>
        <option value="italy">意大利</option>
        <option value="english">英语</option>
        <option value="german">德语</option>
      </select>
    </div>
  
    <!-- 翻译框 -->
    <div class="box">
      <div class="input-wrap">
        <textarea v-model="words"></textarea>
        <span><i>⌨️</i>文档翻译</span>
      </div>
      <div class="output-wrap">
        <div class="transbox">{{mela }}</div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    // 接口地址：https://applet-base-api-t.itheima.net/api/translate
    // 请求方式：get
    // 请求参数：
    // （1）words：需要被翻译的文本（必传）
    // （2）lang： 需要被翻译成的语言（可选）默认值-意大利
    // -----------------------------------------------
  
    const app = new Vue({
      el: '#app',
      data: {
        words: '',
        timeId: null,
        mela: ''
      },
      // 具体讲解：(1) watch语法 (2) 具体业务实现
      watch: {
        words(newValue) {
          // 防抖
          clearTimeout(this.timeId)
          this.timeId = setTimeout(async () => {
            let res = await axios.get(`https://applet-base-api-t.itheima.net/api/translate?words = ${newValue}`)
            this.mela = res.data.data
          }, 300)
  
        }
      }
    })
  </script>
  ```

  

# 17. 生命周期

> 创建  挂载 修改 销毁

![](.\image3\2.png)

| vue2                     | vue3.0          | vue3.2            | 备注                                                 |
| ------------------------ | --------------- | ----------------- | ---------------------------------------------------- |
| beforeCreate             |                 | setup             | 组件创建之前 可以获取顶级实例对象                    |
| created                  |                 | setup             | 组件创建完成，可以获取变量                           |
| beforeMount              |                 | onBeforeMount     | 挂载前，VNdom创建完成，真实dom未渲染                 |
| mounted                  |                 | onMounted         | 挂载完成，真实dom创建完成，可以获取dom               |
| beforeUpdate             |                 | onBeforeUpdate    | dom更新前触发                                        |
| updated                  |                 | onUpdated         | dom更新完成触发                                      |
| beforedestroy，destroyed | beforeUnmount   | onBeforeUnmount   | 组件卸载后触发 所有的挂载的数据 子组件全部卸载后触发 |
|                          | errorCaptured   | onErrorCaptured   | 在捕获一个来自后代组件的错误时被调用                 |
|                          | renderTracked   | onRenderTracked   | 跟踪虚拟 DOM 重新渲染时调用                          |
|                          | renderTriggered | onRenderTriggered | 当虚拟 DOM 重新渲染被触发时调用                      |
| activated                | activated       | onActivated       | 缓存组件激活时调用                                   |
| deactivated              | deactivated     | onDeactivated     | 缓存组件失活时调用                                   |

![](.\image3\3.png)

```vue
<template>
  <div>
      <div class="box"></div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
  //生命周期钩子监听
  onMounted(()=>{
    console.log(document.querySelector('.box')); //可以获取dom
  })
</script>
```



# 18. 父子通信

## vu2 传递

### 1.父子通信流程

1. 父组件通过 **props** 将数据传递给子组件
2. 子组件利用 **$emit** 通知父组件修改更新

### 2.父向子通信代码示例

父组件通过**props**将数据传递给子组件

![68231871178](.\image3\88.png)

父向子传值步骤

1. 给子组件以添加属性的方式传值
2. 子组件内部通过props接收
3. 模板中直接使用 props接收的值

### 3.子向父通信代码示例

子组件利用 **$emit** 通知父组件，进行修改更新

![68231896563](.\image3\89.png)

子向父传值步骤

1. $emit触发事件，给父组件发送消息通知
2. 父组件监听$emit触发的事件
3. 提供处理函数，在函数的性参中获取传过来的参数

## vue3 传递

> 利用编译宏  defineProps

- 类型校验

```js
const props =  defineProps({
  title: {
    type: String,  // 数据类型
    default: '',   // 默认值
    required: true,  // 是否必填
    validator (value) {
        // 自定义校验逻辑
        return 是否通过
        
    }
  }
})
```



### 1.父传子

> 在组建中使用直接写属性 {{ message}}
>
> 在js中  props.message

![](.\image3\5.png)

### 2 子传父

> 利用defineEmits  定义自定义事件  让父亲监听获取参数

![](.\image3\6.png)

## 19、非父子通信-event bus 事件总线

### 1.作用

非父子组件之间，进行简易消息传递。(复杂场景→ Vuex)

### 2.vue2

1. 创建一个都能访问的事件总线 （空Vue实例）

   ```js
   import Vue from 'vue'
   const Bus = new Vue()
   export default Bus
   ```

2. A组件（接受方），监听Bus的 $on事件

   ```vue
   created () {
     Bus.$on('sendMsg', (msg) => {
       this.msg = msg
     })
   }
   ```

3. B组件（发送方），触发Bus的$emit事件

   ```vue
   Bus.$emit('sendMsg', '这是一个消息')
   ```

   ![](.\image3\7.png)

## vue3 

> provide 和 inject  不可用于兄弟通信

父组件

![](.\image3\8.png)

子组件

![](.\image3\9.png)



## 20、v-model原理

### 1.原理：

v-model本质上是一个语法糖。例如应用在输入框上，就是value属性 和 input事件 的合写

```vue
<template>
  <div id="app" >
    <input v-model="msg" type="text">

    <input :value="msg" @input="msg = $event.target.value" type="text">
  </div>
</template>

```

### 2.作用：

提供数据的双向绑定

- 数据变，视图跟着变 :value
- 视图变，数据跟着变 @input



## 3. vue2

> v-model = :value  + @input

![](.\image3\10.png)

- **简写**

  ![](.\image3\13.png)

## 4. vue3 组件之间的表单绑定

> v-model =  :value  +  @update:属性名

![](.\image3\11.png)

![12](.\image3\12.png)





# 21. ref获取DOM  和组件

## vue2 中

![](.\image3\14.png)

## vue3 

```vue
const inp = ref(null)

// 获取
inp.value.count // 123

<div ref='inp'>  </div>
```

- 获取组件

```js
const inp = ref(null)

// 获取
inp.value

<Son ref="inp" />
```

在组件中需要利用defineExpose导出属性和方法

````js
let count = ref(123)

const fn = () => {
    
}

defineExpose({
    count,
    fn
})
````



# 22、异步更新 & $nextTick

> ### 3.问题
>
> "显示之后"，立刻获取焦点是不能成功的！
>
> 原因：Vue 是异步更新DOM  (提升性能)

### 解决方案

$nextTick：**等 DOM更新后**,才会触发执行此方法里的函数体

**语法:** this.$nextTick(函数体)

```js
this.$nextTick(() => {
  this.$refs.inp.focus()
})
```

**注意：**$nextTick 内的函数体 一定是**箭头函数**，这样才能让函数内部的this指向Vue实例

# 23. 自定义指令

- 全局注册

  ```js
  // 自定义指令 全局
  app.directive('focus', {
    mounted: (el) => el.focus()
  })
  v-focus
  ```

- 局部注册

  ```js
  const vFocus = {
    mounted(el, binding) {
      el.focus()
        console.log(bunding.value) // '123'
    },
      update(el, binding) { // 值变后
          // 相关操作
      }
  }
  
  v-focus = '123'
  ```

  

# 24. 插槽

- 默认插槽

  父组件

  ```vue
  <Child>
      <P> 我是数据 </p>
  </Child>
  ```

  子组件

  ```vue
  <slot>我是默认内容 </slot>
  ```

- 具名插槽

  父组件

  ```vue
  <Child>
      // 或者v-slot:hreder
  <template #header> <P> 我是数据 </p> </template>
  <template #footer> <P> 我是数据 </p> </template>
  </Child>
  ```

  子组件

  ```vue
  <slot namme='header'>我是默认内容 </slot>
  <slot namme='footer'>我是默认内容 </slot>
  ```

- 插槽传参语法

  - 作用域插槽

    子组件传

    ```vue
    <slot namme='header' :content="数据">我是默认内容 </slot>
    ```

    父组件接受  -- 接受的是一个对象

    ```vue
    // 默认插槽
    <template #header #default='obj'> 
    <P> 我是数据 </p> 
    </template>
    obj={
    content: 数据
    }
    // 具名插槽
    <template #header='obj'> 
    <P> 我是数据 </p> 
    </template>
    ```

# 25. 路由

- 下载

  ```
  yarn add vue-router
  ```

- 写路由表

- > createRouter({})

  ```js
  
  import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router'
  const Layout = () => import('../views/layout/index.vue')
  const Content = () => import('../views/layout/content/index.vue')
  const My = () => import('../views/my/index.vue')
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        component: Layout,
        children: [
          {
            path: '/',
            component: Content
          }
        ]
      },
        {
        path: '/my',
        component: My
      }
    ]
  })
  export default router
  ```

- 安装注册 main.js

  ```js
  import router from './router'
  app.use(router)
  ```

- 配置路由出口

  ```js
  <router-view />
  ```

## 1. 路由跳转

- router-link

  ```vue
  <router-link to="地址"></router-link>
  ```

- 动态跳转 useRouter

  ```js
  const router = useRouter()
  router.push('路径')
  router.replace('路径')// 不可返回
  ```

## 2. 传参

- Query

  单个参数

  ```js
  // 传
  router.push('路径?id=123')
  // 接
  const route = useRoute()
  route.query.id
  ```

  对象

  ```js
  // 传
  route.push(
  {
      path: '/路径',
      query: {id: 123, name: 'z'}
  })
  // 接
  const route = useRoute()
  router.query
  ```

- Params 参数

  要在路由表里配

  ```js
  {
        path: '/my/:id?/:name',
        component: My
   }
  ```

  ```js
  router.push('/my/1/小')  // 传
  const route = useRoute()
  router.params.id // 1
  ```

- 对象

  ```js
  // 传
  route.push(
  {
      name: '路径',
      params: {id: 123, name: 'z'}
  })
  // 接
  const route = useRoute()
  router.params
  ```

## 3. 前置导航守卫

```js
// 前置导航守卫
// 不写return 或者 return true 是方放行
// return false 或 return '/login' // 不放行， 到指定页

router.beforeEach((to) => {
  const userStore = useUserStore()
  if(!userStore.token && to.path !== '/login') return '/login'
})

```

# 26 ref 和reactive 响应式数据

- reactive 

  > 接收**对象类型数据**  返回响应数据

  ```js
  import { reactive } from 'vue'
  let unm  = reactive({
      count: 1000
  })
  
  {{ unm.count }}
  ```

- ref

  > 传入简单类型  返回响应式数据
  >
  > 原有数据类型包了一层对象  底层也是用 reactive 实现响应式

  ```js
  import { ref } from 'vue'
  
  let num = ref(123)
  num.vue // js 中
  {{ num }}  //模板中
  ```

  

# 27. Pinia 状态管理工具

[开始 | Pinia](https://pinia.vuejs.org/zh/getting-started.html)

[vue3 状态管理之 Pinia 的选项式（options API）和组合式 API 的使用方式_pinia 组合式api-CSDN博客](https://blog.csdn.net/weixin_45046532/article/details/137463700)

- 安装

  ```
  yarn add pinia
  ```

- ##### 选项式写法

  ```js
  import { defineStore } from 'pinia'
  
  interface ICount {
    count: number
  }
  
  export const useCounterStore = defineStore('count', {
    state: () => ({ count: 0, name: 'Eduardo' }),
    getters: {
      double: (state) =>  state.count * 2
    },
    actions: {
      increment() {
        this.count++
      },
    },
  })
  
  ```

  - 用

    ```vue
    <template>
      <el-button @click="countAdd">{{ count }}</el-button>
      <p>doubleCount: {{ doubleCount }}</p>
    </template>
    
    <script setup lang="ts">
    import { useCounterStore } from '@/store/modules/count'
    
    const counterStore = useCounterStore()
    // vite.config.ts 自动导入 Vue 相关函数
    const count = computed(() => counterStore.count)
    const doubleCount = computed(() => counterStore.double)
    const countAdd = () => {
      counterStore.increment()
    }
    </script>
    
    ```

    

- 组合式写法

  ```js
  import { defineStore } from 'pinia'
  export const useUserStore = defineStore('big-user',() => {
    // state
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 移除
    const removeToken = () => {
      token.value = ''
    }
  
    // 用户信息
    const user = ref({})
    // 发送请求
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    // 设置用户信息
    const setUser = (obj) => {
      user.value = obj
    }
    // getters
    const sum = computed(() => count.value + 1)
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },{
    persist: true // 是否存到本地
  })
  ```

- 在同一模块导出

  ```js
  import { createPinia } from 'pinia'
  import persist from 'pinia-plugin-persistedstate' // 存到本地
  
  const pinia = createPinia()
  pinia.use(persist)
  
  export default pinia
  
  // import { useUserStore } from './modules/user'
  // export { useUserStore}
  export * from './modules/user'
  
  ```

- 在main 中注册

  ```js
  app.use(pinia)
  ```

- 组件中使用

  ```js
  import { useUserStore } from '@/stores';
  const userStort = useUserStore()
  // 属性 
  userStort.token
  // 方法
  userStort.setToken()
  // getters方法
  userStort.sum
  ```

  

# 第三方库的使用

## 1. Apache ECharts  图表库

一个基于 JavaScript 的开源可视化图表库

[Apache ECharts](https://echarts.apache.org/zh/index.html)

## 2. vant-ui

[介绍 - Vant 4](https://vant-ui.github.io/vant/#/zh-CN/home)

- 全部导入

![](.\image3\16.png)

- 按需引入




# 拖动属性

#### 给商品添加拖拽

```vue
<div v-for="good in goods" :key="good.name" class="good" draggable @dragstart="handleDragGood($event, good)">
```

`boolean` 类型的属性可以简写，当值为 `true` 时只需要写属性名就能生效。

拖拽事件选择 `dragstart`，题目给的第一个事件 `drag` 只要在拖的状态中就会一直生效，`dragstart` 只会在开始时生效一次。`dragend` 也一样，两个都能用。

`dragstart` 事件的第一个参数要写成 `$event` 才能传入对应的事件对象，这是 Vue 的一个特殊事件对象。

> 也可以写成 `event`。

#### 商品拖拽方法

```js
handleDragGood(e, item) {
    e.dataTransfer.setData("good", JSON.stringify(item));
}
```

根据题目给出的提示可以知道，用拖拽事件对象的 `dataTransfer` 属性可以在拖拽链中传递数据。需要特别注意的是，该属性的值只能是 `string` 类型，所以需要使用 `JSON` 进行转换。

#### 给购物车图标添加拖拽接收

```vue
<div id="trolley" class="trolley" @dragover.prevent @drop="handleDropToTrolley">
```

根据题目给出的提示可以知道，元素定义放置事件后，就是 `可释放` 的目标。而 `drop` 时间是触发频率最低的一个事件，所以选择 `drop` 来接收拖拽的商品。注意要给 `dragover` 事件加上 `禁用默认行为`。

#### 购物车接收拖拽方法

```javascript
handleDropToTrolley(e) {
    const good = JSON.parse(e.dataTransfer.getData("good"));
    this.bought.push(good);
}
```

从拖拽事件对象中取得拖拽的商品后加入 `bought` 数组中。





# 本地代理-配置跨域问题

- 本地代理

  > 解决访问多服务器
  >
  > 解决跨域问题  CORS报错

## 同源策略

> 浏览器为了确保 前端网页安全策略

> 协议，ip地址域名 端口号必须相同



- 请求方式解决

  - jsonp 只可解决 原来是get的 接口

- 前端结局

  > 本地代理
  >
  > vit 

  ```js
  // vite.config.js
  
  server: {
      proxy: {
      '/api': { // 接口前缀
      target: 'http://8.137.157.16:9002', // 目标接口的域名
      changeOrigin: true, // 是否允许跨域
          ws:true // 支持websoket 接口跨域  实时拉去后端数据
      rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  }
  
  // 基地址
  const request = axios.create({
    baseURL: '/api',
    timeout: 10000
  })
  
  ```

  

- 后端解决
- 运维解决
