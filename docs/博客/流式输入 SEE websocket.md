---
title: 通讯方式-流式输入、see与websocket的实现
date: 2025-9-16
categories:
  - 前端
tags:  
  - sse
  - websocket
createTime: 2025/09/16 14:15:12
permalink: /article/通讯方式-see与websocket的实现/
---


## 流式输出  sse与websocket的区别

### 一.流式输出 (sse和 [featch](./featch流式响应数据.md))

流式输出直观的展示：使用ai大模型工具时的问答效果（类似于打字机效果）

- 流式输出:流式输出是指数据生成的内容是逐步、逐块返回的，而不是等到整个生成过程完成后再一次性返回所有内容。
  - 优点：
    - **提升用户体验:** 用户可以更早地开始看到部分结果，感知到系统正在工作，提高即时性和交互性。
    - **降低内存占用:** 对于长时间生成任务，可以减少内存占用，因为不需要一次性存储完整的输出。
    - **更适合实时应用:** 能够更好地支持实时反馈和渐进式渲染。
  - **应用场景**：适用于需要即时响应和高交互性的场景，比如智能助手、AI对话、实时日志、股票行情等。
  - **常见实现技术**：Server-Sent Events (SSE), WebSocket, HTTP 长连接等。

### 二.什么是 SSE 和 websocket

`WebSocket` 和 `SSE` 都是用于实现服务器与客户端之间实时双向通信的技术。

`WebSocket` 是**基于独立的 TCP 连接实现**的，使用自定义的协议。客户端和服务器之间可以建立持久的全双工通信的连接，可以双向发送和接收数据。**WebSocket** 协议（ws:// 或 wss://），需要握手升级)是基于帧的，可以通过发送不同类型的帧进行通信。

![image-20250916131758335](C:\Users\chenyt\AppData\Roaming\Typora\typora-user-images\image-20250916131758335.png)

`SSE` 是**基于传统的 HTTP 协议**实现的，采用了长轮询（**long-polling**）机制。客户端通过向服务器发送一个 HTTP 请求，服务器保持连接打开并周期性地向客户端发送数据。**SSE** 通过 **EventSource** 对象来实现，在客户端可以通过监听 **onmessage** 事件来接收服务器端发送的数据。

![image-20250916131838069](C:\Users\chenyt\AppData\Roaming\Typora\typora-user-images\image-20250916131838069.png)

### 三.两者的优缺点

| 特性/因素      | SSE                                                          | WebSockets                                  |
| -------------- | ------------------------------------------------------------ | ------------------------------------------- |
| 协议           | 基于HTTP，使用标准HTTP连接                                   | 单独的协议（ws:// 或 wss://），需要握手升级 |
| 通信方式       | 单向通信（服务器到客户端）                                   | 全双工通信                                  |
| 数据格式       | 文本（UTF-8编码） （对数据格式有一定的规范）                 | 文本或二进制                                |
| 重连机制       | 浏览器自动重连                                               | 需要手动实现重连机制                        |
| 实时性         | 高（适合频繁更新的场景）                                     | 非常高（适合高度交互的实时应用）            |
| 浏览器支持     | 良好（大多数现代浏览器支持）                                 | 非常好（几乎所有现代浏览器支持）            |
| 适用场景       | 实时通知、新闻feed、股票价格等需要从服务器推送到客户端的场景 | 在线游戏、聊天应用、实时交互应用            |
| 复杂性         | 较低，易于实现和维护 简单易用                                | 较高，需要处理连接的建立、维护和断开        |
| 兼容性和可用性 | 基于HTTP，更容易通过各种中间件和防火墙                       | 可能需要配置服务器和网络设备以支持WebSocket |
| 服务器负载     | 适合较低频率的数据更新   对服务器压力小                      | 适合高频率消息和高度交互的场景 服务器压力大 |

### 四.SSE  demo实现

####  1.**http 响应头前置配置：** 

```js
Content-Type: text/event-stream   //服务器实时推送信息到客户端的连接
Cache-Control: no-cache			//保证客户端展示的是最新数据
Connection: keep-alive			//保证 SSE 的持续开启
```

#### 2.服务端代码：node+experss

```js
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('public'));

app.get('/events', function(req, res) {
    //请求头配置
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let startTime = Date.now();

    const sendEvent = () => {
        // 检查是否已经发送了10秒
        if (Date.now() - startTime >= 10000) {
            res.write('event: close\ndata: {}\n\n'); // 发送一个特殊事件通知客户端关闭
            res.end(); // 关闭连接
            return;
        }

        const data = { message: 'Hello World', timestamp: new Date() };
        res.write(`data: ${JSON.stringify(data)}\n\n`);

        // 每隔2秒发送一次消息
        setTimeout(sendEvent, 2000);
    };

    sendEvent();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

```

#### 3.客户端代码

