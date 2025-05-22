---
title: wangeditor富文本组件+大文件分片上传(秒传,断点续传,分片上穿)
date: 2025-5-18
categories:
  - 后端
  - 前端
tags:  
  - wangeditor
  - node.js
createTime: 2025/05/18 14:15:12
permalink: /article/afcjdf/
---

# wangeditor-富文本组件

官网:[安装 | wangEditor](https://www.wangeditor.com/v5/installation.html)

1.安装

安装 editor

```bash
yarn add @wangeditor/editor
# 或者 npm install @wangeditor/editor --save
```

安装 React 组件(可选)

```bash
yarn add @wangeditor/editor-for-react
# 或者 npm install @wangeditor/editor-for-react --save
```

安装 Vue2 组件(可选)

```bash
yarn add @wangeditor/editor-for-vue
# 或者 npm install @wangeditor/editor-for-vue --save
```

安装 Vue3 组件(可选)

```bash
yarn add @wangeditor/editor-for-vue@next
# 或者 npm install @wangeditor/editor-for-vue@next --save
```

## react版本的基本使用

```js
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>{html}</div>
    </>
  )
}

export default MyEditor
```



# 大文件分片上传

## 一.前端-react+ts

## 1.使用spark-md5生成文件的hash值

```js
//安装命令
npm i spark-md5
```

计算文件的 MD5 哈希值

```js
  /**
   * 计算文件的 MD5 哈希值
   * 使用分片读取的方式，避免大文件一次性加载到内存
   * @param file - 要计算哈希的文件对象
   * @returns Promise<string> - 包含文件 MD5 哈希值的 Promise
   */
  const calculateFileHash = (file: File): Promise<string> => {
    // 返回一个 Promise，因为文件读取是异步操作
    return new Promise((resolve, reject) => {
      // 创建 SparkMD5 实例，用于累积计算文件哈希
      const spark = new SparkMD5.ArrayBuffer();
      // 创建 FileReader 实例，用于异步读取文件内容
      const fileReader = new FileReader();
      // 定义分片大小，与上传时使用的 CHUNK_SIZE 保持一致
      const chunkSize = CHUNK_SIZE;
      // 计算文件总共需要分成多少个分片
      const chunks = Math.ceil(file.size / chunkSize);
      // 记录当前正在处理（读取）的分片索引
      let currentChunk = 0;

      // 文件分片读取成功时的回调函数
      fileReader.onload = (e) => {
        // 将读取到的 ArrayBuffer 数据追加到 SparkMD5 实例中
        // e.target?.result 是读取到的文件数据，类型为 ArrayBuffer
        spark.append(e.target?.result as ArrayBuffer);
        // 增加已处理的分片计数
        currentChunk++;

        // 如果还有未读取的分片，则继续读取下一片
        if (currentChunk < chunks) {
          loadNext();
        } else {
          // 如果所有分片都已读取完毕，则计算最终的 MD5 哈希值
          // spark.end() 返回最终的哈希字符串
          resolve(spark.end());
        }
      };

      // 文件读取发生错误时的回调函数
      fileReader.onerror = () => {
        console.error('Error reading file for hash calculation:', fileReader.error);
        // 拒绝 Promise，并传递错误信息
        reject('上传文件错误');
      };

      // 定义一个函数来读取下一个分片
      const loadNext = () => {
        // 计算当前分片的起始字节位置
        const start = currentChunk * chunkSize;
        // 计算当前分片的结束字节位置 (确保不超过文件总大小)
        const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        // 使用 file.slice() 获取文件的一个分片 Blob
        // 使用 fileReader.readAsArrayBuffer() 异步读取这个分片的内容为 ArrayBuffer
        fileReader.readAsArrayBuffer(file.slice(start, end));
      };

      // 开始读取第一个分片，触发整个读取和计算流程
      loadNext();
    });
  };

```

## 2.文件上传

```js
 /**
   * 将文件分片上传到服务器，支持秒传和断点续传。
   * @param file - 要上传的文件对象。
   * @param fileHash - 文件的 MD5 哈希值。
   * @param insertFn - 编辑器提供的插入函数，用于在文件上传成功后将文件（图片/视频）插入到编辑器中。
   */
  const uploadFileInChunks = async (file: File, fileHash: string, insertFn: (url: string, alt?: string, href?: string) => void) => {
    // 获取文件大小
    const fileSize = file.size;
    // 计算文件总共需要分成多少个分片
    const chunks = Math.ceil(fileSize / CHUNK_SIZE);
    // 初始化一个数组，用于存储已经上传成功的分片索引
    const uploadedChunks: number[] = [];
```

### 2.1.检查文件是否已存在或部分上传 (秒传/断点续传检查)

```js
 // 1. 检查文件是否已存在或部分上传 (秒传/断点续传检查)
    try {
      console.log(`检查文件状态: hash=${fileHash}, filename=${file.name}`);
      // 向后端发送 GET 请求，检查文件是否已存在或部分上传
      const checkResponse = await fetch(`http://localhost:9999/upload/check?hash=${fileHash}&filename=${encodeURIComponent(file.name)}`, {
        method: 'GET',
      });
      // 解析后端返回的 JSON 数据
      const checkResult = await checkResponse.json();

      // 检查后端返回的状态码
      if (checkResult.code === 0) {
        // 如果后端指示文件已完全上传 (秒传)
        if (checkResult.data.uploaded) {
          console.log('文件已秒传:', checkResult.data.url);
          // 直接调用编辑器的插入函数，将已存在的文件的 URL 插入到编辑器中
          insertFn(checkResult.data.url, file.name, ''); // 对于图片，alt 和 href 可以根据需要设置
          // 将上传进度设置为 100%
          setUploadProgress(100);
          // 结束上传流程
          return;
        } else {
          // 如果文件未完全上传，但有部分分片已上传 (断点续传)
          console.log('文件部分上传，继续上传。已上传分片:', checkResult.data.uploadedChunks);
          // 将后端返回的已上传分片索引添加到 uploadedChunks 数组中
          uploadedChunks.push(...checkResult.data.uploadedChunks);
        }
      } else {
        // 如果文件检查失败 (后端返回非 0 的 code)
        console.error('文件检查失败:', checkResult.massage);
        // 此时仍然可以尝试从头上传，不做特殊处理
      }
    } catch (error) {
      // 如果文件检查请求本身发生错误 (网络问题等)
      console.error('文件检查请求出错:', error);
      // 此时也可以尝试从头上传，不做特殊处理
    }

