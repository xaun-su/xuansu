---
title: Immutable 笔记
date: 2025-4-20
categories:
  - 前端
tags:  
  - react
  - immutable
createTime: 2025/04/20 14:15:12
permalink: /article/afeferw/
---

# Immutable 学习文档

## 一.**概念**:

Immutable数据就是一旦创建，就不能更改的数据。每当对Immutable对象进行修改的时候，就会返回一个新的Immutable对象，以此来保证数据的不可变。
不可变数据让纯函数更强大，也让程序开发愈发简单明了，同时使类似于惰性求值的函数式编程成为可能

代码示例

```js
// 1. 导入 immutable.js 中需要使用的部分
import { Map, List, fromJS } from 'immutable';

// 2. 假设我们有一个常规的 JavaScript 对象作为初始状态 (这是可变的)
const initialMutableState = {
  user: {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'dark',
      notifications: true,
    },
  },
  items: [
    { id: 101, name: 'Laptop', price: 1200 },
    { id: 102, name: 'Mouse', price: 25 },
  ],
  isLoading: false,
};

console.log('初始可变状态:', initialMutableState);

// --- 对比：可变操作 (会修改原始对象) ---
console.log('\n--- 可变操作 (修改原始对象) ---');
const mutableStateCopy = initialMutableState; // 这不是深拷贝，只是引用
mutableStateCopy.user.settings.theme = 'light';
mutableStateCopy.items.push({ id: 103, name: 'Keyboard', price: 75 });
console.log('可变操作后的状态:', initialMutableState); // 注意：initialMutableState 已经被修改了！
console.log('mutableStateCopy === initialMutableState:', mutableStateCopy === initialMutableState); // true - 它们是同一个对象

// 为了演示不可变操作，我们重新创建一个初始状态
const initialMutableStateAgain = {
  user: {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'dark',
      notifications: true,
    },
  },
  items: [
    { id: 101, name: 'Laptop', price: 1200 },
    { id: 102, name: 'Mouse', price: 25 },
  ],
  isLoading: false,
};


// --- 不可变操作 ---
console.log('\n--- 不可变操作 (返回新实例) ---');

// 3. 将常规 JavaScript 对象转换为 Immutable Map
// fromJS 会递归地将嵌套的对象转换为 Map，数组转换为 List
const immutableState = fromJS(initialMutableStateAgain);

// 使用 toJS() 将 Immutable 结构转换回常规 JavaScript 对象以便打印查看
console.log('初始不可变状态:', immutableState.toJS());

// 4. 执行一个简单的更新 (例如，改变 isLoading 的值)
// `set` 方法不会修改原始 immutableState，而是返回一个新的 Immutable Map
const stateAfterLoading = immutableState.set('isLoading', true);

console.log('\n设置 isLoading 为 true 后的状态:');
console.log('原始状态 (未改变):', immutableState.toJS()); // 原始状态的 isLoading 仍然是 false
console.log('新状态:', stateAfterLoading.toJS());
console.log('immutableState === stateAfterLoading:', immutableState === stateAfterLoading); // false - 它们是不同的对象引用

// 5. 执行一个嵌套的更新 (例如，改变用户主题)
// `updateIn` 方法用于处理嵌套结构的更新
// 它接受一个键的数组（表示路径），以及一个更新函数
const stateAfterThemeChange = stateAfterLoading.updateIn(
  ['user', 'settings', 'theme'], // 路径：state => user => settings => theme
  () => 'light' // 更新函数：这里直接返回新值 'light'
);

console.log('\n改变用户主题后的状态:');
console.log('原始状态 (未改变):', stateAfterLoading.toJS()); // 原始状态的主题仍然是 dark
console.log('新状态:', stateAfterThemeChange.toJS());
console.log('stateAfterLoading === stateAfterThemeChange:', stateAfterLoading === stateAfterThemeChange); // false

// 6. 执行一个列表操作 (例如，向 items 列表中添加一个新项)
// 同样可以使用 `updateIn` 结合 Immutable List 的方法 (如 `push`)
const stateAfterAddItem = stateAfterThemeChange.updateIn(
  ['items'], // 路径：state => items (items 是一个 Immutable List)
  list => list.push(fromJS({ id: 103, name: 'Keyboard', price: 75 })) // 更新函数：对 List 调用 push，push 返回一个新的 List
);
// 或者，你也可以先获取 List，操作后再 set 回去：
// const currentItems = stateAfterThemeChange.get('items');
// const newItems = currentItems.push(fromJS({ id: 103, name: 'Keyboard', price: 75 }));
// const stateAfterAddItem = stateAfterThemeChange.set('items', newItems);
// 通常 updateIn 对于嵌套更新更简洁。

console.log('\n添加新项后的状态:');
console.log('原始状态 (未改变):', stateAfterThemeChange.toJS()); // 原始状态 items 只有两项
console.log('新状态:', stateAfterAddItem.toJS()); // 新状态 items 有三项
console.log('stateAfterThemeChange === stateAfterAddItem:', stateAfterThemeChange === stateAfterAddItem); // false

// 7. 访问 Immutable 数据
// 使用 `get` 或 `getIn` 方法访问数据
const userName = stateAfterAddItem.getIn(['user', 'name']);
const firstItemName = stateAfterAddItem.getIn(['items', 0, 'name']);
console.log('\n访问数据:');
console.log('用户名:', userName);
console.log('第一个项目名称:', firstItemName);

// 8. 比较 Immutable 状态
// 由于不可变操作返回新实例，你可以通过比较引用 (===) 来快速判断数据是否发生了变化
console.log('\n比较状态:');
console.log('immutableState === stateAfterAddItem:', immutableState === stateAfterAddItem); // false - 整个状态对象不同

// 结构共享示例：如果只改变了部分数据，未改变的部分会共享内存引用
const stateAfterAnotherLoading = stateAfterAddItem.set('isLoading', false);
console.log('\n结构共享示例:');
// 尽管 stateAfterAddItem 和 stateAfterAnotherLoading 是不同的对象，
// 但它们未被修改的部分（例如 'user'）可能指向同一个内部 Immutable 对象
console.log('stateAfterAddItem.get("user") === stateAfterAnotherLoading.get("user"):', stateAfterAddItem.get('user') === stateAfterAnotherLoading.get('user')); // true - 'user' 部分没有被修改，引用相同

// 9. 需要时，将 Immutable 结构转换回常规 JavaScript 对象
const finalMutableState = stateAfterAddItem.toJS();
console.log('\n最终状态转换回常规 JS 对象:');
console.log(finalMutableState);

```

## 二.API

### 1.fromJS() 完全将一个js对象转化为不可变的map和list



