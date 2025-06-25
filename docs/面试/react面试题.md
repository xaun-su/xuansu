---
title: react使用及原理
createTime: 2025/05/27 21:39:21
permalink: /article/react使用及原理/

tags: 
  - react
  - 面试题
  - 原理
---

## 一、 React 与 Vue 的比较

React和Vue的比较可以从多个维度进行：

**1. 核心理念与设计哲学：**

- **React (A JavaScript library for building user interfaces)：**

  - **更像一个库，而非完整框架**：React主要关注UI的渲染层（View）。它通常需要与其他库（如React Router进行路由管理，Redux/MobX/Zustand等进行状态管理）结合使用，以构建完整的单页应用。这提供了更大的灵活性和选择空间，但也可能带来更高的集成复杂度和决策成本。
  - **函数式编程思想**：React推崇使用纯函数、不可变数据以及单向数据流。组件通常被设计为接收props并返回UI描述（JSX）。
  - **JSX (JavaScript XML)**：React使用JSX来描述UI结构，它允许在JavaScript代码中直接编写类似HTML的标记，提供了强大的编程能力和灵活性。
  - **一切皆组件**：鼓励将UI拆分成独立的、可复用的组件。

- **Vue (The Progressive JavaScript Framework)：**

  - **渐进式框架**：Vue的核心库专注于视图层，但它也提供了一套官方支持的、可选的配套工具和库（如Vue Router, Vuex/Pinia），使得从简单的页面增强到复杂的SPA构建都能平滑过渡。

  - **模板语法 (Templates)**：Vue默认使用基于HTML的模板语法，将DOM与底层Vue实例的数据进行声明式绑定。这对于有HTML/CSS背景的开发者来说通常更容易上手。Vue也支持JSX。

  - **数据驱动视图**：Vue的核心是响应式数据系统。当数据变化时，视图会自动更新。

  - 选项式API (Options API) vs 组合式API (Composition API)

    ：

    - **Options API**（Vue 2主推，Vue 3兼容）：通过`data`, `methods`, `computed`, `watch`, 生命周期钩子等选项来组织组件逻辑。结构清晰，易于理解。
    - **Composition API**（Vue 3主推）：受React Hooks启发，允许开发者根据逻辑功能（而不是选项类型）来组织代码，更利于复杂组件的逻辑复用和代码组织，类型推断也更好。

**2. 核心特性与实现：**

- **数据绑定与响应式原理：**

  - **React**：主要依赖单向数据流。状态（state）是组件私有的，通过props向下传递。当state改变时，组件会重新渲染。React本身不直接提供“双向数据绑定”的便捷语法，需要手动实现（如通过`value`和`onChange`）。其响应式是通过`setState`或Hooks（如`useState`, `useReducer`）显式触发更新，然后通过虚拟DOM和Diff算法进行高效渲染。

  - Vue

    ：

    - **Vue 2**：使用`Object.defineProperty`对数据对象的属性进行getter/setter劫持，来实现响应式。当数据变化时，setter会通知相关的watcher，触发视图更新。
    - **Vue 3**：使用`Proxy`对象来代理整个数据对象，提供了更全面、性能更好的响应式能力（例如，可以直接检测到对象属性的添加和删除，以及数组索引和`length`的修改）。
    - Vue提供了便捷的`v-model`指令来实现表单元素的双向数据绑定。

- **组件化：**

  - **React**：函数组件（配合Hooks）和类组件。组件定义通常是纯JavaScript。
  - **Vue**：单文件组件（SFC - `.vue`文件），将模板、脚本（逻辑）、样式封装在一个文件中，结构清晰，关注点分离。

- **虚拟DOM与Diff算法：**

  - 两者都使用虚拟DOM来提高渲染性能，减少直接操作真实DOM的开销。
  - 它们的Diff算法都基于一些启发式策略，但具体实现细节和优化点可能有所不同。例如，Vue的编译器在编译模板时可以进行更多的静态分析和优化，标记静态节点，从而在Diff时跳过这些节点。React的Fiber架构则更侧重于可中断渲染和并发特性。

- **状态管理：**

  - **React**：自身没有内置全局状态管理方案。社区流行的有Redux (以及其衍生品如Redux Toolkit)、MobX、Zustand、Recoil等。Context API可以用于简单的跨层级状态共享。

  - Vue

    ：

    - **Vuex** (Vue 2和Vue 3早期)：官方的状态管理库，遵循类似Flux的模式。
    - **Pinia** (Vue 3主推)：新一代官方状态管理库，更轻量、更易用，对TypeScript支持更好，更符合组合式API的风格。
    - 对于简单的场景，Vue组件自身的响应式数据和props/events已经足够。

- **路由管理：**

  - **React**：React Router是社区事实上的标准。
  - **Vue**：Vue Router是官方提供的库。

**3. 性能：**

- 两者在大多数应用场景下性能都非常出色。
- 性能瓶颈通常更多地取决于应用本身的实现、数据结构、组件设计以及是否合理利用了框架提供的优化手段（如React的`memo`, `useCallback`, `shouldComponentUpdate`；Vue的`computed`属性，`v-once`, `keep-alive`，以及编译优化）。
- Vue 3由于`Proxy`的引入和编译时优化，在某些方面（如初始渲染、更新）可能比Vue 2有更优的性能表现。React的并发特性旨在改善大型应用在复杂交互下的感知性能。

**4. 生态系统与社区：**

- **React**：拥有非常庞大且活跃的生态系统和社区。由于其库的特性，周边工具和解决方案非常丰富。Facebook（Meta）背书。
- **Vue**：生态系统也在快速发展和壮大，拥有大量高质量的第三方库和工具。由尤雨溪创建并由核心团队和社区共同维护。

**5. 上手难度与开发体验：**

- Vue

  ：

  - 通常被认为上手门槛较低，特别是对于有传统Web开发经验（HTML, CSS, JS）的开发者。其文档清晰易懂，API设计直观。
  - 单文件组件和模板语法使得快速原型开发和小型项目构建非常高效。

- React

  ：

  - 学习曲线可能稍陡峭一些，尤其是JSX和函数式编程思想需要一定的适应过程。
  - 需要对JavaScript本身有更深入的理解。
  - 高度的灵活性也意味着开发者需要做更多的技术选型和配置。

**6. TypeScript支持：**

- 两者都对TypeScript有良好的支持。
- **Vue 3**在设计上对TypeScript更加友好，特别是Composition API能够提供优秀的类型推断。
- **React**与TypeScript的集成也非常成熟，尤其是在使用函数组件和Hooks时。

**如何选择？**

- 项目需求

  ：

  - 如果需要高度的灵活性、庞大的生态支持，并且团队对JavaScript和函数式编程有较深理解，React可能是个好选择。
  - 如果追求快速上手、渐进式集成、官方提供的一体化解决方案，Vue可能更合适。

- **团队经验**：团队成员已有的技术栈和偏好也是重要考虑因素。

- 具体场景

  ：

  - 构建大型、复杂的单页应用，两者都能胜任，但React在招聘和社区资源方面可能略有优势。
  - 对于中小型项目、需要快速迭代或希望平滑地将现有项目部分迁移到现代框架，Vue的渐进式特性和易用性可能更突出。

## 二、Fiber 架构

### **为什么需要新的架构？ (Fiber 之前的挑战)**

- React 15 及更早版本的"栈协调器" (Stack Reconciler) 采用递归方式处理更新。一旦开始，整个渲染过程必须同步完成，无法中断。

- 痛点

  ：

  1. **阻塞主线程**：大型组件树的渲染会长时间占用主线程，导致用户输入、动画等无法及时响应，界面卡顿。
  2. **无法区分优先级**：所有更新都被同等对待，无法优先处理紧急任务。

### Fiber 架构

1. **什么是 Fiber？**

   - **数据结构**：每个 React 元素在内部对应一个 **Fiber 节点**。这些节点通过 `child`、`sibling`、`return` 指针构成一棵 Fiber 树（或链表结构，便于遍历）。
   - **工作单元**：一个 Fiber 节点也代表一个需要处理的工作单元。React 的渲染过程就是处理这些工作单元。
   - **关键信息**：Fiber 节点上存储了组件类型 (`tag`, `type`)、DOM节点 (`stateNode`)、props 和 state (`pendingProps`, `memoizedProps`, `memoizedState`)、副作用标记 (`effectTag` 用于标记需要在Commit阶段执行的副作用类型（如DOM插入、更新、删除，或生命周期调用)、优先级信息 (`lanes` 决定了该Fiber节点上的更新何时被处理) 以及指向旧 Fiber 节点的指针 (`alternate`，用于双缓冲)。

   > fiber的作用就是为每个react元素添加一个flber节点  这些节点包含着该元素的所有信息 在渲染过程中
   >
   > 便于对这些元素或者工作单元进行操作  实现**可中断的增量渲染**和**优先级调度**。

2. **核心目标**：实现**可中断的增量渲染**和**优先级调度**。