```

### 2.2*上传未完成的分片* 

```js
  // 2. 上传未完成的分片
    // 创建一个数组，用于存储每个分片上传的 Promise 对象
    const uploadPromises: Promise<void>[] = [];
    // 初始化已完成的分片数量，考虑断点续传已上传的分片
    let uploadedCount = uploadedChunks.length;
    // 计算需要上传的分片数量
    const totalChunksToUpload = chunks - uploadedChunks.length;

    // 定义一个函数来更新总上传进度
    const updateOverallProgress = () => {
      // 计算总上传进度百分比
      const progress = Math.floor((uploadedCount / chunks) * 100);
      // 更新状态中的上传进度
      setUploadProgress(progress);
      console.log(`总上传进度: ${progress}%,未上传分片:${totalChunksToUpload}`);
    };

    // 初始进度，考虑到已上传的分片
    updateOverallProgress();

    // 遍历所有分片
    for (let i = 0; i < chunks; i++) {
      // 如果当前分片已经在已上传列表中，则跳过此次循环，不上传该分片
      if (uploadedChunks.includes(i)) {
        continue;
      }

      // 计算当前分片的起始和结束字节位置
      const start = i * CHUNK_SIZE;
      const end = ((start + CHUNK_SIZE) >= fileSize) ? fileSize : start + CHUNK_SIZE;
      // 从文件中切出当前分片的数据 (Blob 对象)
      const chunk = file.slice(start, end);

      // 创建 FormData 对象，用于构建分片上传的请求体
      const formData = new FormData();
      formData.append('fileHash', fileHash); // 添加文件哈希
      formData.append('chunkIndex', i.toString()); // 添加当前分片索引
      formData.append('totalChunks', chunks.toString()); // 添加总分片数
      formData.append('filename', file.name); // 添加文件名
      formData.append('fileSize', fileSize.toString()); // 添加文件总大小
      formData.append('chunk', chunk); // 添加分片数据本身 (Blob)

      // 使用 Promise 包裹 XMLHttpRequest 请求，以便使用 Promise.all 管理并行上传
      const uploadPromise = new Promise<void>((resolve, reject) => {
        // 创建 XMLHttpRequest 实例
        const xhr = new XMLHttpRequest();
        // 配置 POST 请求，指定上传分片的 URL
        xhr.open('POST', 'http://localhost:9999/upload/chunk', true);

        // 监听上传进度事件（可选，用于显示单个分片进度，这里主要依赖总进度）
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            // console.log(`分片 ${i} 进度: ${percentComplete}%`); // 可以打印单个分片进度
          }
        };

        // 监听请求完成事件 (无论成功或失败)
        xhr.onload = () => {
          // 检查 HTTP 状态码是否为 200 (表示请求成功到达服务器并处理)
          if (xhr.status === 200) {
            try {
              // 解析后端返回的 JSON 数据
              const result = JSON.parse(xhr.responseText);
              // 检查后端返回的业务逻辑状态码
              if (result.code === 0) {
                console.log(`分片 ${i} 上传成功`);
                // 增加已成功上传的分片计数
                uploadedCount++;
                // 更新总上传进度
                updateOverallProgress();
                // 标记此 Promise 成功完成
                resolve();
              } else {
                // 如果后端返回非 0 的 code，表示业务逻辑错误
                console.error(`分片 ${i} 上传失败:`, result.massage);
                // 可以实现重试逻辑
                // 标记此 Promise 失败，并传递错误信息
                reject(`分片 ${i} 上传失败: ${result.massage}`);
              }
            } catch (e) {
               // 解析 JSON 失败
               console.error(`分片 ${i} 响应解析失败:`, e);
               reject(`分片 ${i} 响应解析失败`);
            }
          } else {
            // 如果 HTTP 状态码不是 200，表示请求失败
            console.error(`分片 ${i} 上传请求失败: HTTP状态码 ${xhr.status}`);
            // 可以实现重试逻辑
            // 标记此 Promise 失败
            reject(`分片 ${i} 上传请求失败: HTTP状态码 ${xhr.status}`);
          }
        };

        // 监听网络错误事件
        xhr.onerror = (err) => {
          console.error(`分片 ${i} 上传出错:`, err);
          // 可以实现重试逻辑
          // 标记此 Promise 失败
          reject(`分片 ${i} 上传出错`);
        };

        // 监听上传超时事件
        xhr.ontimeout = () => {
          console.error(`分片 ${i} 上传超时`);
          // 标记此 Promise 失败
          reject(`分片 ${i} 上传超时`);
        };

        // 发送 FormData 请求
        xhr.send(formData);
      });

      // 将当前分片上传的 Promise 添加到数组中
      uploadPromises.push(uploadPromise);
    }
