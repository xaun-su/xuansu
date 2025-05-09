---
title: JavaScript数组方法
date: 2025-5-9
categories:
  - 前端
tags:
  - JavaScript
createTime: 2025/05/9 12:20:57
permalink: /article/1/
---


## JS数组方法总结

目前js的数组方法有25个 分为不修改原数组方法和修改原数组方法



## 一.修改原数组方法

### 1.push()

- **作用：** 在数组末尾添加一个或多个元素。
- **参数：** 要添加的元素。
- **返回值：** 新数组的长度。

```js
const arr = [1, 2];
const newLength = arr.push(3, 4); // arr 现在是 [1, 2, 3, 4]
console.log(newLength); // 4
console.log(arr); // [1, 2, 3, 4] (原数组已变)
```



### 2.pop()

- **作用：** 删除数组末尾的最后一个元素。
- **参数：** 无。
- **返回值：** 被删除的元素。如果数组为空，返回 `undefined`。

```js
const arr = [1, 2, 3];
const lastElement = arr.pop(); // arr 现在是 [1, 2]
console.log(lastElement); // 3
console.log(arr); // [1, 2] (原数组已变)
```



### 3.shift()

- **作用：** 删除数组末尾的第一个元素。
- **参数：** 无。
- **返回值：** 被删除的元素。如果数组为空，返回 `undefined`。

```js
onst arr = [1, 2, 3];
const firstElement = arr.shift(); // arr 现在是 [2, 3]
console.log(firstElement); // 1
console.log(arr); // [2, 3] (原数组已变)
```



### 4.unshift

- **作用：** 在数组开头添加一个或多个元素。
- **参数：** 要添加的元素。
- **返回值：** 新数组的长度。

```js
const arr = [3, 4];
const newLength = arr.unshift(1, 2); // arr 现在是 [1, 2, 3, 4]
console.log(newLength); // 4
console.log(arr); // [1, 2, 3, 4] (原数组已变)
```



### 5.splice

- **作用：** 在数组的指定位置添加、删除或替换数组中的元素。
- **参数：** `start` (操作的起始索引), `deleteCount` (要删除的元素数量), `item1, item2, ...` (要添加的元素)。
- **返回值：** 一个包含被删除元素的新数组。如果没有删除元素，则返回空数组。

```js
const arr = [1, 2, 3, 4, 5];
// 删除元素
const removed = arr.splice(2, 2); // 从索引2开始删除2个元素；arr 现在是 [1, 2, 5]
console.log(removed); // [3, 4]
console.log(arr); // [1, 2, 5] (原数组已变)

// 添加元素
arr.splice(1, 0, 99); // 在索引1处添加99，不删除任何元素；arr 现在是 [1, 99, 2, 5]
console.log(arr); // [1, 99, 2, 5] (原数组已变)

// 替换元素
arr.splice(2, 1, 100); // 从索引2开始删除1个元素，并在该位置添加100；arr 现在是 [1, 99, 100, 5]
console.log(arr); // [1, 99, 100, 5] (原数组已变)

```



### 6.sort()

- **作用：** 对数组元素进行排序。默认按字符串的字典顺序排序。

- 参数： 

  可选的比较函数

  ```
  compareFunction(a, b)
  ```

  。如果省略，元素按转换为字符串后的 Unicode 码位点顺序进行排序。(字母排序可省略,数组排序不可省略)

  - 如果 `compareFunction(a, b)` 返回负值，则 `a` 排在 `b` 前面。
  - 如果返回正值，则 `b` 排在 `a` 前面。

- **返回值：** 排序后的原数组的引用。

```js
const arr1 = ['a', 'z', 'g', 'd', 'f', 'm'];
arr1.sort(); // [a,d,f,g,m,z] (默认排序，但实际是按字符串)
console.log(arr1); // [a,d,f,g,m,z] (原数组已变)

//数字排序必须加比较函数
const arr2 = [1, 10, 2, 21];
arr2.sort(); // [1, 10, 2, 21] -> [1,10,2,21] 
console.log(arr2); // [1, 2, 10, 21] (原数组已变)

// 数字排序需要比较函数
arr2.sort((a, b) => a - b); // 升序 [1, 2, 10, 21]
console.log(arr2); // [1, 2, 10, 21] (原数组已变)
arr2.sort((a, b) => b - a); // 降序 [21, 10, 2, 1]
console.log(arr2); // [21, 10, 2, 1] (原数组已变)

```

### 7.reverse()

- **作用：** 反转数组中元素的顺序。
- **参数：** 无。
- **返回值：** 反转后的原数组的引用。