3. **双阶段渲染**：Fiber 将渲染过程分为两个主要阶段：

   - 阶段一：Render/Reconciliation (可中断)
     - **任务**：在此阶段，React 会构建新的 Fiber 树（称为 `workInProgress` 树），通过 Diff 算法找出与当前显示的 Fiber 树 (`current` 树) 之间的差异，并标记需要执行的副作用 (DOM 操作、生命周期等)。
     - **特点**：这个阶段的工作可以被分解成小块（每个 Fiber 节点是一个工作单元），可以被**中断**、**恢复**，甚至在某些情况下被**放弃**。此阶段的执行由**调度器 (Scheduler)** 控制。
     - **双缓冲技术**：React 同时维护 `current` 树（已渲染到屏幕的树）和 `workInProgress` 树（正在内存中构建的树）。即使 `workInProgress` 树的构建过程被中断，用户看到的依然是稳定的 `current` 树。
     
     > 可以带入虚拟DOM与真实DOM的比对
   - 阶段二：Commit (不可中断)
     - **任务**：一旦 `workInProgress` 树构建完成，React 进入 Commit 阶段。在此阶段，它会将计算出的所有变更**一次性、同步**地应用到真实 DOM 上，并执行相关的生命周期方法（如 `componentDidMount`, `componentDidUpdate`）和副作用（如 `useEffect` 的回调）。
       - Before Mutation (捕获快照)：执行如getSnapshotBeforeUpdate这类需要在DOM变更前读取DOM状态的生命周期。
       - Mutation (DOM变更)：执行实际的DOM插入、更新、删除操作。
       - Layout (布局与生命周期/Hooks)：DOM变更后，同步执行componentDidMount、componentDidUpdate以及useLayoutEffect的回调。useEffect的回调则是在此之后异步调度的。
     - **特点**：此阶段**必须同步完成，不可中断**，以保证UI的一致性。
   
   ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/30d9226abf864690a87c1fd2aadde8f5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6L-35L2g5LqM6bmP:q75.awebp?rk3s=f64ab15b&x-expires=1749626124&x-signature=I890IZy6BkDy80lSakglGUABSB0%3D)

## **三、调度心脏：React Scheduler (调度器)**

> **React Scheduler (调度器)** 在这个比喻中，就是整个生产线的 **中央控制室** 或 **智能调度系统**。它不直接参与具体的生产（协调或渲染），但它决定了：
>
> 1. **什么时候** 开始生产？
> 2. **生产什么**（哪个任务）？
> 3. **生产多少**（每个任务做多久）？
> 4. **生产顺序**（哪个任务优先级更高）？
> 5. **什么时候暂停** 生产，把资源让给更紧急的事情？
> 6. **什么时候恢复** 生产，从上次暂停的地方继续？

**作用:**Fiber 架构解决了“可中断”的问题（通过将工作拆分成小单元），但 **谁来决定何时中断、何时恢复、以及任务的优先级呢？** 这就是调度器的核心作用。

调度器 (`scheduler`包) 是React并发模式的底层引擎，负责**管理和执行异步任务**，确保高优先级工作（如用户交互）能够及时响应，避免阻塞主线程。

1. **核心目的与职责**：

   - **时间切片 (Time Slicing)**：这是调度器的核心机制。它不会让 React 一次性完成所有工作，而是将工作分解成许多小块（由 Fiber 节点代表），并在每个小块工作完成后，检查当前帧是否还有剩余时间。

     - **帧预算：** 浏览器通常每秒渲染 60 帧（即每帧约 16.6ms）。调度器会利用这个时间预算。
     - **Yielding (让出控制权)：** 在每个工作单元处理完毕后，调度器会检查当前帧是否即将结束。如果时间不足，或者有更高优先级的任务到来，调度器会暂停当前正在进行的协调工作，将控制权交还给浏览器，让浏览器有机会处理用户输入、动画等。
     - **Resume (恢复)：** 当浏览器再次空闲时，调度器会从上次暂停的地方继续执行未完成的任务。

     

   - **优先级调度**：根据任务的紧急程度安排其执行顺序。它不直接定义React应用层面的更新优先级（那是Lanes模型的职责），而是提供一套通用的任务优先级

   > 调度器能够为不同的更新任务分配不同的优先级。常见的优先级包括：
   >
   > - **Immediate (立即)：** 最高优先级，例如用户输入（打字）。
   > - **User Blocking (用户阻塞)：** 较高优先级，例如点击按钮后的反馈。
   > - **Normal (普通)：** 默认优先级，例如数据加载完成后的渲染。
   > - **Low (低)：** 较低优先级，例如不重要的动画或数据预取。
   > - **Idle (空闲)：** 最低优先级，例如在浏览器空闲时执行的后台任务。
   >
   > 当有多个任务等待执行时，调度器会优先执行优先级高的任务。

2. **核心机制**：

   - **任务队列 (Priority Queue)**：内部使用小顶堆（Min Heap）数据结构维护任务。`taskQueue` 存放已到期或立即执行的任务，`timerQueue` 存放需要延迟执行的任务。任务根据其**过期时间 (expirationTime  由Scheduler根据传入的任务优先级和可选的delay计算出来的)** 排序，这个过期时间由任务被调度时的优先级和可选的延迟计算得出。

   > 说白了就是:调度器维护一个或多个任务队列，根据任务的优先级来组织它们。当新的更新请求到来时，它会被添加到相应的优先级队列中。

   - 工作循环 (`workLoop`)

     ：
   
     - 通过宿主环境提供的异步API（如浏览器的 `MessageChannel`，或 `setTimeout` 作为降级方案）来触发。
     - 循环从`taskQueue`中取出当前最高优先级的任务（即过期时间最早的任务）并执行其回调函数。
     - **时间片检查**：在执行任务单元之间，会检查当前帧是否还有剩余时间（例如，React内部配置的`frameYieldMs`，默认为5ms）。如果时间不足，且当前任务不是必须立即完成的（未过期），则会暂停当前任务的执行，让出主线程。

   - 任务的中断与恢复

     ：
   
     - 当任务回调被设计为可中断时（如React的Render阶段的`performUnitOfWork`），如果它因为时间片用尽而被中断，它可以返回一个新的函数，代表剩余的工作。
     - 调度器会将这个“剩余工作”作为原任务的延续，重新放入任务队列中，等待下一次调度机会。

------

## **四、React 内部的优先级细化：Lanes 模型**

Lanes模型是React **内部用于表示和管理更新优先级**的核心机制，为并发特性提供了更精细和灵活的控制。

1. **引入背景**：
- 传统的单一过期时间难以优雅处理并发场景下多种不同来源、不同重要性的更新，特别是需要中断和恢复的场景。Lanes模型通过位操作提供了更强大的优先级表达能力。
2. **核心概念**：

   - **位的集合 (Bitmask)**：Lanes是一个31位的二进制数，每一位（或一组位）代表一个“车道 (Lane)”，对应一种或一类更新的优先级。
   - **Lanes 的分类：** React 将这些车道划分为不同的组，以代表不同的更新类型和优先级：

     - **Sync Lanes (同步车道)：** 优先级最高的车道，用于需要立即同步执行的更新，例如 `ReactDOM.render` 的首次渲染。
     - **Input Lanes (输入车道)：** 优先级较高的车道，用于用户输入相关的更新，例如 `onChange` 事件导致的 `setState`。
     - **Transition Lanes (过渡车道)：** 中等优先级车道，用于 `useTransition` 标记的更新。这些更新可以被中断，并且不会阻塞用户交互。
     - **Deferred Lanes (延迟车道)：** 较低优先级车道，用于 `useDeferredValue` 标记的更新。
     - **Batch Lanes (批处理车道)：** 用于批处理多个更新。
     - **Idle Lanes (空闲车道)：** 最低优先级车道，用于在浏览器空闲时执行的更新。
   - **Lanes运算**：使用位运算（`|`, `&`, `^`等）来合并Lanes（如一个组件上有多个待处理更新）、检查Lanes（如判断某个Lane是否包含在待处理Lanes中）、选择Lanes等。
   - **支持并发特性**：Lanes模型是`startTransition`、`useDeferredValue`等并发特性实现优先级调度的基础。
3. **Lanes模型如何工作**：

   1. **为更新分配Lanes**：当React组件发生更新时（如`setState`、`dispatch`），React会根据更新的来源和上下文（例如，是否在事件回调中、是否由`startTransition`包裹）为其分配一个或多个Lanes。
   2. **确定渲染Lanes (`renderLanes`)**：React的协调器（Reconciler）会查看当前Fiber树中所有组件上挂起的Lanes (`pendingLanes`)，并根据一定策略（通常是选择最高优先级的Lanes）确定本次渲染要处理的Lanes集合，称为`renderLanes`。
   3. **调度渲染任务**：React的协调器会将渲染工作（以`renderLanes`为参数）作为一个回调任务，连同根据`renderLanes`转换出的Scheduler优先级，一起**提交给React Scheduler进行调度执行**。比如SyncLane通常会转换为Scheduler的ImmediatePriority，而TransitionLane会转换为较低的Scheduler优先级。
   4. **处理特定Lanes的更新**：在Render阶段，当处理一个Fiber节点的更新队列时，只会处理那些与当前`renderLanes`匹配的更新。