```

### 2.3等待所有分片上传完成

```js
	// 3. 等待所有分片上传完成
    try {
      // 使用 Promise.all 等待 uploadPromises 数组中的所有 Promise 都成功完成
      await Promise.all(uploadPromises);
      console.log('所有分片上传完成，通知后端合并。');

```

### 2.4通知后端合并分片

```js
 // 4. 通知后端合并分片
      // 向后端发送 POST 请求，通知合并分片
      const mergeResponse = await fetch('http://localhost:9999/upload/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 指定请求体类型为 JSON
        },
        // 将合并所需的数据转换为 JSON 字符串作为请求体
        body: JSON.stringify({
          fileHash: fileHash, // 文件哈希
          filename: file.name, // 文件名
          totalChunks: chunks, // 总分片数
        }),
      });

      // 解析后端返回的 JSON 数据
      const mergeResult = await mergeResponse.json();

      // 检查后端返回的业务逻辑状态码和数据
      if (mergeResult.code === 0 && mergeResult.data) {
        console.log('文件合并成功，最终 URL:', mergeResult.data);
        // 调用编辑器的插入函数，将合并后的文件的最终 URL 插入到编辑器中
        insertFn(mergeResult.data, file.name, ''); // 对于图片，alt 和 href 可以根据需要设置
        // 将上传进度设置为 100%
        setUploadProgress(100);
      } else {
        // 如果合并失败
        console.error('文件合并失败:', mergeResult.massage);
        // 弹出提示框告知用户合并失败
        alert(`文件合并失败: ${mergeResult.massage || '未知错误'}`);
        // 将进度重置为 0
        setUploadProgress(0);
      }

    } catch (error) {
      // 如果在分片上传或合并过程中发生任何错误 (Promise.all 中的某个 Promise 失败，或合并请求失败)
      console.error('分片上传或合并过程中发生错误:', error);
      // 弹出提示框告知用户上传或合并过程中发生错误
      alert('文件上传或合并过程中发生错误，请重试。');
      // 将进度重置为 0
      setUploadProgress(0);
    }
  };
