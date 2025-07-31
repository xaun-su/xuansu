title: echarts使用总结
date: 2025-7-10
categories:

- 前端
  tags:
- echarts
  createTime: 2025/07/10 23:20:57
  permalink: /article/echarts使用总结/

------

## Echarts 使用总结

**Echarts中文网站：** [Apache ECharts](https://echarts.apache.org/zh/index.html)

### 一. HTML / JS 中使用

#### 1. 在 HTML 文件中引入 echarts.js

可以通过 CDN 引入，或者下载 ECharts 文件后本地引入。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ECharts 入门示例</title>
    <!-- 引入 ECharts 文件 (这里使用 CDN) -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
      /* 确保容器有尺寸 */
      #main {
        width: 600px;
        height: 400px;
        border: 1px solid #ccc;
        margin: 50px auto;
      }
    </style>
  </head>
  <body>
    <!-- 2. 创建一个 DOM 节点用于挂载图表 -->
    <div id="main"></div>

    <script type="text/javascript">
      // 3. 在 JS 代码中获取 Dom 节点，创建初始化图表，并将其挂载到节点上

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例',
          left: 'center' // 标题居中
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      // (可选) 监听窗口大小变化，使图表自适应
      window.addEventListener('resize', function() {
        myChart.resize();
      });
    </script>
  </body>
</html>
```



### 二. 在 Vue 3 中使用

在 Vue 3 中，我们通常会创建一个可复用的 ECharts 组件。

#### 1. 安装 ECharts



```bash
npm install echarts
# 或者 yarn add echarts
# 或者 pnpm add echarts
```

#### 2. 创建 ECharts Vue 组件

在 `src/components` 目录下创建一个 `EchartsChart.vue` 文件。

**`src/components/EchartsChart.vue`:**

```vue
<template>
  <div class="echarts-container">
    <!-- ECharts 将在这个 div 中渲染 -->
    <div ref="chartDom" class="chart-instance"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';

// 定义组件的 props，用于接收图表配置
const props = defineProps({
  option: {
    type: Object,
    required: true,
    default: () => ({})
  },
  // 可以添加其他配置，例如主题
  theme: {
    type: [String, Object],
    default: null
  }
});

// 使用 ref 获取 DOM 元素引用
const chartDom = ref(null);
let myChart = null; // 用于存储 ECharts 实例

// 初始化图表
const initChart = () => {
  if (chartDom.value) {
    // 确保在重新初始化前销毁旧实例
    if (myChart) {
      myChart.dispose();
    }
    myChart = echarts.init(chartDom.value, props.theme);
    myChart.setOption(props.option);

    // 监听窗口大小变化，使图表自适应
    window.addEventListener('resize', resizeChart);
  }
};

// 调整图表大小
const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});

// 监听 option 变化，更新图表
watch(
  () => props.option,
  (newOption) => {
    if (myChart) {
      myChart.setOption(newOption);
    }
  },
  { deep: true } // 深度监听 option 对象的内部变化
);

// 监听 theme 变化，重新初始化图表
watch(
  () => props.theme,
  () => {
    initChart(); // 主题变化需要重新初始化
  }
);

