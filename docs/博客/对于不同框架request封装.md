---
title: 基于axios对不同框架进行request封装
date: 2025-9-2
categories:
  - 前端
tags:  
  - axios
createTime: 2025/09/2 14:15:12
permalink: /article/基于axios对不同框架进行request封装/
---



# 基于axios不同框架的request.js封装

## 1.vue3+element puls

```js
import axios, { AxiosInstance } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import qs from 'qs';
 
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'multipart/form-data' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});
 
// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		if (Session.get('token')) {
			config.headers!['Authorization'] = `DavyJonesZ ${Session.get('token')}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);
 
// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
 
		if (res.code && res.code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401 || res.code === 4001) {
				Session.clear(); // 清除浏览器全部临时缓存
				window.location.href = '/'; // 去登录页
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => { })
					.catch(() => { });
				return Promise.reject(service.interceptors.response);
			} else {
 
				return res;
			}
 
		} else {
 
			return res;
		}
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);
 
// 导出 axios 实例
export default service;
```

## 2.react+antd

```js
import axios from 'axios'; 
import { message } from 'antd';
import { baseURL } from './api/config'; 
import store from './store/store'; 

// 创建一个全局变量来存储 navigate 函数
let globalNavigator = null; 

// 导出设置 navigate 函数的方法
export const setGlobalNavigator = (navigateFn) => { 
  globalNavigator = navigateFn;
};

// 创建axios实例，可以自定义配置
const request = axios.create({
  baseURL, 
  timeout: 10000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => { 
    const token = store.getState().user.token; // 从 Redux store 中获取 token

    if (token) {
      // 确保 config.headers 存在，如果不存在则初始化
      config.headers = {
        ...(config.headers || {}), 
        Authorization: 'Bearer ' + token,
      };
    }

    return config;
  },
  (err) => { 
    console.error('请求错误：', err);
    return Promise.reject(err);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (res) => { 
    // 确保 res.data.code 存在，如果不存在则设置为0
    if (res.data && typeof res.data.code === 'undefined') {
      res.data.code = 0;
    }

    if (res.data.code === 0) { // 假设 code 为 0 表示成功
      return res;
    } else {
      message.error(res.data.msg || '服务器异常');
      return Promise.reject(res.data);
    }
  },
  (err) => { 
    // 在这里使用 globalNavigator
    const currentPath = window.location.pathname + window.location.search;

    if (err.response?.status === 401) {
      message.warning('登录已过期，请重新登录');
      if (globalNavigator) {
        // 使用全局的 navigate 函数进行跳转
        globalNavigator(`/login?redirect=${encodeURIComponent(currentPath)}`);
      } else {
        // 如果 globalNavigator 未设置
        console.warn('globalNavigator not set, falling back to window.location.href');
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
      return Promise.reject(err); // 返回拒绝的 Promise，避免后续逻辑继续执行
    } else {
      // 处理其他类型的错误
      message.error(err.response?.data?.msg || '服务器异常');
      console.error('响应错误：', err);
      return Promise.reject(err);
    }
  }
);

// 导出 axios 实例
export default request;

```



## 3.uniapp+vue3+uvui

```js
import baseURL from './base.js'; // 导入接口前缀地址

// 全局请求计数器（避免多次请求导致loading频繁闪烁）
// let requestCount = 0;

export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		// 显示加载状态（只在第一个请求时显示）
		// if (requestCount === 0 && options.showLoading !== false) {

		// }
		// requestCount++;
		// const match = options.url.match(/(.*)\/\d+$/);
		// if (!match) {
		// 	uni.showLoading({
		// 		title: '加载中...',
		// 	})
		// };
		uni.request({
			url: baseURL + options.url, // 接口地址
			method: options.method || 'GET', // 请求方法
			data: options.data || {}, // 请求参数
			timeout: options.timeout || 10000, // 添加超时设置
			header: { // 修正为header（注意拼写）
				'Authorization': uni.getStorageSync('token'),
				...options.header // 允许自定义header覆盖[6](@ref)
			},
			success: (res) => {
				// uni.hideLoading();
				// 统一响应处理
				if (res.data.code === 1030) {
					uni.navigateTo({
						url: '/pages/login/login'
					}); // token过期跳转登录
					return reject(new Error('登录状态已过期'));
				}

				if (res.data.code >= 200 && res.data.code < 300) {
					resolve(res.data);
				} else {
					
					const errMsg = res.data?.message || `请求失败(${res.statusCode})`;
				
					uni.showToast({
						title: errMsg,
						icon: 'none'
					}); // 错误提示
					reject(new Error(errMsg));
				}
			},
			fail: (err) => {
		
				uni.showToast({
					title: '网络连接失败',
					icon: 'none'
				});
				reject(err);
			},
			complete: () => {
				// 关闭加载状态（最后一个请求完成时关闭）
				// uni.hideLoading();
			}
		});
	});
};
```

## 4.taro+react

### interceptors.js 

```js
import Taro from '@tarojs/taro';