4. **Lanes模型带来的好处**：
   - **细粒度优先级控制**：能区分多种更新类型。
   - **并发渲染的基础**：是实现任务中断、优先级调度、批处理和合并的基础。
   - **中断与恢复的基石：** 当工作被中断时，React 知道当前处理到了哪个 `renderLanes`，以及哪些 Lane 还没有被处理，从而可以在恢复时继续从正确的位置开始。
   - **饿死问题缓解**：低优先级的Lane在等待过久后，其优先级可能会被提升，或者在没有更高优先级任务时，它所占用的Lanes会被包含进renderLanes中得到处理机会。防止低优先级Lanes被无限期推迟。
   - **支持新的并发特性：** `useTransition` 和 `useDeferredValue` 等 API 正是基于 Lanes 模型实现的。它们允许开发者明确地标记某些更新为“可中断”或“延迟”，从而优化用户体验。

------

## **五、中断机制的实现**

中断机制是React并发模式的核心能力，它允许React在执行Render阶段工作时暂停，优先处理更高优先级的任务，然后在适当的时候恢复之前的工作。这是**Fiber架构、Scheduler和Lanes模型协同工作的结果**。

1. **如何实现中断与恢复**：

   - **Fiber作为可中断的工作单元**：React的Render阶段不再是不可分割的递归调用，而是基于Fiber节点（每个节点是一个工作单元）的遍历。处理完一个Fiber单元后，可以暂停。

   - Scheduler的时间切片驱动

     ：

     - React的Render阶段工作循环是由Scheduler调度的。Scheduler在执行React的回调时，会传入一个参数指示当前时间片是否还有剩余时间。
     - React的Render循环在每处理完一个Fiber单元后，会调用`shouldYieldToHost()`（它会查询Scheduler的状态（如当前时间片是否用尽，是否有更高优先级任务））。
     - 如果`shouldYieldToHost()`返回`true`，表示需要让出主线程，React会保存当前`workInProgress` Fiber树的进度，并暂停执行。

   - **Lanes模型决定是否可以中断及中断谁**：当一个新的更高优先级的更新（具有更高优先级的Lane）到来时，React会根据Lanes决定是否可以中断当前正在进行的低优先级Lane的渲染。

   - **恢复工作**：当Scheduler再次获得执行机会并继续调度之前被中断的React任务时，React可以从上次中断的Fiber节点继续构建`workInProgress`树。

   - **双缓冲技术的保障**：由于所有变更首先在内存中的`workInProgress`树上进行，即使构建过程被多次中断和恢复，用户看到的`current`树（即屏幕上的UI）始终是完整的、一致的，直到`workInProgress`树构建完成并进入Commit阶段。

2. **API体现**：

   - `startTransition` / `useTransition`: 开发者通过这些API将某些更新标记为低优先级的过渡更新，使其可以被更高优先级更新中断。
   - `useDeferredValue`: 允许一个值的更新被推迟，在后台以较低优先级处理，同样利用了中断机制。

------

## **六、更新队列 (Update Queue) 与状态计算**

更新队列是存在于**每个Fiber节点内部**的机制，用于管理该组件自身由`setState`或`useReducer`等API触发的状态更新，它是状态变更的起点，并与Lanes模型紧密集成。

1. **是什么？**

   - 每个拥有状态的Fiber节点都有一个`updateQueue`字段，它通常是一个**循环链表**，存储着该组件待处理的“更新对象 (update objects)”。

   - 当你调用

     ```
     setState(newStateOrFn)
     ```

     或

     ```
     dispatch(action)
     ```

     时，React会创建一个更新对象。这个对象包含：

     - 更新的内容（新的state、计算新state的函数、或action）。
     - 该更新被分配的**Lane**（优先级）。
     - 可选的回调函数等。

   - 这个更新对象会被加入到对应Fiber节点的`updateQueue`中。

2. **如何工作？**

   - **入队**：`setState`或`dispatch`调用时，更新对象被创建并添加到Fiber的`updateQueue`中。
   - **处理队列 (在Render阶段的`beginWork`中)**：当React的Render阶段处理到一个Fiber节点时，它会检查该节点的`updateQueue`。
   - React会遍历队列中的更新对象。关键在于，它**只会处理那些Lane与当前正在渲染的`renderLanes`相匹配的更新**。
   - 对于被选中的更新，它会按照顺序，基于前一个状态和更新对象的内容，计算出新的状态。
   - 所有匹配的更新处理完毕后，得到该Fiber节点在当前`renderLanes`下的最终`memoizedState`。
   - 如果`memoizedState`相比之前发生了变化，组件可能会需要重新渲染其子节点。

------

> 它们之间的依赖和协作关系：
>
> - **组件更新**首先在Fiber的**Update Queue**中排队，并被赋予**Lanes**。
> - React协调器根据所有Fiber节点上挂起的**Lanes**决定本次渲染要处理的**renderLanes**。
> - 协调器将带有优先级（由**renderLanes**转换而来）的渲染任务交给**Scheduler**。
> - **Scheduler**负责以时间切片和优先级调度的方式执行React的Render工作。
> - 在Render过程中，如果需要，**中断机制**允许React响应Scheduler的指令暂停和恢复工作，这有赖于Fiber的单元化和Lanes的优先级判断。

## 七、事件系统

### 概念

React的事件系统，简单来说，是它**自行实现的一套事件处理机制**，它并非直接操作浏览器原生的事件，而是构建了一个**合成事件（SyntheticEvent）层**。这么做的主要目的有几个：

1. **抹平浏览器差异性**：我们都知道，不同浏览器对于某些事件的实现和行为可能存在细微的差别。React通过`SyntheticEvent`提供了一个统一的、跨浏览器表现一致的事件接口。这意味着开发者可以编写一次事件处理逻辑，而无需担心在Chrome、Firefox或Edge等浏览器上的兼容性问题。这个合成事件对象暴露了与原生事件相似的API，比如 `stopPropagation()` 和 `preventDefault()`。

2. **高效的事件委托机制**：React并不会为每一个绑定了事件监听的DOM元素都去真实地调用 `addEventListener`。相反，它在内部采用了一种高效的**事件委托（Event Delegation）模式**。

   - 在React 16及更早版本中，它会将几乎所有类型的事件监听器都绑定在 `document` 层面。

   - **从React 17开始，这个行为有所调整，事件监听器会绑定到渲染React应用的根DOM容器上。** 这一点变化非常重要，它解决了当页面中存在多个React版本或者React与其他JavaScript库（如jQuery）混用时可能发生的事件冲突问题，并且使得 `e.stopPropagation()` 能够更有效地阻止事件冒泡到根容器之外。增强了微前端或混合应用的兼容性。

   - 当某个具体的DOM节点触发事件时，这个事件会沿着DOM树冒泡。当它到达根容器（或`document`）时，React的统一事件分发器会根据事件的 `target` 和React组件的内部信息，准确地找到应该响应这个事件的组件及其对应的处理函数，并执行它。

   - 这种委托机制的

     核心优势

     在于：

     - **减少内存占用**：大大减少了事件监听器的数量。
     - **提升性能**：尤其是在有大量可交互元素时，初始化和管理事件监听器的开销会小很多。
     - **动态添加的元素也能自动处理事件**：即使组件重新渲染导致DOM结构变化，新生成的元素也无需重新绑定事件，因为事件监听始终在顶层。

3. **与原生事件的交互**：

   - 如果需要访问底层的原生浏览器事件对象，可以通过 `syntheticEvent.nativeEvent` 属性获取。
   - `syntheticEvent.stopPropagation()` 不仅会阻止事件在React组件树中的冒泡，也会（尤其在React 17+）更可靠地阻止事件冒泡到外部的原生DOM监听器。
   - `syntheticEvent.preventDefault()` 用于阻止浏览器的默认行为。

4. **React 17+的关键改进**：

   - 除了上面提到的**事件委托根节点的变更**，另一个显著变化是**移除了事件池（Event Pooling）**。在之前的版本中，`SyntheticEvent` 对象是被池化的，这意味着事件回调执行完毕后，事件对象的属性会被重置，以便复用。如果需要在异步操作（如 `setTimeout`）中访问事件属性，必须先调用 `event.persist()`。React 17之后，事件对象不再被池化，开发者可以直接异步访问事件属性，无需额外操作，这简化了开发体验。
   - 还有一些细微调整，比如 `onScroll` 事件不再冒泡，`onFocus` 和 `onBlur` 底层切换到使用原生的 `focusin` 和 `focusout` 事件，这些都使得React的行为更贴近浏览器标准。