```

## 二.后端-node.js+express+Multer

## 1.使用spark-md5生成文件的hash值

```js
//安装命令
npm i spark-md5
```

## 2.大文件分片上传相关接口

### 2.1定义文件存储路径

```js

// 定义文件存储路径
const UPLOAD_DIR = path.join(__dirname, '../public/uploads'); // 最终文件存储目录
const TEMP_CHUNK_DIR = path.join(__dirname, '../public/temp/chunks'); // 临时分片存储目录
const FILE_MAP_PATH = path.join(__dirname, '../fileMap.json'); // 文件哈希与最终路径的映射文件 

// 确保上传目录和临时目录存在
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_CHUNK_DIR)) {
    fs.mkdirSync(TEMP_CHUNK_DIR, { recursive: true });
}
```

### 2.2 加载文件哈希映射和保存

```js
let fileMap = {};
if (fs.existsSync(FILE_MAP_PATH)) {
    try {
        fileMap = JSON.parse(fs.readFileSync(FILE_MAP_PATH, 'utf-8'));
        console.log('Loaded file map:', fileMap);
    } catch (e) {
        console.error('Error loading file map:', e);
        fileMap = {}; // 加载失败则初始化为空对象
    }
}

// 保存文件哈希映射
const saveFileMap = () => {
    fs.writeFileSync(FILE_MAP_PATH, JSON.stringify(fileMap, null, 2));
};
```

### 2.3Multer 配置用于接收单个分片

```js

const chunkStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 分片存储在临时目录下的以文件哈希命名的子目录中
        const fileHash = req.body.fileHash;
        if (!fileHash) {
            return cb(new Error('未找到文件哈希'));
        }
        const chunkDir = path.join(TEMP_CHUNK_DIR, fileHash);
        // 确保分片目录存在
        if (!fs.existsSync(chunkDir)) {
            fs.mkdirSync(chunkDir, { recursive: true });
        }
        cb(null, chunkDir);
    },
    filename: function (req, file, cb) {
        // 分片文件名就是其序号
        const chunkIndex = req.body.chunkIndex;
         if (chunkIndex === undefined) {
            return cb(new Error(' 未找到分片序号'));
        }
        cb(null, chunkIndex.toString());
    }
});

