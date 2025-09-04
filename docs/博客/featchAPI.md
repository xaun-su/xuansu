---
title: featch API
date: 2025-9-4
categories:
  - 前端
tags:
  - 前端
  - featch
createTime: 2025/09/04 10:00:00
permalink: /article/featchAPI/
---

## `fetch` API 

### 1. 什么是 `fetch`？

- **定义:** `fetch` 是一个现代的、基于 **Promise** 的 JavaScript API，用于在浏览器中发起网络请求（HTTP 请求）。
- **目的:** 替代老旧的 `XMLHttpRequest` (XHR)，提供更简洁、更强大的请求方式。
- 特点:
  - **Promise-based:** 返回 Promise，易于处理异步操作。
  - **流式处理:** 响应体数据以流的形式处理，按需获取。
  - **浏览器原生支持:** 现代浏览器普遍支持。
  - **处理跨域请求** 

### 2. `fetch` 的基本用法 (GET 请求)

```javascript
// 1. 发起请求
fetch('https://api.example.com/data')
  // 2. 处理响应头 (获取 Response 对象)
  .then(response => {
    // 检查 HTTP 状态码是否成功 (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // 将响应体解析为 JSON (返回另一个 Promise)
    return response.json();
  })
  // 3. 处理解析后的数据
  .then(data => {
    console.log('获取到的数据:', data);
  })
  .then(response => response.json()) // 解析 JSON 数据
  // 4. 捕获任何错误 
  .catch(error => {
    console.error('请求失败:', error);
  });
```

**关键点:**

- `fetch(url)`: 发起 GET 请求。
- `response.ok`: 布尔值，判断请求是否成功（HTTP 状态码 200-299）。
- `response.json()`: 将响应体解析为 JSON 对象（常用）。还有 `response.text()`, `response.blob()` 等。
- `.catch()`: 捕获网络错误或 `then` 链中抛出的错误。

### 3. `fetch` 的配置选项 (POST/PUT/DELETE 请求)

`fetch` 的第二个参数是一个配置对象，用于自定义请求。



```javascript
const url = 'https://api.example.com/posts';
const postData = { title: 'Hello Fetch', body: 'This is a test post.' };

fetch(url, {
  method: 'POST', // 请求方法：'GET', 'POST', 'PUT', 'DELETE', 'PATCH'
  headers: {
    'Content-Type': 'application/json', // 告诉服务器请求体是 JSON
    // 'Authorization': 'Bearer YOUR_TOKEN' // 认证信息
  },
  body: JSON.stringify(postData), // 请求体：将 JS 对象转为 JSON 字符串---------发送表单数据
  // credentials: 'include', // 是否发送 cookies (同源/跨域)
  // mode: 'cors', // 请求模式 (默认 'cors')
  // signal: abortController.signal // 用于中止请求
})
  .then(response => { /* ... 同上 ... */ }) 
  .then(data => { console.log('操作成功:', data); })
  .catch(error => { console.error('操作失败:', error); });
```

**常用配置项:**

- **`method`**: HTTP 方法（`'GET'`, `'POST'`, `'PUT'`, `'DELETE'` 等）。
- **`headers`**: 设置请求头对象（`'Content-Type'`, `'Authorization'` 等）。
- **`body`**: 请求体数据。对于 JSON，使用 `JSON.stringify(yourObject)`。
- **`credentials`**: `omit` (默认，不发送 cookies), `same-origin` (同源发送), `include` (始终发送---发送带凭据的请求)。
- **`mode`**: `cors` (默认), `no-cors`, `same-origin`。
- **`signal`**: 用于取消请求（配合 `AbortController`）。
-  **`body`**: `formData`    发送表单数据

### 4. `Response` 对象

`fetch` Promise 解析后的对象，包含请求的元数据。

- **`response.ok`**: `true` (200-299 状态码) 或 `false` (其他状态码)。
- **`response.status`**: HTTP 状态码 (e.g., 200, 404, 500)。
- **`response.statusText`**: HTTP 状态消息 (e.g., "OK", "Not Found")。
- **`response.headers`**: `Headers` 对象，包含所有响应头。
- 数据解析方法 (都返回 Promise):
  - `response.json()`: 解析为 JSON 对象。
  - `response.text()`: 解析为字符串。
  - `response.blob()`: 解析为 Blob 对象 (用于文件)。
  - `response.arrayBuffer()`: 解析为 ArrayBuffer。

### 5. `async/await` 与 `fetch`

使用 `async/await` 让异步代码看起来更像同步代码，提高可读性。



```javascript
async function fetchDataAsync() {
  const url = 'https://api.example.com/data';
  try {
    const response = await fetch(url); // 等待 fetch 完成

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // 等待 JSON 解析完成
    console.log('使用 async/await 获取数据:', data);
  } catch (error) {
    console.error('使用 async/await 请求失败:', error);
  }
}

fetchDataAsync();
```

**关键点:**

- `async` 函数内部可以使用 `await`。
- `await` 会暂停函数执行，直到 Promise 解析。
- `try...catch` 用于捕获 `await` 表达式可能抛出的错误。

### 6. `fetch` 的注意事项

- **错误处理:** `fetch` 只在**网络错误**时才 `reject` Promise。对于 4xx/5xx 等服务器响应错误，Promise 仍然会 `resolve`，需要手动检查 `response.ok` 或 `response.status`。
- **无内置超时:** `fetch` 没有内置的超时选项。需要通过 `AbortController` 或 Promise 竞态实现。
- **跨域 (CORS):** 默认遵循同源策略。跨域请求需要服务器配置 CORS 头部。
- **Cookies:** 默认不发送 cookies。需要设置 `credentials: 'same-origin'` 或 `'include'`。
- **请求体格式:** 发送 JSON 数据时，务必使用 `JSON.stringify()` 转换数据，并设置 `Content-Type: 'application/json'` 头部。