5. **事件优先级与并发的结合**

   在React 18的并发模式下，某些用户交互事件（如click, input，称为离散事件Discrete Events）会被赋予比其他事件（如scroll，连续事件Continuous Events）或异步更新更高的内在优先级。当这些高优先级事件触发状态更新时，它们对应的Lanes（如SyncLane或InputContinuousLane）会确保这些更新被优先处理，甚至可以中断正在进行的低优先级渲染。这是事件系统与并发机制协同提升响应性的重要体现。

**总结来说，React的事件系统设计精巧，它通过合成事件和事件委托，有效地解决了跨浏览器兼容性问题，提升了应用性能，并提供了一致且便捷的开发体验。理解其内部机制，特别是React 17以来的一些重要更新，对于编写高效、健壮的React应用至关重要。**

### 事件触发流程

UserDocumentReactEventSystemFiberTreeEventHandler触发原生事件(如click)捕获原生事件创建合成事件从目标节点向上遍历收集沿途事件处理函数按捕获/冒泡顺序执行执行回调释放事件对象UserDocumentReactEventSystemFiberTreeEventHandler

## 八、虚拟DOM  Diff算法原理

### 虚拟DOM (Virtual DOM)

#### 概念

- 虚拟DOM本质上是一个**轻量级的JavaScript对象**，它是对真实DOM结构的一层抽象和描述。可以理解为真实DOM树的一个内存中的副本或蓝图。
- 当组件的状态（state或props）发生变化时，React并不会立即去操作真实的DOM，而是先在内存中构建一个新的虚拟DOM树。

#### 优势

- **性能考虑**：直接操作真实DOM通常是昂贵且耗时的，因为它涉及到浏览器的重排（reflow）和重绘（repaint），这些操作会阻塞主线程，影响用户体验。频繁地、小范围地直接修改DOM，累积起来的性能开销会非常大。
- **批量更新与最小化操作**：虚拟DOM允许React将多次状态变更聚合起来，计算出最终的差异，然后进行一次性的、最小化的真实DOM更新。它充当了一个缓冲区。
- **跨平台能力**：虚拟DOM提供了一个抽象层，使得React不仅可以渲染到浏览器的DOM，还可以渲染到其他平台，比如React Native就是基于虚拟DOM渲染到原生移动组件。
- **提升开发体验**：开发者只需要关注状态的改变和组件的声明式渲染逻辑，而无需关心具体的DOM操作细节，React会通过虚拟DOM来高效地处理这些。

### **Diff算法 (Reconciliation)**

当组件状态发生变化，React会生成一个新的虚拟DOM树。Diff算法的核心任务就是**比较新旧两棵虚拟DOM树之间的差异**，找出最小的变更集，然后将这些变更应用到真实的DOM上。这个过程也称为**协调 (Reconciliation)**。

React的Diff算法为了在实践中达到高效，并没有采用严格意义上需要O(n^3)复杂度的树编辑距离算法，而是基于一些**启发式策略 (Heuristics)**，将复杂度优化到了O(n)：

1. **同层比较 (Tree Diffing)**：

   - React只会对**同一层级的节点**进行比较，不会跨层级移动节点。
   - 如果一个DOM节点在一次更新中从一个父节点移动到了另一个父节点下（即跨层级移动），React不会识别为移动，而是会销毁旧节点，创建新节点。
   - 这大大简化了比较的复杂度。因为Web UI中，跨层级移动DOM节点的操作相对较少。

2. **组件类型比较 (Component Diffing)**：

   - 如果两个虚拟DOM节点的**组件类型不同**（例如，一个从`<Header>`变成了`<Article>`），React会直接销毁旧的组件实例及其对应的DOM子树，然后创建一个新的组件实例并挂载其生成的DOM子树。旧组件的state会丢失。
   - 如果组件类型相同，React会保留该组件实例（其state也会被保留），然后比较其属性（props）和子元素，并递归地对子元素进行Diff。

3. **元素类型比较 (Element Diffing)**：

   - 如果两个节点的HTML**元素类型不同**（例如，一个从`<div>`变成了`<p>`），React会销毁旧的DOM节点及其子节点，然后创建并插入新的DOM节点。
   - 如果元素类型相同，React会保留底层的DOM节点，并只比较和更新有变化的属性（如`className`, `style`等）。然后继续递归比较其子节点。

4. **列表的Diff与`key`属性 (List Diffing with Keys)**：

   - 当处理一个节点列表（比如`<ul>`下的多个`<li>`）时，如果没有提供`key`，React会逐个比较新旧列表中的子节点。如果只是顺序改变或在中间插入/删除了节点，这可能导致大量的非必要DOM重建。

   - **`key`属性是至关重要的**。`key`应该是在兄弟节点之间**稳定且唯一**的标识符。

   - 当子节点拥有

     ```
     key
     ```

     时，React会使用

     ```
     key
     ```

     来匹配新旧列表中的子元素。

     - 如果一个带有特定`key`的元素在新列表中依然存在，React会认为它是同一个元素，并可能进行移动（如果顺序改变）或更新其属性。
     - 如果旧列表中的某个`key`在新列表中不存在，该元素会被销毁。
     - 如果新列表中的某个`key`在旧列表中不存在，会创建新元素。

   - 合理使用`key`可以极大地提高列表更新的效率，特别是对于动态列表（如排序、过滤、增删项目）。**不建议使用数组的索引作为`key`，除非列表是静态的且永远不会重排序或增删。**

**Diff算法的简要流程：**

1. 当组件的state或props更新时，调用组件的`render`方法（或执行函数组件）生成新的虚拟DOM树。
2. React将新的虚拟DOM树与上一次渲染生成的旧虚拟DOM树进行比较（Diff）。
3. Diff过程从根节点开始，逐层向下进行：
   - 比较节点类型（组件类型、元素类型）。
   - 如果类型不同，销毁旧的，创建新的。
   - 如果类型相同，比较属性，更新变化的属性。
   - 然后递归地对子节点进行Diff（对于列表，会利用`key`）。
4. Diff算法会记录下所有需要对真实DOM进行的变更操作（如创建节点、删除节点、更新属性、移动节点等）。
5. 最后，React将这些变更操作**批量地、一次性地**应用到真实的DOM上，完成UI更新。

**总结来说，虚拟DOM为React提供了一个在内存中操作和比较UI结构的中间层，而Diff算法则是高效找出新旧虚拟DOM差异并计算出最小DOM操作集的策略。这两者结合，使得React能够在保证开发效率的同时，最大限度地减少直接操作DOM带来的性能损耗，从而实现高效的UI渲染。**”

## 九、React渲染流程

### **初始化渲染流程**

1. **创建根节点（Root）**：

- 调用 `ReactDOM.createRoot()` 创建Fiber树的根节点（`FiberRootNode`）和根组件的Fiber节点（`HostRoot`）。
- 初始化`current`树为`null`，准备构建`workInProgress`树。

1. **渲染阶段（Render Phase）**：

- **构建组件树**：从根组件开始，深度优先遍历，为每个组件创建对应的Fiber节点（函数组件执行函数，类组件实例化并调用`render`方法）。
- **生成Fiber树**：基于JSX返回的React元素，递归创建子Fiber节点，构建完整的`workInProgress`树（内存中的新树）。
- **标记副作用**：所有节点标记为`Placement`（需要插入DOM），因为无旧节点，无需Diffing。

1. **提交阶段（Commit Phase）**：

- **Mutation阶段**：深度优先遍历`workInProgress`树，根据`Placement`标记创建实际DOM节点并插入容器（如`div#root`）。
- **Layout阶段**：
- 更新`ref.current`。
- 执行同步副作用：类组件的`componentDidMount`，函数组件的`useLayoutEffect`回调。
- **异步副作用**：调度`useEffect`回调（在浏览器绘制后执行）。

1. **切换树**：将`workInProgress`树设置为`current`树，完成初始化。

### **更新渲染流程**

1. **触发更新**：

- 状态更新（`setState`/`useState`）、Props变化、Context变化等。

1. **调度更新**：

- React将更新加入任务队列，根据优先级调度（并发模式下可中断）。

1. **渲染阶段（Render Phase）**：

- **构建新树**：从根节点开始，深度优先遍历，创建新的`workInProgress`树（复用或新建Fiber节点）。
- **Diffing算法**：对比新旧Fiber节点（即`current`树和`workInProgress`树）：
- 节点类型不同：销毁旧节点及其子树，创建新节点（标记`Deletion`和`Placement`）。
- 节点类型相同：更新属性（标记`Update`）。
- 列表元素：通过`key`比较移动/复用节点（标记`Placement`或`Update`）。
- **标记副作用**：在Fiber节点上标记需要执行的DOM操作（如`Placement`、`Update`、`Deletion`）。

1. **提交阶段（Commit Phase）**：

- **Before Mutation阶段**：
- 执行`getSnapshotBeforeUpdate`（类组件）。
- **Mutation阶段**：
- 执行DOM操作：插入（`Placement`）、更新（`Update`）、删除（`Deletion`）。
- 解绑旧`ref`。
- 执行上一次 useLayoutEffect 的销毁函数（同步）
- **Layout阶段**：
- 更新`ref`引用。
- 执行同步副作用：类组件的`componentDidUpdate`，函数组件的`useLayoutEffect`回调。
- **异步副作用**：调度`useEffect`的销毁与回调（在浏览器绘制后执行）。