const uploadChunk = multer({
    storage: chunkStorage,
    limits: {
         fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: function (req, file, cb) {
        // 可以根据需要添加文件类型校验，但通常在接收分片时不强制校验类型
        // 最终文件的类型校验可以在合并时进行，或者依赖前端的校验
        cb(null, true); // 允许所有文件类型作为分片
    }
}).single('chunk'); // 接收名为 'chunk' 的文件字段
```

### 2.4检查文件是否存在或已上传的分片

```js
router.get('/upload/check', (req, res) => {
    const fileHash = req.query.hash;
    const filename = req.query.filename; // 前端传递的文件名，用于查找映射
    console.log(`Checking file: hash=${fileHash}, filename=${filename}`);

    if (!fileHash) {
        return res.status(400).json({ code: 1, massage: 'Missing file hash' });
    }

    // 1. 检查最终文件是否已存在 (秒传)
    // 从映射中查找文件哈希对应的最终文件路径
    if (fileMap[fileHash]) {
         const finalFilePath = path.join(UPLOAD_DIR, fileMap[fileHash].filename); // 从映射中获取保存的文件名
         // 双重确认文件确实存在
         if (fs.existsSync(finalFilePath)) {
             console.log(`File exists (instant upload): ${finalFilePath}`);
             // 返回最终文件的可访问 URL
             const fileUrl = `/uploads/${fileMap[fileHash].filename}`; // 根据你的静态服务配置调整 URL 格式
             return res.json({
                 code: 0,
                 massage: '文件已存在，秒传成功',
                 data: {
                     uploaded: true,
                     url: `http://127.0.0.1:9999${fileUrl}` // 返回完整 URL
                 }
             });
         } else {
             console.warn(`File map entry found for ${fileHash}, but file ${finalFilePath} does not exist. Removing map entry.`);
             delete fileMap[fileHash]; // 清理无效的映射
             saveFileMap();
         }
    }


    // 2. 检查临时目录中已上传的分片 (断点续传)
    const chunkDir = path.join(TEMP_CHUNK_DIR, fileHash);
    const uploadedChunks= [];

    if (fs.existsSync(chunkDir)) {
        const files = fs.readdirSync(chunkDir);
        files.forEach(file => {
            const chunkIndex = parseInt(file, 10);
            // 确保是有效的数字文件名
            if (!isNaN(chunkIndex)) {
                uploadedChunks.push(chunkIndex);
            }
        });
        console.log(`找到文件chunks for ${fileHash}: ${uploadedChunks}`);
    } else {
        console.log(`没有找到hash ${fileHash}`);
    }

    // 返回已上传的分片列表
    res.json({
        code: 0,
        massage: '文件未完全上传',
        data: {
            uploaded: false,
            uploadedChunks: uploadedChunks
        }
    });
});
```

### 2.5接收文件分片

```js
router.post('/upload/chunk', (req, res) => {
    uploadChunk(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer error uploading chunk:', err);
            return res.status(400).json({ code: 1, massage: `分片上传失败: ${err.message}` });
        } else if (err) {
            console.error('Unknown error uploading chunk:', err);
             return res.status(500).json({ code: 1, massage: `分片上传失败: ${err.message}` });
        }

        // Multer 成功处理后，文件信息在 req.file
        if (!req.file) {
             console.error('Chunk file not received by multer.');
            return res.status(400).json({ code: 1, massage: '未接收到文件分片' });
        }

        // req.body 中包含其他字段
        const { fileHash, chunkIndex, totalChunks, filename, fileSize } = req.body;

        if (!fileHash || chunkIndex === undefined || totalChunks === undefined || !filename || fileSize === undefined) {
             // 清理已接收到的分片文件，因为缺少必要参数
             fs.unlink(req.file.path, (unlinkErr) => {
                 if (unlinkErr) console.error('Error deleting incomplete chunk file:', unlinkErr);
             });
            console.error('Missing required fields in chunk upload request body.');
            return res.status(400).json({ code: 1, massage: '缺少必要的分片信息' });
        }

        console.log(`Received chunk ${chunkIndex}/${totalChunks} for file ${fileHash}`);

        // 分片已成功保存到临时目录，返回成功响应
        res.json({ code: 0, massage: '分片上传成功' });
    });
});
```

### 2.6合并文件分片

```js
router.post('/upload/merge', async (req, res) => {
    const { fileHash, filename, totalChunks } = req.body;
    console.log(`Merging file: hash=${fileHash}, filename=${filename}, totalChunks=${totalChunks}`);

    if (!fileHash || !filename || totalChunks === undefined) {
        return res.status(400).json({ code: 1, massage: '缺少必要的文件合并信息' });
    }

    const chunkDir = path.join(TEMP_CHUNK_DIR, fileHash);
    const finalFileName = `${fileHash}_${filename}`; // 使用哈希作为前缀避免文件名冲突
    const finalFilePath = path.join(UPLOAD_DIR, finalFileName);

    // 检查所有分片是否存在
    const existingChunks = fs.existsSync(chunkDir) ? fs.readdirSync(chunkDir).length : 0;
    if (existingChunks < totalChunks) {
        console.error(`Missing chunks for merge. Expected ${totalChunks}, found ${existingChunks}.`);
        // 可以选择清理已上传的分片，或者保留等待后续上传
        // 在这个示例中，我们直接返回错误
        return res.status(400).json({ code: 1, massage: `分片数量不完整，无法合并。已找到 ${existingChunks} 个分片，需要 ${totalChunks} 个。` });
    }

    // 检查分片是否按序号命名且数量正确
     const chunkFiles = fs.readdirSync(chunkDir).map(f => parseInt(f, 10)).sort((a, b) => a - b);
     if (chunkFiles.length !== totalChunks || chunkFiles[0] !== 0 || chunkFiles[chunkFiles.length - 1] !== totalChunks - 1) {
         console.error('Chunk files are not sequentially numbered or count is incorrect.');
         return res.status(400).json({ code: 1, massage: '分片文件序号或数量不正确，无法合并。' });
     }


    // 合并分片
    try {
        const writeStream = fs.createWriteStream(finalFilePath);

        for (let i = 0; i < totalChunks; i++) {
            const chunkFilePath = path.join(chunkDir, i.toString());
            const readStream = fs.createReadStream(chunkFilePath);
            // 使用管道流将分片内容写入最终文件
            // 等待当前分片写入完成后再处理下一个分片，避免文件损坏
            await new Promise((resolve, reject) => {
                readStream.pipe(writeStream, { end: false }); // end: false 阻止 writeStream 在 readStream 结束时关闭
                readStream.on('end', resolve);
                readStream.on('error', reject);
            });
             // 可选：合并完一个分片后删除临时分片文件
             fs.unlink(chunkFilePath, (err) => {
                 if (err) console.error(`Error deleting chunk file ${chunkFilePath}:`, err);
             });
        }
        // 所有分片写入完成后，关闭主写入流
        writeStream.end();

        // 等待 writeStream 真正关闭
        await new Promise((resolve, reject) => {
             writeStream.on('finish', resolve);
             writeStream.on('error', reject);
        });
        console.log(`File merged successfully: ${finalFilePath}`);
        // 清理临时分片目录
        fs.rmdir(chunkDir, { recursive: true }, (err) => {
            if (err) console.error(`Error deleting chunk directory ${chunkDir}:`, err);
            else console.log(`Chunk directory cleaned: ${chunkDir}`);
        });

        // 更新文件哈希映射
        fileMap[fileHash] = {
            filename: finalFileName, // 保存服务器上实际存储的文件名
            originalFilename: filename,
            uploadTime: new Date().toISOString()
        };
        saveFileMap();
        // 返回最终文件的可访问 URL
        const fileUrl = `/uploads/${finalFileName}`; // 根据你的静态服务配置调整 URL 格式
        res.json({
            code: 0,
            massage: '文件合并成功',
            data: `http://127.0.0.1:9999${fileUrl}` // 返回完整 URL
        });

    } catch (error) {
        console.error('Error merging file:', error);
        // 合并失败，可能需要清理已写入的部分最终文件和临时分片
        // 在这个示例中，我们只返回错误
        res.status(500).json({ code: 1, massage: `文件合并失败: ${error.message}` });
    }
});
```

### 2.7中间件错误抛出 (保留并增强对 Multer 错误的捕获)

```js
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err.message, err.code);
        let message = '文件上传错误';
        if (err.code === 'LIMIT_FILE_SIZE') {
             // 尝试获取限制大小，这里需要知道是哪个 Multer 实例抛出的错误
             // 对于 chunkUpload，限制是 10MB
             const limitMB = 10; // 硬编码或从 multer 配置中获取
             message = `文件大小超出限制 (${limitMB}MB)`;
        } else {
            message = `文件上传错误: ${err.message}`;
        }
        res.status(400).send({
            code: 1,
            massage: message
        });
    } else if (err) {
        console.error('File Upload Error:', err.message);
        res.status(400).send({
            code: 1,
            massage: err.message || '文件上传失败'
        });
    } else {
        next();
    }
});
```