```js
const arr = [1, 2, 3, 4, 5];
arr.reverse(); // arr 现在是 [5, 4, 3, 2, 1]
console.log(arr); // [5, 4, 3, 2, 1] (原数组已变)
```



### 8.fill()

- **作用：** 用一个固定值填充数组中从起始索引到终止索引（不包含）的全部元素。
- **参数：** `value` (用于填充的值), `start` (可选的起始索引，包含), `end` (可选的结束索引，不包含)。
- **返回值：** 修改后的原数组的引用。

```js
const arr = [1, 2, 3, 4, 5];
arr.fill(0, 2, 4); // 用0填充从索引2到4（不包含）的元素；arr 现在是 [1, 2, 0, 0, 5]
console.log(arr); // [1, 2, 0, 0, 5] (原数组已变)
```



### 9.copyWithin()

- **作用：** 将数组的一部分复制到数组中的另一个位置，覆盖现有元素。
- **参数：** `target` (开始复制到的目标索引), `start` (开始复制的源索引，包含), `end` (可选的结束复制的源索引，不包含)。
- **返回值：** 修改后的原数组的引用。

```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // 将从索引3开始（即元素4, 5）复制到索引0开始的位置；arr 现在是 [4, 5, 3, 4, 5]
console.log(arr); // [4, 5, 3, 4, 5] (原数组已变)
```



## 二.不修改原数组方法

### 1.concat

- **作用：** 合并两个或多个数组。
- **返回值：** 一个新数组，包含原数组和被合并数组的所有元素。

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const newArr = arr1.concat(arr2, [5, 6]); // [1, 2, 3, 4, 5, 6]
console.log(arr1); // [1, 2] (原数组未变)
```



### 2.slice()

- **作用：** 提取数组的一部分，创建一个新数组。
- **参数：** `start` (起始索引，包含), `end` (结束索引，不包含)。如果省略 `end`，则提取到数组末尾。如果省略 `start` 和 `end`，则复制整个数组。
- **返回值：** 一个包含提取元素的新数组。

```js
const arr = [1, 2, 3, 4, 5];
const slicedArr = arr.slice(1, 4); // [2, 3, 4]
const copiedArr = arr.slice(); // [1, 2, 3, 4, 5] (浅拷贝)
console.log(arr); // [1, 2, 3, 4, 5] (原数组未变)
```



### 3.map()

- **作用：** 遍历数组，对每个元素执行一个函数，然后将结果组成一个新的数组。

- **参数：** 一个回调函数，该函数接受三个参数：当前元素的值、当前元素的索引、原数组本身。

- **返回值：** 一个新数组，包含回调函数对原数组每个元素处理后的结果。

  ```javascript
  const arr = [1, 2, 3];
  const doubledArr = arr.map(item => item * 2); // [2, 4, 6]
  console.log(arr); // [1, 2, 3] (原数组未变)
  ```



### 4.filter()

- **作用：** 遍历数组，根据指定条件过滤元素，返回一个只包含符合条件元素的新数组。

- **参数：** 一个回调函数，该函数接受三个参数：当前元素的值、当前元素的索引、原数组本身。回调函数应返回 `true` 或 `false`。

- **返回值：** 一个新数组，包含回调函数返回 `true` 的所有元素。

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  const evenArr = arr.filter(item => item % 2 === 0); // [2, 4]
  console.log(arr); // [1, 2, 3, 4, 5] (原数组未变)
  ```



### 5.reduce()

- **作用：** 遍历累加数组，将所有元素“缩减”为一个单一的值（可以是数字、字符串、对象等）。

- **参数：** 一个回调函数（累加器函数）和一个可选的初始值。累加器函数接受四个参数：累加器（上一次回调的返回值或初始值）、当前值、当前索引、原数组。

- **返回值：** 累加器最终的值。

  ```javascript
  const arr = [1, 2, 3, 4];
  const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // 10 (初始值为0)
  const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 5); // 10 (初始值为15)
  const product = arr.reduce((accumulator, currentValue) => accumulator * currentValue); // 24 (没有初始值，使用第一个元素作为初始值)
  console.log(arr); // [1, 2, 3, 4] (原数组未变)
  ```



### 6.reduceRight()

- **作用：** 类似于 `reduce()`，但从数组的末尾开始向前处理。
- **返回值：** 累加器最终的值。



### 7.forEach()

- **作用：** 遍历数组，对每个元素执行一个函数。主要用于执行副作用（如打印、修改外部变量等），而不是创建新数组。

- **参数：** 一个回调函数，接受三个参数：当前元素的值、当前元素的索引、原数组本身。