1. **切换树**：将`workInProgress`树设置为`current`树。

## 十、React Hook原理

### **什么是 React Hooks？**

1. **定义**：Hooks是React 16.8版本引入的新特性，它允许你在不编写类组件的情况下使用state以及其他的React特性（如生命周期、context等）。

2. 目的与动机

   ：

   - **在函数组件中使用状态和生命周期**：解决了之前函数组件（Stateless Functional Components）无法拥有自身状态和生命周期逻辑的问题。

   - **更好的逻辑复用**：相比于高阶组件（HOC）和Render Props模式，自定义Hooks提供了一种更简洁、更直观的方式来复用有状态逻辑。

   - 解决类组件的困扰

     ：

     - `this`指向问题。
     - 生命周期方法中逻辑分散（例如，数据获取和事件订阅/取消订阅可能分散在`componentDidMount`和`componentWillUnmount`中）。
     - 难以理解和维护的复杂组件。

   - **使组件更易于测试**。

### **Hooks 的核心规则 (Rules of Hooks)**

这些规则是保证Hooks能够正确工作的前提：

1. 只在React函数组件的顶层调用Hooks

   ：

   - 不要在循环、条件语句或嵌套函数中调用Hooks。
   - **原因**：React依赖于Hooks在每次渲染时都以**完全相同的顺序被调用**，这样它才能在多次渲染之间正确地关联Hook的状态。如果在条件中调用Hook，可能会导致某次渲染中Hooks的调用顺序与上一次不同，从而产生错误。

2. 只在React函数组件或自定义Hooks中调用Hooks

   ：

   - 不要在普通的JavaScript函数中调用Hooks。
   - **原因**：Hooks的设计是与React组件的渲染周期和Fiber节点关联的。

### **Hooks 的内部工作原理简述**

1. **Fiber节点上的 `memoizedState` 链表**：
   - 对于函数组件，其对应的Fiber节点上有一个`memoizedState`字段。
   - 这个字段存储的不是组件的单一状态对象，而是一个**单向链表**。
   - 链表中的**每个节点代表一次Hook的调用**，并存储该Hook实例的状态和相关信息。
2. **Hooks按顺序存储和读取**：
   - **首次渲染 (Mount)**：当组件首次渲染并调用Hooks时（如`useState`, `useEffect`），React会为每个Hook调用创建一个对应的Hook对象（包含其初始状态、队列等信息），并将这些Hook对象按调用顺序链接起来，形成链表，挂载到Fiber节点的`memoizedState`上。
   - **后续渲染 (Update)**：当组件重新渲染时，它会再次以相同的顺序执行函数体内的Hooks调用。React会按照这个顺序遍历上一次渲染时构建好的Hook链表，从中取出对应Hook节点存储的状态和信息。
3. **状态的隔离**：每个组件实例（即每个Fiber节点）都有自己独立的Hook链表，因此不同组件实例之间的Hook状态是相互隔离的。

### useState是同步还是异步的

useState本身是同步的，但它触发的状态更新和重新渲染是异步的。 具体表现为:

1. **调用setState是同步的**，但状态更新后的渲染是异步的
2. **批处理机制**：多个setState会被合并到一次渲染中
3. **React 18前**：仅在React事件处理函数中自动批处理
4. **React 18后**：所有更新默认批处理(Promise、setTimeout、原生事件等)

### useState原理

- **作用**：为函数组件添加局部状态 (state)。

- **参数**：`initialState` - 状态的初始值。可以是任意类型的值，也可以是一个函数（该函数只会在初始渲染时执行一次，其返回值作为初始状态）。

- **返回值**：一个包含两个元素的数组：

  - `currentState`：当前的状态值。
  - `dispatchFn` (通常命名为 `setState` 或 `setXXX`)：一个用于更新状态的函数。

- **`dispatchFn` 的行为**：

  - 接收新状态值或一个接收前一个状态并返回新状态的函数（`setState(prevState => newState)`）。
  - 调用`dispatchFn`**不会立即改变`currentState`**。它会将一个更新请求加入到对应Hook的更新队列中，并**调度一次组件的重新渲染**。
  - 在下一次组件渲染时，React会处理更新队列，计算出新的状态，并将其作为`currentState`返回。
  - React会使用`Object.is`来比较新旧状态，如果相同，则可能会跳过不必要的重渲染（浅比较）。

- **原理解析**：

  - **首次渲染时**：

    1. 调用`useState(initialState)`。

    2. React创建一个Hook对象，结构大致如下：

       ```javascript
       // Simplified Hook object structure for useState
       const hook = {
         memoizedState: initialState, // 存储当前状态值
         queue: { // 一个更新队列，用于存放待处理的更新
           pending: null, // 指向一个循环链表，存储更新对象
           dispatch: null, // 指向dispatchAction函数
           // ...可能还有其他与并发相关的字段，如lastRenderedReducer, lastRenderedState
         },
         next: null // 指向下一个Hook对象
       };
       ```

    3. 将此`hook`对象添加到Fiber的`memoizedState`链表中。

    4. ```
       useState
       ```

       返回 

       ```
       [hook.memoizedState, dispatchAction]
       ```

       。

       - `dispatchAction`是一个与此特定`hook`对象绑定的函数。当它被调用时，React知道是哪个`useState`实例发起的更新。

  - **后续渲染时 (没有触发更新)**：

    1. 再次调用`useState(initialState)`（此时`initialState`参数会被忽略）。
    2. React按照调用顺序，从Fiber的`memoizedState`链表中找到对应的`hook`对象。
    3. 直接返回 `[hook.memoizedState, dispatchAction]`。此时`hook.memoizedState`是上一次计算得到的最新状态。

  - **当`dispatchAction(newStateOrFn)`被调用时 (触发更新)**：

    1. `dispatchAction`函数（即我们常用的`setState`）被执行。它**不会立即改变`hook.memoizedState`**。

    2. 它会创建一个

       更新对象 (update object)

       ，结构可能如下：

       ```javascript
       // Simplified update object structure
       const update = {
         lane: currentUpdateLane, // 当前更新的优先级 (Lane)
         action: newStateOrFn, // 新的状态值或一个 (prevState => newState) 函数
         next: null // 指向队列中的下一个更新对象
         // ...可能还有eagerState, hasEagerState用于快速bailout优化
       };
       ```

    3. 这个`update`对象会被添加到对应`hook`对象的`queue.pending`（更新队列）中。这是一个循环链表，新的更新会追加到链表尾部。

    4. `dispatchAction`内部会检查是否可以进行**快速bailout（eager state update）**：如果新的状态值与当前状态相同，并且没有其他挂起的更新，React可能会跳过调度。

    5. 最重要的，`dispatchAction`会**调度一次组件的重新渲染**。它会根据更新的来源确定一个Lane，并将这个Lane合并到Fiber节点的`lanes`属性上，然后通知React的Scheduler安排工作。

  - **组件重新渲染时 (处理更新队列)**：

    1. 在组件函数体执行、再次调用到对应的`useState`之前，React会**处理该`hook`的更新队列 (`hook.queue`)**。

    2. 它会遍历队列中所有与当前渲染优先级（`renderLanes`）匹配的更新对象。

    3. 基于

       ```
       hook.memoizedState
       ```

       （上一次的最终状态）和队列中的

       ```
       update.action
       ```

       ，依次计算出新的状态。

       - 如果`action`是值，直接使用。
       - 如果`action`是函数，则执行 `action(previousCalculatedState)`。

    4. 所有匹配的更新处理完毕后，得到最终的新状态值。

    5. 这个新状态值会**更新到`hook.memoizedState`字段上**。

    6. 然后，`useState`会返回这个新的 `[hook.memoizedState, dispatchAction]`。

    7. 如果新计算出的`hook.memoizedState`与上一次（在处理队列前）的`memoizedState`不同（通过`Object.is`），React会标记该组件需要继续渲染其子节点。
    
    **手写useState**
  
  ```js
  <!DOCTYPE html>
  <html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>手写 useState 示例</title>
  </head>
  <body>
    <div id="app"></div>
    <button id="increment">加一</button>
    <button id="reset">重置</button>
  
    <script>
      // 模拟 React 的状态存储和 hook 管理
        //多个状态存储
      let hookStates = [];
  	//第几个状态
      let hookIndex = 0;
  
      function useState(initialState) {
        const currentIndex = hookIndex;
  //初始化
        if (hookStates[currentIndex] === undefined) {
          hookStates[currentIndex] = initialState;
        }
  
        const setState = (newState) => {
          if (typeof newState === 'function') {
            hookStates[currentIndex] = newState(hookStates[currentIndex]);
          } else {
              //当前状态的值设置为newState
            hookStates[currentIndex] = newState;
          }
          render(); // 重新渲染组件
        };
  //准备给下一个 useState 用
        hookIndex++;
          //返回函数
        return [hookStates[currentIndex], setState];
      }
  	//设置并创建环境
      function Counter() {
        const [count, setCount] = useState(0);
        const app = document.getElementById('app');
        app.innerHTML = `<h2>计数器：${count}</h2>`;
  
        // 按钮事件绑定
          //箭头函数确保变量是当前函数
        document.getElementById('increment').onclick = () => setCount(prev => prev + 1);
        document.getElementById('reset').onclick = () => setCount(0);
      }
  
      function render() {
          //每次组件函数重新执行，所有 useState()（或其他 Hook）都会重新被调用一次：
        hookIndex = 0; // 每次 render 重置 index
        Counter();     // 渲染函数组件
      }
  
      // 初始渲染
      render();
    </script>
  </body>
  </html>
  
  ```
  
  