const customInterceptor = chain => {
  // let datacenter_img_base_url = process.env.COWA_DATACENTER; // 移除或注释掉这一行

  // ## 请求发出前处理
  const requestParams = chain.requestParams;
  const { url } = requestParams;
  // 确保在 chain.proceed() 之前修改 requestParams
  requestParams.header = {
    ...requestParams.header,
    // TODO: 将这里的 '' 替换为实际获取 Token 的逻辑，例如从 Taro.getStorageSync 获取
    Token: '', // 将token添加到头部
  };


  // ## 请求后处理响应
  return chain.proceed(requestParams).then(res => {
    console.log(res?.statusCode);
    // 根据你的需求，决定是返回完整响应对象还是只返回数据
    // return res; // 返回完整响应对象
    return res?.data; // 只返回数据
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
```

### reques.js

```js
import Taro from '@tarojs/taro'; 
import interceptors from './interceptors'; // 引入之前定义的请求拦截器数组

// 定义获取基础 URL 的函数
// 它接收请求的路径（例如 '/user/good'）作为参数
const getBaseUrl = (url) => {
  // 你的假设的基地址
  const BASE_API_URL = 'api';
  // 将基地址和请求路径拼接起来
  // 为了防止出现重复的斜杠或缺少斜杠，可以进行一些处理
  // 这里简单地拼接，假设 url 已经是以 '/' 开头
  return `${BASE_API_URL}${url}`;

  // 如果需要更严谨的处理，可以这样做：
  // const baseUrl = BASE_API_URL.endsWith('/') ? BASE_API_URL.slice(0, -1) : BASE_API_URL;
  // const endpoint = url.startsWith('/') ? url.slice(1) : url;
  // return `${baseUrl}/${endpoint}`;
};


// 添加拦截器到 Taro 的请求链中
// 这样在每次调用 Taro.request 发起请求时，都会先经过这些拦截器处理
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

// 定义一个 httpRequest 类，用于封装各种 HTTP 请求方法 (GET, POST, PUT, DELETE)
class httpRequest {
  /**
   * 基础请求方法，供其他 HTTP 方法调用
   * @param {object} params - 请求参数对象
   * @param {string} params.url - 请求的 URL 路径 (例如 '/user/good')
   * @param {any} params.data - 请求的数据
   * @param {object} params.header - 请求头对象
   * @param {string} [method='GET'] - 请求方法，默认为 GET
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回 Taro.request 的 Promise 对象
   */
  baseOptions(params, method = 'GET') {
    // 从传入的参数对象中解构出 url, data, header
    let { url, data, header } = params;
    // 调用 getBaseUrl 函数获取完整的请求基础 URL
    // getBaseUrl 会将基地址和传入的 url 路径拼接
    const FULL_REQUEST_URL = getBaseUrl(url);
    // 设置默认的 content-type 为 application/json
    let contentType = 'application/json';
    // 如果 header 中指定了 content-type，则使用 header 中的值，否则使用默认值
    contentType = header && header['content-type'] ? header['content-type'] : contentType;

    // 注意：以下逻辑根据原始代码保留，它检查如果 content-type 不是 application/json，
    // 就尝试使用 data 对象中的 data 属性作为实际的数据。
    // 这个逻辑可能需要根据实际后端接口的数据结构进行调整。
    if (
      contentType!=='application/json'
    ) {
      // 如果 content-type 不是 application/json，则使用 data.data 作为请求体
      data = data.data;
    }

    // 构造 Taro.request 方法所需的选项对象
    const option = {
      url: FULL_REQUEST_URL, // 请求的完整 URL (例如 'http://1.1.1.1:9899/user/good')
      data: data, // 请求发送的数据
      method: method, // 请求方法 (GET, POST, PUT, DELETE 等)
      header: { // 请求头
        'content-type': contentType, // 设置 content-type
        // ## token已在拦截器中实现
        'Authorization': Taro.getStorageSync('Authorization') // 原始代码中注释掉了在这里添加 Token 的方式，因为已在拦截器中处理
      },
    };

    // 发起 Taro 网络请求并返回 Promise 对象
    return Taro.request(option);
  }

  /**
   * 封装 GET 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {string | object} [data=''] - 请求的数据 (通常 GET 请求数据放在 url 参数中，这里作为可选参数)
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  get(url, data = '', header = {}) {
    let option = { url, data, header };
    // 调用基础方法发起 GET 请求
    return this.baseOptions(option);
  }

  /**
   * 封装 POST 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {any} data - 请求的数据 (通常 POST 请求数据放在请求体中)
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  post(url, data, header = {}) {
    let params = { url, data, header };
    // 调用基础方法发起 POST 请求，并指定方法为 'POST'
    return this.baseOptions(params, 'POST');
  }

  /**
   * 封装 PUT 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {any} data - 请求的数据
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  put(url, data, header = {}) {
    let option = { url, data, header };
    // 调用基础方法发起 PUT 请求，并指定方法为 'PUT'
    return this.baseOptions(option, 'PUT');
  }

  /**
   * 封装 DELETE 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {string | object} [data=''] - 请求的数据
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  delete(url, data = '', header = {}) {
    let option = { url, data, header };
    return this.baseOptions(option, 'DELETE');
  }
}

// 导出 httpRequest 类的一个实例，以便可以直接调用其方法发起请求
export default new httpRequest();
```