> 1.new EventSource 实例化 EventSource对象 启动SSE服务
>
> 2.onmessage 事件来接收服务器端发送的数据

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>SSE Example</title>
</head>

<body>
    <h1>Server-Sent Events Example</h1>
    <div id="messages"></div>

    <script>
        const evtSource = new EventSource('/events');     //EventSource对象实例化
        const messages = document.getElementById('messages');

        evtSource.onmessage = function(event) {       //onmessage 事件来接收服务器端发送的数据。
            const newElement = document.createElement("p");
            const eventObject = JSON.parse(event.data);
            newElement.textContent = "Message: " + eventObject.message + " at " + eventObject.timestamp;
            messages.appendChild(newElement);
        };
    </script>
</body>
</html>
```

### 五.websocket demo

#### 服务端：

**1.安装ws**

```js
npm install ws
```

**2.知识点：**

1. **`require('ws')`**:导入 `ws` 库，以便创建 WebSocket 服务器。
2. **`new WebSocket.Server({ port: 8080 })`**: 创建一个 WebSocket 服务器实例，并指定它监听的端口。
3. **`wss.on('connection', callback)`**:当有新的客户端连接到 WebSocket 服务器时，会触发 `connection` 事件，并执行 `callback` 函数。`callback` 函数会接收到一个 `ws` (WebSocket) 对象，代表新建立的客户端连接。
4. **`ws.username = '用户X'`**:在 `connection` 事件触发时，为每个新连接的 `ws` 对象动态添加一个 `username` 属性，用于标识该客户端。这是 WebSocket 服务器管理客户端状态的一种常见方式。
5. **`ws.send(message)`**: 向**特定的单个客户端**发送数据。在示例中，用于发送欢迎消息给新连接的客户端。
6. **`ws.on('message', callback)`**:当服务器从**特定客户端**接收到消息时，会触发 `message` 事件，并执行 `callback` 函数。`callback` 函数接收到的 `message` 通常是一个 `Buffer` 对象（在 Node.js 环境中）。
7. **`message.toString()`**: 将从 WebSocket 接收到的 `Buffer` 数据转换为可读的字符串。WebSocket 传输的数据可以是文本或二进制。
8. **`ws.on('close', callback)`**: 当**特定客户端**的 WebSocket 连接关闭时（无论是客户端主动关闭、网络断开还是服务器强制关闭），会触发 `close` 事件。
9. **`ws.on('error', callback)`**:当**特定客户端**的 WebSocket 连接发生错误时，会触发 `error` 事件。
10. **`wss.clients`**: 这是一个 `Set` 集合，包含了所有当前连接到该服务器的 `WebSocket` 客户端实例。
11. **`wss.clients.forEach(client => { ... })`**:遍历所有连接的客户端。这是实现消息广播的关键。
12. **`client.readyState === WebSocket.OPEN`**: `readyState` 属性表示 WebSocket 连接的当前状态。`WebSocket.OPEN` (值为 1) 表示连接已建立并可以进行通信。在广播消息前检查这个状态，可以避免向已关闭或正在关闭的连接发送消息，防止错误。
13. **`broadcast(message)` 函数**:将向所有连接客户端发送消息的逻辑封装起来，提高代码的复用性和可读性。

**3.代码实现：**

```js
// server.js
const WebSocket = require('ws');
// 创建一个 WebSocket 服务器，监听在 8080 端口
const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket 服务器已启动在 ws://localhost:8080');
// 监听客户端连接事件
wss.on('connection', ws => {
  console.log('客户端已连接');

  // 当服务器收到客户端消息时
  ws.on('message', message => {
    // 将 Buffer 转换为字符串（如果消息是文本）
    const msgString = message.toString();
    console.log(`收到客户端消息: ${msgString}`);
    // 向所有连接的客户端广播消息
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // 广播给除了发送者以外的所有客户端
        client.send(`Other client said: ${msgString}`);
      } else if (client === ws && client.readyState === WebSocket.OPEN) {
        // 给发送者一个确认消息
        client.send(`You said: ${msgString}`); 
      }
    });
  });

  // 监听客户端断开连接事件
  ws.on('close', () => {
    console.log('客户端已断开连接');
  });
  // 监听错误事件
  ws.on('error', error => {
    console.error('WebSocket 错误:', error);
  });
  // 当客户端连接成功时，发送一条欢迎消息
  ws.send('Welcome to the WebSocket server!'); 
});

// 监听服务器错误
wss.on('error', error => {
  console.error('WebSocket 服务器错误:', error);
});
console.log('服务器正在运行...');