### useEffect原理 `useEffect(setup, dependencies?)`

- **作用**：用于处理**副作用 (Side Effects)**。副作用是指在组件渲染完成之后需要执行的操作，如数据获取、设置订阅、手动更改DOM等。

- **参数**：

  - `setup`: 一个函数，我们称之为“effect函数”。React会在每次DOM更新完成后（默认情况下）执行这个函数。这个函数**可以选择性地返回一个清理函数 (cleanup function)**。
  - `dependencies` (可选): 一个数组，称为依赖项数组。它控制`useEffect`的执行时机。

- **执行时机与依赖数组 (`dependencies`)**：

  - **不提供依赖数组 (`useEffect(fn)`)**: effect函数会在**每次组件渲染完成之后**都会执行（包括首次渲染和所有更新）。
  - **提供空数组 (`useEffect(fn, [])`)**: effect函数只会在组件**首次挂载 (mount)** 后执行一次，并且在组件**卸载 (unmount)** 前执行其返回的清理函数（如果有的话）。这模拟了类组件的 `componentDidMount` 和 `componentWillUnmount` 的组合行为。
  - **提供包含依赖项的数组 (`useEffect(fn, [dep1, dep2])`)**: effect函数会在组件首次挂载后执行。之后，只有当数组中**任何一个依赖项的值与上一次渲染时相比发生了变化**（通过 `Object.is` 进行浅比较）时，才会在该次渲染完成后重新执行effect函数（并在执行新effect前执行上一个effect的清理函数）。这模拟了类组件 `componentDidMount` 加上 `componentDidUpdate` 中对特定props或state的检查。

- **清理函数 (Cleanup Function)**：

  - 如果`setup`函数返回了一个函数，这个返回的函数就是清理函数。

  - 执行时机

    ：

    - 在组件**下一次执行该effect之前**（如果依赖项发生变化导致effect需要重新运行）。
    - 在组件**卸载 (unmount) 时**。

  - **用途**：用于清除上一次effect执行时创建的副作用，例如取消API订阅、清除定时器、移除事件监听器等，以防止内存泄漏或不必要的行为。

- **原理解析**：

  - **首次渲染时 (Mounting)**：

    1. 调用`useEffect(setupFn, depsArray)`。

    2. React创建一个Hook对象，结构大致如下：

       ```javascript
       // Simplified Hook object structure for useEffect
       const hook = {
         tag: HookFlags.Layout | HookFlags.Passive, // 标记是useEffect还是useLayoutEffect, 以及是否有副作用
         create: setupFn,        // 用户传入的effect函数
         destroy: undefined,     // 存储上一次effect返回的清理函数
         deps: depsArray,        // 依赖项数组
         next: null              // 指向下一个Hook对象
       };
       ```

    3. 将此`hook`对象添加到Fiber的`memoizedState`链表中。

    4. 在Commit阶段（DOM更新之后）：

       - 对于`useEffect`，React会**异步地**调度执行`hook.create()`（即`setupFn`）。
       - 执行`setupFn`后，如果它返回了一个函数，这个返回的函数会被存储在`hook.destroy`中，作为下一次的清理函数。

  - **后续渲染时 (Updating)**：

    1. 再次调用`useEffect(setupFn, depsArray)`。

    2. React按照调用顺序找到对应的`hook`对象。

    3. React会比较新的

       ```
       depsArray
       ```

       和存储在

       ```
       hook.deps
       ```

       中的旧依赖项数组。

       - 比较方式：逐项使用`Object.is`进行比较。

    4. **如果依赖项没有变化 (且不是首次渲染)**：该`useEffect`的`setupFn`在本次渲染周期中**不会被执行**。

    5. 如果依赖项发生变化或这是首次渲染

       ：

       - 在Commit阶段（DOM更新之后，

         ```
         useEffect
         ```

         是异步调度）：

         1. **执行清理**：如果`hook.destroy`中存在上一次保存的清理函数，React会先执行这个清理函数。
         2. **执行新的effect**：然后，React会执行本次传入的新的`hook.create()`（即`setupFn`）。
         3. 如果新的`setupFn`返回了一个函数，它会被更新到`hook.destroy`中。

       - 新的`depsArray`会被更新到`hook.deps`中。

  - **组件卸载时 (Unmounting)**：

    - 在Commit阶段，如果组件被卸载，React会遍历其Fiber节点上的所有`useEffect`（以及`useLayoutEffect`）Hook对象。
    - 如果某个Hook的`hook.destroy`中存在清理函数，React会执行它。

### 副作用列表的构建与执行 (`effectTag` 和 Commit 阶段)

在Render阶段，React不仅构建`workInProgress` Fiber树和进行Diff，还会识别出需要执行的副作用，并将其标记在Fiber节点上，最终在Commit阶段统一执行。

- **目的**：将实际的DOM操作、生命周期调用等副作用与纯粹的计算（Diff、状态计算）分离，使得Render阶段可以被中断。

- **核心原理**：

  1. `effectTag` (副作用标记)

     ：

     - 每个Fiber节点都有一个`effectTag`字段（一个位掩码）。

     - 在Render阶段（主要是`completeWork`阶段，当一个Fiber节点的所有子节点都处理完毕后），如果React检测到该Fiber节点需要进行DOM操作（如插入、更新属性、删除）或调用生命周期方法/Hooks副作用，它会在该节点的`effectTag`上设置相应的位。

     - 常见的

       ```
       effectTag
       ```

       包括：

       - `Placement`: 插入新的DOM节点。
       - `Update`: 更新DOM节点的属性或内容。
       - `Deletion`: 删除DOM节点。
       - `Snapshot`: 需要在DOM更新前调用`getSnapshotBeforeUpdate`。
       - `LifecycleEffect` / `PassiveEffect` (在较新版本中可能名称或组织方式有变，但概念类似): 需要执行`componentDidMount`/`componentDidUpdate`或`useEffect`/`useLayoutEffect`的effect函数或清理函数。

  2. 副作用列表 (Effect List)

     ：

     - 在Render阶段的最后，当整个`workInProgress`树构建完成时，React会遍历这棵树（通常是从根节点开始，或者从有副作用的子树开始）。
     - 它会收集所有带有`effectTag`的Fiber节点，并将它们链接成一个**单向链表**，这个链表称为**副作用列表 (effect list)**。这个列表的顺序通常与DOM操作的预期顺序（深度优先遍历的顺序）相关，以确保父节点先于子节点被创建（如果是Placement）。
     - 这个副作用列表的头指针会存储在`workInProgress`树的根Fiber节点（`HostRoot`或`HostComponent`）上，或者在`finishedWork`（完成的Fiber树）上。

  3. Commit 阶段执行副作用

     ：

     - 一旦Render阶段完成，并且`workInProgress`树准备好成为`current`树，就进入不可中断的Commit阶段。

     - Commit阶段会按顺序遍历之前构建的副作用列表。

     - 对于列表中的每个Fiber节点，React会根据其

       ```
       effectTag
       ```

       执行相应的操作：

       - **DOM变更**：如插入、更新、删除真实的DOM节点。
       - **生命周期方法调用**：如`componentDidMount`, `componentDidUpdate`。
       - **Refs更新**。
       - **`useLayoutEffect`的effect函数和清理函数执行**（同步执行）。

     - Commit阶段通常分为几个子阶段（如before mutation, mutation, layout），`useEffect`的effect（非`useLayoutEffect`）通常在Commit阶段完成DOM变更并且浏览器完成绘制之后异步调度执行。

### Context 原理

Context API提供了一种跨层级共享数据的方式，其实现与Fiber架构紧密相关。

- **目的**：避免“props drilling”（属性逐层传递），在组件树中高效共享全局性数据。