- **返回值：** `undefined`。

  ```javascript
  const arr = [1, 2, 3];
  arr.forEach(item => console.log(item)); // 依次打印 1, 2, 3
  console.log(arr); // [1, 2, 3] (原数组未变)
  ```



### 8.every()

- **作用：** 检查数组中的**所有元素是否都满足**指定条件。

- **参数：** 一个回调函数，该函数应返回 `true` 或 `false`。

- **返回值：** 如果所有元素都满足条件则返回 `true`，否则返回 `false`。

  ```javascript
  const arr = [2, 4, 6];
  const allEven = arr.every(item => item % 2 === 0); // true
  console.log(arr); // [2, 4, 6] (原数组未变)
  ```

### 9.some()

- **作用：** 检查数组中是否有**至少一个元素满足**指定条件。

- **参数：** 一个回调函数，该函数应返回 `true` 或 `false`。

- **返回值：** 如果有至少一个元素满足条件则返回 `true`，否则返回 `false`。

  ```javascript
  const arr = [1, 3, 5, 6];
  const hasEven = arr.some(item => item % 2 === 0); // true
  console.log(arr); // [1, 3, 5, 6] (原数组未变)
  ```



### 10.find()

- **作用：** 返回数组中**第一个满足**测试函数的元素的值。

- **参数：** 一个回调函数，该函数应返回 `true` 或 `false`。

- **返回值：** 第一个满足条件的元素的值。如果找不到，返回 `undefined`。

  ```javascript
  const arr = [1, 5, 8, 130, 44];
  const found = arr.find(item => item > 10); // 130
  const notFound = arr.find(item => item > 200); // undefined
  console.log(arr); // [1, 5, 8, 130, 44] (原数组未变)
  ```



### 11.findIndex()

- **作用：** 返回数组中**第一个满足**测试函数的元素的**索引**。

- **参数：** 一个回调函数，该函数应返回 `true` 或 `false`。

- **返回值：** 第一个满足条件的元素的索引。如果找不到，返回 -1。

  ```javascript
  const arr = [1, 5, 8, 130, 44];
  const index = arr.findIndex(item => item > 10); // 3
  const notFoundIndex = arr.findIndex(item => item > 200); // -1
  console.log(arr); // [1, 5, 8, 130, 44] (原数组未变)
  ```



### 12.indexOf()

- **作用：** 返回指定元素在数组中**第一次出现**的索引。

- **参数：** 要查找的元素，可选的起始查找索引。

- **返回值：** 元素的索引。如果找不到，返回 -1。

  ```javascript
  const arr = [1, 2, 3, 2, 5];
  const index = arr.indexOf(2); // 1
  const indexFrom = arr.indexOf(2, 2); // 3 (从索引2开始查找)
  const notFound = arr.indexOf(6); // -1
  console.log(arr); // [1, 2, 3, 2, 5] (原数组未变)
  ```



### 13.lastIndexOf()

- **作用：** 返回指定元素在数组中**最后一次出现**的索引。

- **参数：** 要查找的元素，可选的起始查找索引（从后向前查找）。

- **返回值：** 元素的索引。如果找不到，返回 -1。

  ```javascript
  const arr = [1, 2, 3, 2, 5];
  const lastIndex = arr.lastIndexOf(2); // 3
  console.log(arr); // [1, 2, 3, 2, 5] (原数组未变)
  ```



### 14.includes()

- **作用：** 检查数组是否包含指定元素。

- **参数：** 要查找的元素，可选的起始查找索引。

- **返回值：** 如果包含则返回 `true`，否则返回 `false`。

  ```javascript
  const arr = [1, 2, 3];
  const hasTwo = arr.includes(2); // true
  const hasFour = arr.includes(4); // false
  console.log(arr); // [1, 2, 3] (原数组未变)
  ```



### 15.join()

- **作用：** 将数组的所有元素连接成一个字符串。

- **参数：** 可选的分隔符字符串。如果省略，默认使用逗号 `,`。

- **返回值：** 连接后的字符串。

  ```javascript
  const arr = ['apple', 'banana', 'orange'];
  const str1 = arr.join(); // "apple,banana,orange"
  const str2 = arr.join('-'); // "apple-banana-orange"
  console.log(arr); // ['apple', 'banana', 'orange'] (原数组未变)
  ```



### 16.toString()

- **作用：** 将数组转换为一个字符串，元素之间用逗号分隔。类似于 `join(',')`。

- **返回值：** 转换后的字符串。

  ```javascript
  const arr = [1, 2, 3];
  const str = arr.toString(); // "1,2,3"
  console.log(arr); // [1, 2, 3] (原数组未变)
  ```