```



#### 客户端

**知识点：**

1. **`new WebSocket(WS_URL)`**:在浏览器中创建一个 WebSocket 客户端连接。`WS_URL` 必须是 `ws://` 或 `wss://` 开头的地址。
2. **`socket.onopen = (event) => { ... }`**: 当 WebSocket 连接成功建立时触发。
3. **`socket.onmessage = (event) => { ... }`**:当客户端从服务器接收到消息时触发。`event.data` 包含接收到的消息内容（通常是字符串）。
4. **`socket.onclose = (event) => { ... }`**: 当 WebSocket 连接关闭时触发。`event` 对象包含关闭原因和状态码。
5. **`socket.onerror = (error) => { ... }`**:当 WebSocket 连接发生错误时触发。
6. **`socket.send(message)`**:: 向服务器发送数据。
7. **`socket.readyState === WebSocket.OPEN`**:在发送消息前检查连接是否处于打开状态，避免在连接未建立或已关闭时尝试发送消息。
8. **自动重连机制**:
   - **`reconnectAttempts`**: 记录重连次数。
   - **`MAX_RECONNECT_ATTEMPTS`**: 设置最大重连限制。
   - **`RECONNECT_INTERVAL_MS`**: 初始重连间隔。
   - **`Math.pow(2, reconnectAttempts - 1)`**: 实现指数退避，每次重连失败后增加等待时间，减少服务器压力并提高成功率。
   - **`setTimeout(connectWebSocket, delay)`**: 在指定延迟后尝试重新连接。

```js
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket 演示 (带重连)</title>
</head>

<body>
    <div class="container">
        <h1>WebSocket 聊天演示</h1>
        <div id="messages"></div>
        <input type="text" id="messageInput" placeholder="输入消息...">
        <button id="sendButton">发送</button>
    </div>

    <script>
        const messagesDiv = document.getElementById('messages');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        const WS_URL = 'ws://localhost:8080';
        let socket = null;
        let reconnectAttempts = 0;
        const MAX_RECONNECT_ATTEMPTS = 10; // 最大重连尝试次数
        const RECONNECT_INTERVAL_MS = 3000; // 初始重连间隔（毫秒）

        function connectWebSocket() {
            if (socket && socket.readyState === WebSocket.OPEN) {
                console.log('WebSocket 已连接。');
                return;
            }

            appendMessage('reconnect-message', `正在尝试连接 WebSocket 服务器... (尝试 ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`);
            console.log(`正在尝试连接到 ${WS_URL}...`);

            socket = new WebSocket(WS_URL);

            socket.onopen = (event) => {
                console.log('WebSocket 连接已打开:', event);
                appendMessage('server-message', '已连接到 WebSocket 服务器。');
                reconnectAttempts = 0; // 连接成功，重置重连尝试次数
                scrollToBottom();
            };

            socket.onmessage = (event) => {
                console.log('收到服务器消息:', event.data);
                if (event.data.startsWith('Welcome')) {
                    appendMessage('server-message', event.data.replace('Welcome', '欢迎'));
                } else if (event.data.startsWith('You said:')) {
                    appendMessage('user-message', event.data.replace('You said: ', '你发送: '));
                } else if (event.data.startsWith('Other client said:')) {
                    appendMessage('other-client-message', event.data.replace('Other client said: ', '其他客户端: '));
                } else {
                    appendMessage('server-message', event.data); // 默认作为服务器消息
                }
                scrollToBottom();
            };

            socket.onclose = (event) => {
                console.log('WebSocket 连接已关闭:', event);
                appendMessage('server-message', '与 WebSocket 服务器断开连接。');
                scrollToBottom();

                // 尝试重连
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    const delay = RECONNECT_INTERVAL_MS * Math.pow(2, reconnectAttempts - 1); // 指数退避
                    console.log(`将在 ${delay / 1000} 秒后尝试重新连接...`);
                    setTimeout(connectWebSocket, delay);
                } else {
                    appendMessage('reconnect-message', '达到最大重连尝试次数，请手动刷新页面。');
                    console.error('已达到最大重连尝试次数。请刷新页面。');
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket 错误:', error);
                appendMessage('server-message', 'WebSocket 连接发生错误。');
                // 错误发生时，onclose 也会被触发，所以重连逻辑主要在 onclose 中处理
            };
        }

        // 首次连接
        connectWebSocket();

        // 发送消息函数
        const sendMessage = () => {
            const message = messageInput.value.trim();
            if (message && socket && socket.readyState === WebSocket.OPEN) {
                socket.send(message);
                messageInput.value = ''; // 清空输入框
            } else if (message) {
                appendMessage('reconnect-message', 'WebSocket 未连接，无法发送消息。正在尝试重连...');
                console.warn('WebSocket 未连接。消息未发送。');
            }
        };

        // 绑定发送按钮点击事件
        sendButton.addEventListener('click', sendMessage);

        // 绑定回车键发送消息
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        // 将消息添加到显示区域
        function appendMessage(className, text) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', className);
            messageElement.innerHTML = `<p>${text}</p>`;
            messagesDiv.appendChild(messageElement);
        }

        // 滚动到底部
        function scrollToBottom() {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    </script>
</body>

</html>
```