- **核心原理**：

  1. `React.createContext(defaultValue)`

     ：

     - 调用此方法会创建一个唯一的Context对象，该对象内部包含两个组件：`Provider`和`Consumer`。
     - 它还持有一个内部标识符，用于在Fiber树中识别这个特定的Context。

  2. `Context.Provider`

     ：

     - 当使用`<MyContext.Provider value={someValue}>`时，会创建一个特殊的Fiber节点（通常是`ContextProvider`类型的Fiber）。
     - 这个Fiber节点会存储当前的`value`。
     - 当`Provider`的`value` prop发生变化时（通过`Object.is`比较），React会知道这个Context的值已更新。

  3. 数据消费 (`Context.Consumer` / `static contextType` / `useContext`)

     ：

     - **`Context.Consumer`**：其子节点是一个函数（render prop）。在渲染这个`Consumer`组件时，React会从当前Fiber节点开始，**向上遍历Fiber树**，查找最近的、匹配该Context类型的`ContextProvider` Fiber节点。

     - **`static contextType = MyContext` (类组件)**：React在实例化或更新该类组件时，会执行类似的向上查找逻辑，并将找到的`value`挂载到`this.context`。

     - `useContext(MyContext)` (函数组件)

       ：这是最常用的。在函数组件执行期间调用

       ```
       useContext
       ```

       时，React会：

       - 将当前组件（的Fiber节点）注册为该Context的一个订阅者。
       - 同样向上遍历Fiber树，找到最近的`ContextProvider`并读取其`value`。

  4. 更新传播

     ：

     - 当一个`ContextProvider`的`value`更新时，React会找到所有订阅了该Context的后代消费者Fiber节点。
     - 它会给这些消费者Fiber节点调度一个更新（标记它们需要重新渲染，并赋予相应的Lane优先级）。
     - 当这些消费者组件重新渲染时，它们会通过上述查找机制获取到新的Context值。

  5. **优化**：如果`Provider`的`value`是一个对象或数组，并且在每次父组件渲染时都创建一个新实例（即使内容没变），会导致所有消费者不必要地重渲染。因此通常建议使用`useState`、`useMemo`等来记忆化`value`。

### HOC和Hooks异同

React HOC (Higher Order Components - 高阶组件) 和 Hooks 是 React 中用于代码复用和逻辑抽象的两种主要方式。它们各有优缺点，适用于不同的场景。

**HOC (高阶组件)**

- **概念**: HOC 是一个函数，它接收一个组件作为参数，并返回一个新的增强型组件。

- **工作方式**: HOC 通过包裹（wrapping）原始组件，可以向其注入 props、管理状态、或修改其行为。

- 优点

  :

  - **强大的组合能力**: HOC 可以通过函数组合的方式层层嵌套，实现复杂逻辑的封装。
  - **关注点分离**: 可以将通用逻辑（如日志记录、认证、数据获取等）从组件本身剥离出来。
  - **适用于类组件和函数组件**: HOC 可以在两种类型的组件中使用。

- 缺点

  :

  - **Props 混淆 (Prop Confusion)**: 当多个 HOC 嵌套时，很难追踪 props 的来源和传递过程，容易导致 props 名称冲突或传递过多不必要的 props。
  - **命名冲突 (Name Conflicts/Collision)**: 不同的 HOC 可能会注入同名的 prop，导致后者覆盖前者，产生意想不到的 bug。
  - **Wrapper Hell (嵌套地狱)**: 过多的 HOC 嵌套会导致组件层级过深，使得调试和理解代码变得困难。
  - **依赖关系不明确**: HOC 之间的依赖关系可能不明显，改变 HOC 的顺序或移除某个 HOC 可能会破坏应用。
  - **可读性较差**: 多个 HOC 组合在一起时，代码的可读性会下降。

**Hooks**

- **概念**: Hooks 是 React 16.8 引入的新特性，它允许你在不编写 class 的情况下使用 state 以及其他的 React 特性。

- **工作方式**: Hooks 是一些特殊的函数 (如 `useState`, `useEffect`, `useContext` 等)，你可以在函数组件中调用它们来“钩入” React 的 state 和生命周期功能。你也可以创建自定义 Hooks 来封装可复用的有状态逻辑。

- 优点

  :

  - **更清晰的逻辑复用**: Hooks 使得在组件之间共享有状态逻辑变得更加简单直观。你可以将相关逻辑组织到自定义 Hook 中，并在需要的组件中直接调用。
  - **避免 Wrapper Hell**: Hooks 不需要额外的组件嵌套，从而避免了 HOC 带来的组件层级过深的问题。
  - **Props 传递更明确**: Hooks 的输入和输出都非常清晰，你可以明确地看到数据是如何在组件和 Hook 之间流动的，避免了 props 混淆和命名冲突的问题。
  - **更易于测试**: 包含 Hooks 的逻辑单元通常更容易进行单元测试。
  - **更好的性能**: 在某些情况下，Hooks 可以通过避免不必要的重新渲染来提供更好的性能。
  - **依赖关系明确**: 自定义 Hooks 之间的依赖关系以及 Hook 对组件 props 的依赖都更加清晰。

- 缺点

  :

  - **只能在函数组件中使用**: Hooks 不能在类组件中使用。
  - **学习曲线**: 对于习惯了类组件和 HOC 的开发者来说，需要一定时间来适应 Hooks 的思维方式和使用规则 (如 Hooks 的调用规则)。
  - **紧耦合 (Tightly Coupled)**: 组件与 Hook 之间存在一定的耦合，如果需要独立使用组件（不带 Hook 逻辑），可能需要进行一些调整。

**主要异同点总结**

| 特性           | HOC (高阶组件)                                          | Hooks                                            |
| -------------- | ------------------------------------------------------- | ------------------------------------------------ |
| **核心思想**   | 组件包裹和增强                                          | 函数调用和逻辑注入                               |
| **组件类型**   | 类组件和函数组件                                        | 仅函数组件                                       |
| **逻辑复用**   | 通过函数返回新组件来实现                                | 通过自定义 Hook 函数来实现                       |
| **Props 传递** | 可能导致 Props 混淆和命名冲突                           | Props 传递明确，易于控制                         |
| **组件层级**   | 可能导致 Wrapper Hell (嵌套地狱)                        | 不会增加额外的组件层级                           |
| **可读性**     | 嵌套多时可读性下降                                      | 通常更易读，逻辑更集中                           |
| **依赖管理**   | 隐式依赖，顺序可能重要                                  | 显式依赖，更易于理解和管理                       |
| **测试**       | 相对复杂，可能需要渲染整个组件树                        | 逻辑单元更易于独立测试                           |
| **适用场景**   | 通用的横切关注点 (如日志、认证、布局)，对组件侵入性较小 | 组件内部的复杂状态逻辑、副作用管理、上下文共享等 |

**何时选择？**

- **优先考虑 Hooks**: 对于大多数需要复用有状态逻辑的场景，尤其是在新的函数组件中，Hooks 通常是更现代、更简洁、更易于维护的选择。

- HOC 仍然有其用武之地

  :

  - 当你需要以非侵入性的方式为许多组件添加通用功能，且这些功能不直接与组件的内部状态或逻辑紧密相关时 (例如，提供统一的布局、主题、或者进行路由守卫等)。
  - 在需要兼容旧的类组件代码库时。
  - 当你想利用 HOC 强大的声明式组合能力来构建页面级或应用级的通用行为时。

总的来说，Hooks 解决了 HOC 存在的一些主要痛点，使得组件逻辑复用更加灵活和直观。然而，HOC 作为一种设计模式，在某些特定场景下仍然有其价值。在实际开发中，可以根据具体需求和场景选择最合适的技术。

## 十一、**`React.lazy`**、**`React.Suspense`**、**Error Boundaries**

### **1. `React.lazy()`**

- **核心目的**：**代码分割 (Code Splitting)**。

- **是什么**：一个函数，允许你将组件定义为**动态导入 (`import()`)**。

- 如何工作

  ：

  1. `React.lazy` 接收一个必须调用动态 `import('./MyComponent')` 的函数。该 `import()` 返回一个 Promise。
  2. 它返回一个特殊的 "lazy 组件"。当 React 首次渲染此组件时：
     - 如果代码未加载，它会**触发代码加载**。
     - 加载期间，组件会“暂停”，此时需要 `Suspense` 处理。
  3. 代码加载完成后 (Promise resolve)，实际组件被渲染。
  4. 加载过的模块会被缓存。

- **作用**：减少应用初始加载包体积，按需加载组件，提升首屏加载速度。

- **关键点**：必须与 `React.Suspense` 配合使用。

- 示例

  ：

  ```javascript
  const MyLazyComponent = React.lazy(() => import('./MyLazyComponent'));
  // ...
  <React.Suspense fallback={<div>Loading...</div>}>
    <MyLazyComponent />
  </React.Suspense>
  ```

### **2. `React.Suspense`**

- **核心目的**：为**尚未准备好渲染的组件提供优雅的降级 UI (fallback)**。

- **是什么**：一个组件，用于包裹可能“暂停”的子组件。

- 如何工作

  ：

  1. 当其子树中的某个组件（如 `lazy` 组件或支持 Suspense 的数据获取组件）“暂停”渲染时（通常是内部抛出一个 Promise），`Suspense` 会捕获这个信号。
  2. `Suspense` **停止渲染其子组件**，并**显示其 `fallback` prop 指定的 UI**。
  3. 当被暂停的子组件准备就绪后 (Promise resolve)，`Suspense` **隐藏 fallback**，并**重新渲染其正常的子组件**。