// 组件卸载时销毁 ECharts 实例，防止内存泄漏
onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
  }
  window.removeEventListener('resize', resizeChart);
});
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 400px; /* 确保容器有高度，否则图表无法显示 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin: 20px 0;
}

.chart-instance {
  width: 100%;
  height: 100%;
}
</style>
```

#### 3. 在父组件中使用 EchartsChart

例如，在 `src/views/HomeView.vue` 中使用：

```vue
<template>
  <div class="home-page-content">
    <h2>我的 ECharts 图表</h2>
    <EchartsChart :option="chartOption" />

    <el-button @click="updateChartData">更新图表数据</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EchartsChart from '../components/EchartsChart.vue'; // 引入 ECharts 组件

// 定义图表配置项
const chartOption = ref({
  title: {
    text: 'Vue 3 ECharts 示例',
    left: 'center'
  },
  tooltip: {},
  xAxis: {
    data: ['苹果', '香蕉', '橘子', '葡萄', '梨', '西瓜']
  },
  yAxis: {},
  series: [
    {
      name: '产量',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110]
    }
  ]
});

// 示例：更新图表数据的方法
const updateChartData = () => {
  const newQuantities = Array.from({ length: 6 }, () => Math.floor(Math.random() * 200) + 50);
  chartOption.value.series[0].data = newQuantities;
  chartOption.value.title.subtext = `数据更新于 ${new Date().toLocaleTimeString()}`; // 添加副标题
};
</script>

<style scoped>
.home-page-content {
  padding: 20px;
}
</style>
```

展开

### 三. 在 React 中使用

在 React 中，我们同样会创建一个可复用的 ECharts 组件，利用 `useRef` 和 `useEffect` Hooks。

#### 1. 安装 ECharts

```bash
npm install echarts
# 或者 yarn add echarts
# 或者 pnpm add echarts
```

#### 2. 创建 ECharts React 组件

在 `src/components` 目录下创建一个 `EchartsChart.jsx` 文件。

**`src/components/EchartsChart.jsx`:**

```jsx
import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const EchartsChart = ({ option, theme = null, style = {} }) => {
  const chartRef = useRef(null); // 用于获取 DOM 元素引用
  let myChart = null; // 用于存储 ECharts 实例

  // effect 1: 初始化图表和设置基本配置 (只在组件挂载时执行一次)
  useEffect(() => {
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current, theme);
      myChart.setOption(option);

      // 监听窗口大小变化，使图表自适应
      const resizeChart = () => {
        if (myChart) {
          myChart.resize();
        }
      };
      window.addEventListener('resize', resizeChart);

      // 返回清理函数，在组件卸载时执行
      return () => {
        if (myChart) {
          myChart.dispose(); // 销毁 ECharts 实例
        }
        window.removeEventListener('resize', resizeChart);
      };
    }
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行

  // effect 2: 监听 option 变化，更新图表 (当 option 变化时执行)
  useEffect(() => {
    if (myChart) {
      // 如果图表实例已经存在，直接更新 option
      myChart.setOption(option);
    } else if (chartRef.current) {
      // 如果实例不存在（例如，组件首次渲染后），则重新初始化
      // 这种情况通常发生在 option 在组件挂载前就已经可用
      myChart = echarts.init(chartRef.current, theme);
      myChart.setOption(option);
    }
  }, [option, theme]); // 依赖 option 和 theme，当它们变化时更新图表

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px', // 确保容器有高度
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        margin: '20px 0',
        ...style // 允许外部传入额外样式
    s  }}
    ></div>
  );
};

export default EchartsChart;
```

#### 3. 在父组件中使用 EchartsChart

例如，在 `src/App.js` 或其他页面组件中使用：

```jsx
import React, { useState } from 'react';
import EchartsChart from './components/EchartsChart'; // 引入 ECharts 组件

function App() {
  // 定义图表配置项
  const [chartOption, setChartOption] = useState({
    title: {
      text: 'React ECharts 示例',
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {},
    series: [
      {
        name: '访问量',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  });

  // 示例：更新图表数据的方法
  const updateChartData = () => {
    const newVisits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);
    setChartOption(prevOption => ({
      ...prevOption,
      series: [{ ...prevOption.series[0], data: newVisits }],
      title: {
        ...prevOption.title,
        subtext: `数据更新于 ${new Date().toLocaleTimeString()}`
      }
    }));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>欢迎来到 React 应用！</h1>
      <p>这是您的 ECharts 图表示例。</p>

      <EchartsChart option={chartOption} />

      <button onClick={updateChartData} style={{ padding: '10px 20px', fontSize: '16px' }}>
        更新图表数据
      </button>
    </div>
  );
}

export default App;
```

------

**总结要点：**

- **容器尺寸：** 无论是原生 JS、Vue 还是 React，ECharts 都需要一个明确设置了 `width` 和 `height` 的 DOM 容器才能正确渲染。
- 生命周期管理：
  - **初始化：** 在 DOM 元素可用后进行初始化（原生 JS 直接在 `<script>` 标签里，Vue 在 `onMounted`，React 在 `useEffect`）。
  - **更新：** 当图表数据或配置变化时，调用 `myChart.setOption()` 更新图表。在 Vue 中使用 `watch`，在 React 中使用 `useEffect` 依赖项。
  - **销毁：** 在组件卸载时，务必调用 `myChart.dispose()` 来销毁 ECharts 实例，并移除相关的事件监听器（如 `resize`），以防止内存泄漏。
- **响应式：** 监听 `window.resize` 事件，并在回调中调用 `myChart.resize()`，使图表在窗口大小变化时自适应。
- **组件化：** 在 Vue 和 React 等框架中，将 ECharts 封装成独立的组件是最佳实践，可以提高代码复用性和可维护性。



### 四.配置说明

#### 1.图表初始化

在获取的dom节点上初始化图表

```js
 myChart = echarts.init(chartDom.value);
```

#### 2.图表类型配置

配置标题，提示框组件，直角坐标系，图标类型等

**配置图标选项**

```js
myChart.setOption({
  // 图表标题
  title: {
    // ...
  },
  // 提示框组件
  tooltip: {
    // ...
  },
  // 图例组件
  legend: {
    // ...
  },
  // 直角坐标系 X 轴
  xAxis: {
    // ...
  },
  // 直角坐标系 Y 轴
  yAxis: {
    // ...
  },
  // 系列列表（核心数据和图表类型）
  series: [
    {
      // ...
    }
  ],
  // 更多配置项，如：
  // grid: {}, // 直角坐标系网格
  // dataZoom: {}, // 数据区域缩放
  // visualMap: {}, // 视觉映射组件
  // toolbox: {}, // 工具栏
  // ...
});

```

- **图表标题---title**

  用于配置图表的标题和副标题。

  ```JS
  myChart.setOption({
    title: {
      text: '年度销售额报告', // 主标题文本
      subtext: '数据来源：公司内部统计', // 副标题文本
      left: 'center', // 标题水平对齐方式，可选 'left', 'center', 'right'
      top: 'top', // 标题垂直对齐方式，可选 'top', 'middle', 'bottom'
      textStyle: {
        // 主标题文本样式
        color: '#333', // 颜色
        fontSize: 18, // 字号
        fontWeight: 'bold', // 字重
      },
      subtextStyle: {
        // 副标题文本样式
        color: '#666',
        fontSize: 12,
      },
      padding: [5, 0, 0, 0], // 标题内边距，上右下左
      itemGap: 10, // 主副标题之间的间距
    },
  });
  
  ```

- **提示框组件----tooltip     相当于外层的遮蔽层**

  当鼠标悬停在图表元素上时，显示详细信息的浮动框。

  ```JS
  myChart.setOption({
    tooltip: {
      show: true, // 是否显示提示框组件
      trigger: 'axis', // 触发类型：'item'（数据项），'axis'（坐标轴），'none'（不触发）
      axisPointer: {
        // 坐标轴指示器配置
        type: 'shadow', // 指示器类型：'line'（直线），'shadow'（阴影），'cross'（十字准星）
      },
      formatter: function (params) {
        // 提示框内容格式化器
        let res = params[0].name + '<br/>';
        params.forEach((item) => {
          res += `${item.marker} ${item.seriesName}: ${item.value} 万元<br/>`;
        });
        return res;
      },
      backgroundColor: 'rgba(50,50,50,0.7)', // 提示框背景色
      borderColor: '#333', // 提示框边框颜色
      borderWidth: 1, // 提示框边框宽度
      padding: [10, 15], // 提示框内边距
      textStyle: {
        // 提示框文本样式
        color: '#fff',
        fontSize: 14,
      },
    },
  });
  
  ```

- **直角坐标系**

1. **定义图表的 X 轴---xAxis**

   ```JS
   myChart.setOption({
     xAxis: {
       type: 'category', // 坐标轴类型：'category'（类目轴），'value'（数值轴），'time'（时间轴），'log'（对数轴）
       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'], // 类目数据
       name: '商品种类', // 坐标轴名称
       nameLocation: 'end', // 坐标轴名称显示位置，可选 'start', 'middle', 'end'
       axisLabel: {
         // 坐标轴刻度标签
         show: true, // 是否显示
         rotate: 45, // 标签旋转角度，解决标签重叠问题
         interval: 0, // 强制显示所有标签
         formatter: '{value}', // 标签内容格式化
         color: '#666',
         fontSize: 12,
       },
       axisLine: {
         // 坐标轴轴线
         show: true,
         lineStyle: {
           color: '#ccc',
           width: 1,
         },
       },
       axisTick: {
         // 坐标轴刻度
         show: false, // 不显示刻度
       },
       splitLine: {
         // 坐标轴在 grid 区域的分割线
         show: false, // 不显示分割线
       },
       boundaryGap: true, // 类目轴中，数据在类目上的定位，true 为在中间，false 为在刻度线上
     },
   });
   
   ```

2. **定义图表的 Y轴---yAxis**

   ```js
   myChart.setOption({
     yAxis: {
       type: 'value', // 坐标轴类型：通常为 'value' 数值轴
       name: '销量 (件)', // 坐标轴名称
       nameLocation: 'end',
       axisLabel: {
         formatter: '{value} 件', // 标签内容格式化
         color: '#666',
         fontSize: 12,
       },
       axisLine: {
         show: true,
         lineStyle: {
           color: '#ccc',
           width: 1,
         },
       },
       splitLine: {
         // 坐标轴在 grid 区域的分割线
         show: true, // 显示分割线
         lineStyle: {
           type: 'dashed', // 虚线
           color: '#eee',
         },
       },
       min: 0, // Y 轴最小值
       max: 40, // Y 轴最大值
       interval: 10, // Y 轴刻度间隔
     },
   });
   
   ```

- **系列列表----series**

  `series` 是 ECharts 中最核心的配置项，它定义了图表的类型、数据以及每个系列的具体样式和行为。它是一个数组，每个数组项代表一个数据系列。

  ```js
  myChart.setOption({
    series: [
      {
        name: '销量', // 系列名称，会显示在 tooltip 和 legend 中
        type: 'bar', // 图表类型：'bar'（柱状图），'line'（折线图），'pie'（饼图），'scatter'（散点图）等
        data: [5, 20, 36, 10, 10, 20], // 系列数据
        barWidth: '60%', // 柱条宽度，可为百分比或具体像素值
        itemStyle: {
          // 图形样式
          color: '#5470C6', // 柱条颜色
          borderRadius: [5, 5, 0, 0], // 柱条圆角，左上，右上，右下，左下
        },
        label: {
          // 图形上的文本标签
          show: true, // 是否显示标签
          position: 'top', // 标签位置，可选 'top', 'inside', 'bottom' 等
          formatter: '{c} 件', // 标签内容格式化，{c} 表示数据值
          color: '#333',
          fontSize: 12,
        },
        emphasis: {
          // 高亮状态的配置
          itemStyle: {
            color: '#91CC75', // 鼠标悬停时柱条颜色
          },
        },
        // markPoint: { ... }, // 标记点
        // markLine: { ... }, // 标记线
      },
      // 如果有多个系列，可以在这里继续添加
      // {
      //   name: '利润',
      //   type: 'line',
      //   data: [2, 5, 10, 3, 4, 6],
      //   smooth: true, // 平滑曲线
      //   itemStyle: {
      //     color: '#EE6666'
      //   }
      // }
    ],
  });
  
  ```

#### 3.通过resize监听窗口大小变化，以便图表能够自适应(可选)

```js
 window.addEventListener('resize', () => {
            myChart.resize();
        });
```

#### 3+1.组件销毁---在组件卸载时销毁 ECharts 实例，防止内存泄漏s

```js
onUnmounted(() => {
    if (myChart) {
        myChart.dispose();
    }
    // 移除 resize 事件监听器
    window.removeEventListener('resize', () => {
        if (myChart) myChart.resize();
    });
});
```



### 五.常见 ECharts 图表类型配置示例

#### 1. 柱状图 (Bar Chart)

柱状图用于显示离散类别中各项数据的比较。

```javascript
// 示例1: 柱状图配置
myChart.setOption({
  title: {
    text: '各部门年度绩效评分',
    subtext: '数据截止：2024年12月',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis', // 鼠标放到坐标轴上时触发
    axisPointer: {
      type: 'shadow', // 显示阴影指示器
    },
  },
  legend: {
    data: ['评分'],
    bottom: 10, // 图例放在底部
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%', // 留出空间给 legend
    containLabel: true, // 包含坐标轴的刻度标签
  },
  xAxis: {
    type: 'category', // 类目轴
    data: ['研发部', '市场部', '销售部', '运营部', '财务部', '人事部'],
    axisLabel: {
      interval: 0, // 强制显示所有标签
      rotate: 30, // 标签旋转角度
      color: '#666',
    },
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  yAxis: {
    type: 'value', // 数值轴
    name: '平均得分',
    min: 0,
    max: 100,
    interval: 20,
    axisLabel: {
      formatter: '{value} 分',
      color: '#666',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed', // 虚线
        color: '#eee',
      },
    },
  },
  series: [
    {
      name: '评分',
      type: 'bar', // 指定图表类型为柱状图
      data: [85, 92, 78, 88, 75, 80], // 数据
      barWidth: '50%', // 柱条宽度
      itemStyle: {
        // 柱条样式
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          // 渐变色
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
        borderRadius: [5, 5, 0, 0], // 顶部圆角
      },
      label: {
        // 柱条上的文本标签
        show: true, // 显示标签
        position: 'top', // 标签位置
        formatter: '{c}', // 显示数据值
        color: '#333',
        fontSize: 12,
      },
      emphasis: {
        // 鼠标悬停高亮样式
        itemStyle: {
          color: '#23a0f7',
        },
      },
    },
  ],
});
```



#### 2. 折线图 (Line Chart)

折线图用于显示数据随时间或有序类别的变化趋势。

```javascript
// 示例2: 折线图配置
myChart.setOption({
  title: {
    text: '月度用户活跃度趋势',
    subtext: '数据来源：用户行为分析',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis', // 鼠标放到坐标轴上时触发
    formatter: '{b}<br/>{a}: {c} 人', // 格式化提示框内容
  },
  legend: {
    data: ['活跃用户'],
    top: 'bottom', // 图例放在底部
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category', // 类目轴
    boundaryGap: false, // X轴两边不留白
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  yAxis: {
    type: 'value', // 数值轴
    name: '用户数',
    axisLabel: {
      formatter: '{value} 人',
      color: '#666',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#eee',
      },
    },
  },
  series: [
    {
      name: '活跃用户',
      type: 'line', // 指定图表类型为折线图
      data: [120, 132, 101, 134, 90, 230, 210, 250, 220, 280, 260, 300],
      smooth: true, // 平滑曲线
      symbol: 'circle', // 数据点形状
      symbolSize: 8, // 数据点大小
      itemStyle: {
        color: '#5470C6', // 折线颜色
      },
      lineStyle: {
        width: 3, // 线条宽度
      },
      areaStyle: {
        // 区域填充样式 (形成面积图)
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(84,112,198,0.3)' }, // 渐变色起始
          { offset: 1, color: 'rgba(84,112,198,0)' }, // 渐变色结束
        ]),
      },
      markPoint: {
        // 标记点
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        // 标记线
        data: [{ type: 'average', name: '平均值' }],
      },
    },
  ],
});
```



#### 3. 饼图 (Pie Chart)

饼图用于显示各项在总数中所占的比例。

```javascript
// 示例3: 饼图配置
myChart.setOption({
  title: {
    text: '用户地域分布',
    subtext: '数据截止：2024年7月',
    left: 'center',
  },
  tooltip: {
    trigger: 'item', // 鼠标放到数据项上时触发
    formatter: '{a} <br/>{b}: {c} ({d}%)', // {a}: 系列名称, {b}: 数据项名称, {c}: 数据值, {d}: 百分比
  },
  legend: {
    orient: 'vertical', // 垂直布局
    left: 'left', // 靠左显示
    data: ['华东', '华南', '华北', '西南', '西北', '东北'],
  },
  series: [
    {
      name: '访问来源', // 系列名称
      type: 'pie', // 指定图表类型为饼图
      radius: '50%', // 饼图的半径，可以是百分比或具体像素值
      //
      center: ['50%', '60%'], // 饼图的中心（横向，纵向）
      data: [
        { value: 335, name: '华东' },
        { value: 310, name: '华南' },
        { value: 234, name: '华北' },
        { value: 135, name: '西南' },
        { value: 154, name: '西北' },
        { value: 100, name: '东北' },
      ],
      emphasis: {
        // 高亮样式
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        // 标签配置
        show: true,
        formatter: '{b}: {d}%', // 显示名称和百分比
        color: '#333',
        fontSize: 12,
      },
      labelLine: {
        // 标签引导线
        show: true,
        length: 10, // 引导线第一段长度
        length2: 15, // 引导线第二段长度
      },
      // roseType: 'area', // 玫瑰图，可选 'radius' 或 'area'
    },
  ],
});
```

展开

#### 4. 散点图 (Scatter Chart)

散点图用于显示数据点在直角坐标系中的分布，常用于发现数据间的相关性。



```javascript
// 示例4: 散点图配置
myChart.setOption({
  title: {
    text: '产品价格与销量关系',
    subtext: '数据来源：电商平台',
    left: 'center',
  },
  tooltip: {
    trigger: 'item', // 鼠标放到数据项上时触发
    formatter: function (params) {
      return `产品: ${params.name}<br/>价格: ${params.value[0]} 元<br/>销量: ${params.value[1]} 件`;
    },
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'value', // 数值轴
    name: '价格 (元)',
    min: 0,
    max: 100,
    axisLabel: {
      formatter: '{value} 元',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#eee',
      },
    },
  },
  yAxis: {
    type: 'value', // 数值轴
    name: '销量 (件)',
    min: 0,
    max: 500,
    axisLabel: {
      formatter: '{value} 件',
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#eee',
      },
    },
  },
  series: [
    {
      name: '产品',
      type: 'scatter', // 指定图表类型为散点图
      data: [
        // 数据格式通常为 [x值, y值, [可选：其他维度数据]]
        { name: '产品A', value: [10, 300] },
        { name: '产品B', value: [25, 450] },
        { name: '产品C', value: [5, 100] },
        { name: '产品D', value: [60, 200] },
        { name: '产品E', value: [40, 380] },
        { name: '产品F', value: [80, 150] },
        { name: '产品G', value: [30, 400] },
        { name: '产品H', value: [90, 80] },
      ],
      symbolSize: function (data) {
        // 散点大小，可以根据数据值动态设置
        return Math.sqrt(data[1]) * 0.8; // 例如，根据销量决定大小
      },
      itemStyle: {
        color: '#EE6666', // 散点颜色
        opacity: 0.8, // 透明度
      },
      emphasis: {
        itemStyle: {
          borderColor: '#333',
          borderWidth: 2,
        },
      },
    },
  ],
});
```