- 主要用途

  ：

  - 配合 `React.lazy()` 处理代码加载状态。
  - 配合支持 Suspense 的数据获取方案处理数据加载状态。

- **关键点**：`Suspense` 本身不加载代码或数据，只管理加载状态的 UI。

### **3. 错误边界 (Error Boundaries)**

- **核心目的**：捕获并处理其**子组件树中发生的 JavaScript 错误**，渲染降级 UI，防止整个应用崩溃。

- **是什么**：一个**类组件**，定义了特定的生命周期方法来捕获错误。

- 如何工作

  ：

  1. 必须是**类组件**。
  2. 定义以下一个或两个静态/实例方法：
     - `static getDerivedStateFromError(error)`: 在子组件抛出错误后调用。返回一个对象来更新 state，用于**渲染降级 UI**。不应包含副作用。
     - `componentDidCatch(error, errorInfo)`: 也在错误抛出后调用。用于**记录错误信息**（如上报服务器）。可以包含副作用。
  3. 当子组件树中发生错误（渲染期间、生命周期、构造函数中）：
     - React 找到最近的错误边界。
     - 调用 `getDerivedStateFromError`，然后组件重渲染（显示 fallback）。
     - 调用 `componentDidCatch`。

- 无法捕获的错误

   (面试常问)：

  - 错误边界**自身**的错误。
  - **事件处理器**中的错误 (需用 `try...catch`)。
  - **异步代码**中的错误 (如 `setTimeout`, Promise `then/catch` 未正确处理)。
  - 服务端渲染 (SSR) 中的错误。

- **作用**：提高应用的健壮性，局部化错误影响。

- 示例关键结构

  ：

  ```javascript
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
      // logErrorToMyService(error, errorInfo);
    }
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }
  ```

## **十二、受控组件与非受控组件**

在 React 中处理表单数据时，核心区别在于**数据由谁管理**：

### **1. 受控组件 (Controlled Components)**

- **核心思想**：表单元素的值**完全由 React 的 `state` 控制**。`state` 是“唯一数据源”。

- 如何工作

  ：

  1. `state` 通过 `value` prop 驱动表单元素的显示。
  2. 用户输入触发 `onChange` 事件。
  3. `onChange` 处理器更新 `state`。
  4. `state` 更新导致组件重渲染，表单元素显示新值。

- 示例关键代码

  ：

  ```javascript
  const [name, setName] = useState('');
  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  ```

- 优点

  ：

  - **数据流清晰**：`state` 是唯一数据源，易于理解和调试。
  - **即时反馈与控制**：可以在 `onChange` 中立即进行验证、格式化、条件禁用等。
  - **易于实现动态交互**。

- 缺点

  ：

  - 对于包含大量字段的复杂表单，可能需要编写较多 `state` 和 `onChange` 逻辑。

### **2. 非受控组件 (Uncontrolled Components)**

- **核心思想**：表单数据**由 DOM 自身管理**。React 不直接控制其值，而是需要时通过 **Refs** 从 DOM 读取。

- 如何工作

  ：

  1. 使用 `ref` 附加到表单元素上。
  2. 可以使用 `defaultValue` prop 设置初始值（`value` prop 不用于非受控组件）。
  3. 当需要数据时（如表单提交），通过 `ref.current.value` 直接从 DOM 读取。

- 示例关键代码

  ：

  ```javascript
  javascript 体验AI代码助手 代码解读复制代码const nameRef = useRef(null);
  <input type="text" defaultValue="Initial Name" ref={nameRef} />
  // ... later, e.g., in a submit handler
  // const currentName = nameRef.current.value;
  ```

- 优点

  ：

  - 对于简单表单或一次性获取数据的场景，代码可能更简洁。
  - **易于集成需要直接操作 DOM 的第三方库**。

- 缺点

  ：

  - **即时验证和动态交互困难**，因为 React `state` 不直接管理数据。
  - 数据获取是命令式的，不如受控组件的声明式 `state` 直观。

### **3. 如何选择？**

- **首选受控组件**：这是 React 官方推荐的方式。因为它提供了更清晰的数据流、更好的可预测性和更强的控制力，大多数情况下能带来更好的开发体验和可维护性。

- 非受控组件的适用场景

  ：

  - **非常简单的表单**，只需要在提交时获取一次数据，且不需要即时验证或复杂交互。
  - 当集成**不兼容 React 数据流的第三方 DOM 库**时。
  - 处理**文件输入 `<input type="file" />`**，因为它的 `value` 属性是只读的，天然适合非受控模式。
  - 有时，在性能敏感且受控组件导致瓶颈的极少数复杂场景下，可能会考虑（但不常见）。

## **十三、Refs 原理与应用**

Refs 提供了一种直接访问 React 元素或 DOM 节点的机制，用于管理焦点、触发动画、集成第三方库等命令式操作场景。

- 核心 API

  ：

  - `useRef(initialValue)`：函数组件首选，返回一个在组件生命周期内持久不变的 ref 对象，其 `.current` 属性可指向 DOM 节点、类组件实例，或存储可变值（不触发重渲染）。
  - `React.createRef()`：主要用于类组件，每次调用创建新 ref。
  - **回调 Refs**：通过函数更精细地控制 ref 的设置和清除。

- **工作原理**：Ref 信息存储在 Fiber 节点的 `ref` 属性上，在 Commit 阶段（DOM 更新后）进行赋值或调用。`useRef` 的持久性依赖于 Fiber 节点的 `memoizedState`。

- **`React.forwardRef`**：允许父组件将 ref 传递给子函数组件内部的特定元素。React 19对此有改进，简单场景下可直接通过 props 传递 `ref`。

- **`useImperativeHandle`**：与 `forwardRef` 配合，自定义暴露给父组件的 ref 实例，只提供特定的方法而非整个实例或 DOM 节点。

**总而言之，Refs 是 React 中用于必要时进行命令式操作的工具，应谨慎使用，优先声明式编程。**

------

## **十四、React 18 新特性**

React 18 的核心是引入了**并发渲染 (Concurrent Rendering)** 机制，它允许 React 在处理多个任务时保持 UI 的响应性，并基于此提供了一系列新特性：

- 并发特性 API

  ：

  - `startTransition` 和 `useTransition`：将某些更新标记为“过渡性”（低优先级），避免阻塞高优先级交互。
  - `useDeferredValue`：延迟更新 UI 的非关键部分，提升感知性能。

- **自动批处理 (Automatic Batching)**：将更多来源（如 `setTimeout`, Promise）的多个状态更新自动合并为一次重渲染。

- **新的 Root API (`createRoot`)**：`ReactDOM.createRoot(domNode).render(<App />)` 替代了旧的 `ReactDOM.render`，是启用并发特性的前提。

- 面向库作者的 Hooks

  ：

  - `useSyncExternalStore`：安全地与外部状态管理库（如 Redux）集成。
  - `useInsertionEffect`：供 CSS-in-JS 库在 DOM 变更前注入样式。

- Suspense 的服务端渲染 (SSR) 增强

  ：

  - **选择性水合 (Selective Hydration)**：优先水合用户交互的部分。
  - **HTML 流式传输**：服务器可逐步发送 HTML，浏览器逐步渲染。

**总结：React 18 通过并发机制大幅提升了应用的性能和用户体验，特别是在复杂交互和数据加载场景下。**

------

## **十五、React 19 新特性**

React 19 带来了更智能的开发体验和更强大的服务端能力：

- **React Compiler (实验性 -> 正式)**：一个自动记忆化编译器，能自动优化组件重渲染，大幅减少手动使用 `useMemo`, `useCallback` 的需要，简化代码并提升性能。

- 服务端组件 (Server Components - RSC) 成熟推广

  ：

  - 组件在服务端执行，可直接访问后端资源，减少客户端 Bundle 大小。
  - 通过 `"use server"` 和 `"use client"` 指令区分组件环境。

- Actions (表单与服务端交互增强)

  ：

  - 简化表单提交和数据变更，`<form action={serverFunction}>`。
  - `useActionState` (原 `useFormState`)：管理 Action 状态。
  - `useFormStatus`：获取表单提交状态。
  - `useOptimistic`：实现乐观更新，提升感知性能。

- 新的 Hooks

  ：

  - `use(PromiseOrContext)`：在客户端组件中直接读取 Promise 结果（会触发 Suspense），或在条件逻辑中读取 Context。

- **Ref 作为 Prop 改进**：函数组件可以直接通过 `props.ref` 接收 `ref`，多数情况不再需要 `forwardRef`。

- **Web Components 支持增强**：更好地集成自定义元素。

**总结：React 19 致力于通过编译器实现自动优化、深化服务端能力、提供更强大的 Hooks 和 API 来提升开发效率和应用性能。**
