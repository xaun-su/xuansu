---
title: react高阶
createTime: 2025/05/08 23:41:47
permalink: /article/uczoiaow/
---
# React 高阶

# 一.Immutable

**问题：**

```javascript
var obj = { /* 一个复杂结构的对象 */ };
doSomething(obj);
// 上面的函数执行完后，此时的 obj 还是最初的那个 obj 吗？
// deepCopy?
```

**核心概念：**  Immutable 数据一旦创建，就不能被修改。任何修改都会返回一个新的 Immutable 对象。

## **1. Immutable.js 介绍**

*   [https://github.com/immutable-js/immutable-js](https://github.com/immutable-js/immutable-js)
*   每次修改 Immutable 对象时都会创建一个新的不可变对象，原对象数据不受影响。
*   **实现方式：**  Immutable.js 使用了 Persistent Data Structure（持久化数据结构）和 Structural Sharing（结构共享）来优化性能，避免深拷贝带来的开销。
    *   **持久化数据结构：**  旧数据创建新数据时，保证旧数据仍然可用且不变。
    *   **结构共享：**  只修改对象树中变化的节点和受影响的父节点，其他节点共享。

## **2. 深拷贝与浅拷贝的关系**

*   **(1) 浅拷贝示例：**

    ```javascript
    var arr = { };
    arr2 = arr; // arr2 指向 arr 的内存地址，修改 arr2 会影响 arr
    ```

*   **(2) `Object.assign()`：**  只复制一级属性，比浅拷贝多拷贝一层。

*   **(3) `JSON.parse(JSON.stringify(obj))`：**  一种深拷贝方法，数组和对象都适用。
    *   **缺点：**  无法处理 `undefined` 值。

## **3. Immutable 优化性能的方式**

*   **Persistent Data Structure（持久化数据结构）：**使用旧数据创建新数据时，要保证旧数据同时可用且不变。
*   **Structural Sharing（结构共享）：**如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

    *   [https://upload-images.jianshu.io/upload_images/2165169-cebb05bca02f1772](https://upload-images.jianshu.io/upload_images/2165169-cebb05bca02f1772)

## **4. Immutable 中常用类型（Map，List）**

*   **(1) Map**

    ```javascript
    const { Map } = require('immutable');
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = map1.set('b', 50);
    map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
    ```

*   **(2) List**

    ```javascript
    const { List } = require('immutable');
    const list1 = List([ 1, 2 ]);
    const list2 = list1.push(3, 4, 5);
    const list3 = list2.unshift(0);
    const list4 = list1.concat(list2, list3);
    assert.equal(list1.size, 2);
    assert.equal(list2.size, 5);
    assert.equal(list3.size, 6);
    assert.equal(list4.size, 13);
    assert.equal(list4.get(0), 1);
    // push, set, unshift or splice 都可以直接用，返回一个新的 immutable 对象
    ```

*   **(3) merge, concat**

    ```javascript
    const { Map, List } = require('immutable');
    const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
    const map2 = Map({ c: 10, a: 20, t: 30 });
    const obj = { d: 100, o: 200, g: 300 };
    const map3 = map1.merge(map2, obj);
    // Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
    const list1 = List([ 1, 2, 3 ]);
    const list2 = List([ 4, 5, 6 ]);
    const array = [ 7, 8, 9 ];
    const list3 = list1.concat(list2, array);
    // List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    ```

*   **(4) toJS**

    ```javascript
    const { Map, List } = require('immutable');
    const deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
    console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
    console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
    console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
    JSON.stringify(deep); // '{"a":1,"b":2,"c":[3,4,5]}'
    ```

*   **(5) fromJS**

    ```javascript
    const { fromJS } = require('immutable');
    const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
    const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
    console.log(nested2.getIn([ 'a', 'b', 'd' ])); // 6
    // 如果取一级属性 直接通过 get 方法，如果取多级属性  getIn(["a","b","c"])
    // setIn 设置新的值
    const nested3 = nested2.setIn([ 'a', 'b', 'd' ], "kerwin");
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: "kerwin" } } }
    // updateIn 回调函数更新
    const nested3 = nested2.updateIn([ 'a', 'b', 'd' ], value => value + 1);
    console.log(nested3);
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }
    const nested4 = nested3.updateIn([ 'a', 'b', 'c' ], list => list.push(6));
    // Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
    ```

## **5. Immutable + Redux 的开发方式**

```javascript
// reducer.js
const initialState = fromJS({
  category: "",
  material: ""
});

const reducer = (prevstate = initialState, action = {}) => {
  let { type, payload } = action;
  switch (type) {
    case GET_HOME:
      var newstate = prevstate.set("category", fromJS(payload.category));
      var newstate2 = newstate.set("material", fromJS(payload.material));
      return newstate2;
    default:
      return prevstate;
  }
};

// home.js
const mapStateToProps = (state) => {
  return {
    category: state.homeReducer.getIn(["category"]) || Map({}),
    material: state.homeReducer.getIn(["material"]) || Map({})
  };
};

this.props.category.get("相关属性");
this.props.category.toJS(); // 或者转成普通对象
```

**6. 缺点**

*   容易跟原生 JavaScript 混淆。
*   文档与调试不方便。

# 二.Mobx

*   [https://cn.mobx.js.org/](https://cn.mobx.js.org/)

## **1. Mobx 介绍**

*   Mobx 是一个功能强大，上手容易的状态管理工具。
*   Mobx 背后的哲学：任何源自应用状态的东西都应该自动地获得。
*   Mobx 利用 getter 和 setter 收集组件的数据依赖关系，在数据发生变化时精确知道哪些组件需要重绘，在界面规模变大的时候，往往会有很多细粒度更新。（vue类似）

## **2. Mobx 与 Redux 的区别**

*   **优点：**
    *   Mobx 写法上更偏向于 OOP（面向对象编程）。
    *   对一份数据直接进行修改操作，不需要始终返回一个新的数据。
    *   并非单一 store, 可以多 store。
    *   Redux 默认以 JavaScript 原生对象形式存储数据，而 Mobx 使用可观察对象。
    *   学习成本小。
    *   面向对象编程, 而且对 TS 友好。
*   **缺点：**
    *   过于自由：Mobx 提供的约定及模版代码很少，代码编写很自由，如果不做一些约定，比较容易导致团队代码风格不统一。
    *   相关的中间件很少，逻辑层业务整合是个问题。

## **3. Mobx 的使用**

*   **(1) observable 和 autorun**

    ```javascript
    import { observable, autorun } from 'mobx';

    const value = observable.box(0);
    const number = observable.box(100);

    autorun(() => {
      console.log(value.get());
    });

    value.set(1);
    value.set(2);
    number.set(101);
    // 0, 1, 2。 // autorun 使用到才能被执行
    // 只能是同步，异步需要处理

    // 观察对象，通过 map
    const map = observable.map({ key: "value"});
    // map.set("key", "new value");
    // map.get("key")

    // 观察对象，不通过 map
    const map = observable({ key: "value"});
    // map.key  map.key="xiaoming"

    // 观察数组
    const list = observable([1, 2, 4]);
    list[2] = 3;
    ```

*   **(2) action，runInAction 和严格模式**

    ```javascript
    import {observable, action, configure, runInAction} from 'mobx';
    
    configure({enforceActions:'always'})
    // 严格模式， 必须写 action,
    // 如果是 never，可以不写 action,
    // 最好设置 always, 防止任意地方修改值， 降低不确定性。
    
    class Store {
      @observable number = 0;
      @observable name = "kerwin";
    
      @action add = () => {
        this.number++;
      } // action 只能影响正在运行的函数，而无法影响当前函数调用的异步操作
    
      @action load = async () => {
        const data = await getData();
        runInAction(() => {
          this.name = data.name;
        });
      } // runInAction 解决异步问题
    }
    
    const newStore = new Store();
    newStore.add();
    
    // 如果在组件监听
    componentDidMount() {
      autorun(()=>{
        console.log(newStore.number);
      })
    }
    ```

## **4. mobx-react 的使用**

*   **(1) react 组件里使用 @observer**

    *   `observer`  函数/装饰器可以用来将 React 组件转变成响应式组件。

*   **(2) 可观察的局部组件状态**

    *   `@observable`  装饰器在 React 组件上引入可观察属性。而不需要通过 React 的冗长和强制性的 `setState`  机制来管理。

    ```javascript
    import {observer} from "mobx-react"
    import {observable} from "mobx"

    @observer class Timer extends React.Component {
      @observable secondsPassed = 0

      componentWillMount() {
        setInterval(() => {
          this.secondsPassed++
        }, 1000)
      } // 如果是严格模式需要加上 @action 和 runInAction

      //一个新的生命周期钩子函数 componentWillReact
      //当组件因为它观察的数据发生了改变，它会安排重新渲染，
      //这个时候 componentWillReact 会被触发
      componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
      }

      render() {
        return (<span>Seconds passed: { this.secondsPassed } </span> )
      }
    }

    ReactDOM.render(<Timer />, document.body)
    ```

*   **(3) Provider 组件**

    *   它使用了 React 的上下文(context)机制，可以用来向下传递 stores。 要连接到这些 stores，需要传递一个 stores 名称的列表给 inject，这使得 stores 可以作为组件的 props 使用。`this.props`

    ```javascript
    class Store {
      @observable number = 0;
      @action add = () => {
        this.number++;
      }
    }
    export default new Store() // 导出 Store 实例
    
    @inject("kerwinstore")
    @observer // 需要转换为响应式组件
    class Child extends Component{
      render(){
        return <div>
          Child --{this.props.kerwinstore.number}
        </div>
      }
    }
    
    @inject("kerwinstore")
    class Middle extends Component{
      render(){
        return <div>
          Middle-<button onClick={()=>{
            this.props.kerwinstore.add();
          }}>test</button>
          <Child/>
        </div>
      }
    }
    
    // 通过 provider 传 store 进去
    <Provider kerwinstore={store}>
      <Middle/>
    </Provider>
    ```

## **5. 支持装饰器**

*   创建 `.babelrc`

    ```json
    {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": [
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ]
      ]
    }
    ```

*   创建 `config-overrides.js`

    ```javascript
    const path = require('path')
    const { override, addDecoratorsLegacy } = require('customize-cra')

    function resolve(dir) {
      return path.join(__dirname, dir)
    }

    const customize = () => (config, env) => {
      config.resolve.alias['@'] = resolve('src')
      if (env === 'production') {
        config.externals = {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
      return config
    };

    module.exports = override(addDecoratorsLegacy(), customize())
    ```

*   安装依赖

    ```bash
    npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env
    npm i customize-cra react-app-rewired
    ```

*   修改 `package.json`

    ```json
    ...
    "scripts": {
      "start": "react-app-rewired start",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test",
      "eject": "react-app-rewired eject"
    },
    ...
    ```

# 三.TS (TypeScript)

## **1. TypeScript 介绍**

*   **定位：**  静态类型语言，在写代码阶段就能检查错误，而非运行阶段。
*   **优点：**
    *   类型系统是最好的文档，增加了代码的可读性和可维护性。
*   **缺点：**
    *   有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）等。
*   **本质：**  TS 最后被编译成 JS。

## **2. 安装**

```bash
create-react-app my-app --template typescript
```

## **3. 声明2**

*   **方式一：**  在当前文件加上 `declare const $: any;`
*   **方式二：**  安装类型定义文件

    ```bash
    npm i @types/jquery  @types 是 npm 的一个分支，用来存放 *.d.ts 文件
    npm i  --save react-router-dom
    npm i  --save @types/react-router-dom // 编译器需要通过这个声明文件，进行类型检查工作
    ```

## **4. 变量声明**

```typescript
// String(原生的构造函数) vs string (ts 中的类型)
var myname: string = "字符";
var mybool: boolean = false;
var mynumber: number = 100;
var mylist: Array<string> = ["111","222","3333"];

var myname2: string | number | boolean = 100; // 联合类型
var myname3: string | number = "kerwin";
var mylist2: Array<string| number> = [1,2,"kerwin"];
var mylist3:(string| number)[] = [1,2,"kerwin"];
```

## **5. 定义普通函数**

```typescript
// 接口描述形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

// 传参
function Test(list: String[], text?: String, ...args: String[]): void {
  console.log(list, text, args)
}

Test(["1111","2222"])
// list:["1111","2222"] text: undefined args: []
Test(["0","1"],"a","b","c")
// list:["0","1"] text: "a" args: ["b","c"]

// 类型断言 as
function Test( mytext: string | number ) {
}
console.log((mytext as string).length) // 对
console.log((mytext as any).length) // 对
console.log((mytext as string[]).length) // 错，原声明没有这个类型，无法断言
```

## **6. 定义普通类**

```typescript
interface MyInter {
  name: String, // 必选属性
  readonly country: String, // 只读属性
  getName(): void // 定义方法
}

class MyObj implements MyInter {
  name = "kerwin"
  country = "China"
  private age = 100 // 私有属性， 不能在接口定义

  getName() {
    // ...
  }

  private getAge() {
    // ...
  } // 私有方法， 不能在接口定义
}
```

## **7. 定义类组件**

```typescript
interface PropInter {
  name: string | number;
  firstName?: string; // 可选属性
  lastName?: string; // 可选属性
  // [propName: string]: any 任意属性
}

interface StateInter {
  count: number
}

// 根组件 ，第一个参数可以传 any
class HelloClass extends React.Component<PropInter, StateInter> {
  state: StateInter = {
    count: 0,
  }; // setState 时候也才会检查

  static defaultProps = {  // 属性默认值
    name: "default name"
    firstName: "",
    lastName: "",
  };
}
```

## **8. 定义函数式组件**

```typescript
// 根组件
const App: React.FC = (props) => {
  console.log(props)
  const [name, setname] = useState<string>("kerwin")
  return <div>
    app
  </div>
}

// 子组件接受属性 - 1
interface iprops  {
  count: number
}

const Child: React.FC<iprops> = (props) => {
  return <div>
    child-{props.count}
  </div>
}

// 子组件接受属性 - 2
const Child = (props: iprops) => {
  return <div>
    child-{props.count}
  </div>
}

// useRef
const mytext = useRef<HTMLInputElement>(null)
<input type="text" ref={mytext}/>
useEffect(() => {
  console.log(mytext.current && mytext.current.value)
}, [])

// useContext
interface IContext {
  call: string
}

const GlobalContext = React.createContext<IContext>({
  call: "" // 定义初始值, 按照接口规则
})

<GlobalContext.Provider value={{
  call: "电话"
}}>
  ....
</GlobalContext.Provider>

const {call} = useContext(GlobalContext)

// useReducer
interface IPrevState {
  count: number
}

interface IAction {
  type: string,
  payload: any
}

function reducer (prevState: IPrevState, action: IAction) {
  .....
  return prevState
}

const [state, dispatch] = useReducer(reducer, {
  count: 1
})

dispatch({
  type: "Action1",
  payload: []
})
```

## **9. 父子通信**

```typescript
// 父组件调用
<Child key={index} item={item} index={index} cb={(index) => {
  var newlist = [...list]
  newlist.splice(index, 1)
  setList(newlist)
}}/>

// 子组件
interface ItemType {
  item: string,
  index: number, // 定义接口
  cb: (param: number) => void // 定义接口
}

const Child = (props: ItemType) => {
  let {index, item, cb} = props
  return <div >{item}
    <button onClick={() => cb(index)}>del-{index}</button>
  </div>
}
```

## **10. 路由**

*   **编程式导航**

    ```typescript
    // 使用编程式导航，需要引入接口配置
    import { RouteComponentProps } from "react-router-dom";

    interface IProps { 自己定义的接口 }
    type HomeProps = IProps & RouteComponentProps; // 两个接口属性都支持
    interface IState {}

    class Home extends React.Component<HomeProps, IState> {
      private handleSubmit = async () => {
        // code for API calls
        this.props.history.push("/home");
      };
    }

    public render(): any {
      return <div>Hello</div>;
    }
    ```

*   ## **动态路由**

    ```typescript
    interface IParams {
      id: string
    }
    
    // RouteComponentProps 是一个泛型接口
    class Detail extends Component< RouteComponentProps<IParams> > {
      componentDidMount() {
        console.log(this.props.match.params.id)
      }
    
      render() {
        return <div>
          detail
        </div>
      }
    }
    ```

## **11. Redux**

```typescript
import {createStore} from 'redux'

interface ActionInter {
  type: String,
  payload: any
}

const reducer  = (prevState = {}, action: ActionInter) => {
  return action.payload
}

const store = createStore(reducer, // enhancer)
export default store
```

# 四.styled-components

*   通过 JavaScript 改变 CSS 编写方式的解决方案之一，从根本上解决常规 CSS 编写的一些弊端。
*   通过 JavaScript 来为 CSS 赋能，我们能达到常规 CSS 所不好处理的逻辑复杂、函数方法、复用、避免干扰。样式书写将直接依附在 JSX 上面，HTML、CSS、JS 三者再次内聚。
*   all in js 的思想

## 1.**基本用法**

```javascript
const StyleApp = styled.div`
  background: yellow;
  border: 1px solid black;
  ul {
    li {
      color: red;
    }
  }
  &:hover {
    background: pink
  } // pc 测试
`

/*
<StyleApp>
  <ul>
    <li>1111</li>
    <li>22222</li>
  </ul>
</StyleApp>
*/
```

## 2.**透传 props**

```javascript
const StyledInput = styled.input`
  color: red;
  background: yellow;
  border: none;
  border-radius: 3px;
`

<StyledInput type="text" placeholder="okok"/>
```

## 3.**基于 props 做样式判断**

```javascript
const StyledButton = styled.button`
  background: ${props => props.bg || 'blue'}
`

/*<StyledButton>click</StyledButton>
<StyledButton bg="red">click</StyledButton>*/
```

## 4.**样式化任意组件(一定要写 className )**

```javascript
const Child = (props) => <div className={props.className}>child</div>
const StyledChild = styled(Child)`
  background: red;
`

<StyledChild/>
```

## 5.**扩展样式**

```javascript
const MyButton = styled.button`
  background: yellow;
`

const BigButton = styled(MyButton)`
  height: 100px;
  width: 100px;
`
```

## 6.**加动画**

```javascript
import styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  width: 100px;
  height: 100px;
  background: yellow;
  animation: ${rotate360} 1s linear infinite;
`
```

# 五.单元测试

## **挂载组件**

```javascript
import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

// 在使用 Enzyme 前需要先适配 React 对应的版本
Enzyme.configure({ adapter: new Adapter() })

it('挂载拿到状态', () => {
  const app = mount(<App />);
  expect(app.state().name).toEqual('kerwin');
  expect(app.state().age).toEqual(100);
})

/*
.text()：返回当前组件的文本内容
.html()：返回当前组件的HTML代码形式
.props()：返回根组件的所有属性
.prop(key)：返回根组件的指定属性
.state([key])：返回根组件的状态
.setState(nextState)：设置根组件的状态
*/
.setProps(nextProps)：设置根组件的属性
```

## **测试组件渲染出来的 HTML**

```javascript
it('组件渲染出来的 HTML', () => {
  const app = mount(<App />);
  expect(app.find('#myid').text()).toEqual('kerwin');
})
```

## **模拟用户交互**

```javascript
it('模拟用户交互', () => {
  const app = mount(<App />);
  app.find('#mybtn').simulate('click')
  expect(app.state().name).toEqual('xiaoming');
})
```

# 六、redux-saga

*   在 saga 中，全局监听器和接收器使用 Generator 函数和 saga 自身的一些辅助函数实现对整个流程的管控

**代码实现**

```javascript
// index.js
import {createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import {reducer} from './reducer'
import mySagas from './saga'

const sagaMiddleware = createSagaMiddleware();// 创建中间件
const store = createStore(reducer, {list: []}, applyMiddleware(sagaMiddleware))

// 注意运行的时机是在 store 创建好了之后
sagaMiddleware.run(mySagas);

export default store

// saga.js
import {takeEvery, put} from 'redux-saga/effects'
import {changeList} from './action'

function *mySagas() {
  // 监听 GET_LIST
  // 在每个 `监听 GET_LIST` action 被 dispatch 时调用 getList
  yield takeEvery("GET_LIST", getList);
  // yield takeEvery("DELETE_LIST", deleteList);
}

function *getList() {
  // 异步处理
  let res = yield new Promise(resolve => {
    setTimeout(() => {
      resolve(["1111","2222","3333"])
    }, 2000)
  })
  yield put(changeList(res)) // 发出新的 action
}

export default mySagas

// action.js
export const changeList = (value) => {
  return {
    type: "CHANGE_LIST",
    payload: value
  }
}

export const getSaAction = () => {
  // GET_LIST 被 saga 监听
  return {
    type: "GET_LIST"
  }
}

// reducer.js
export const reducer = (prevState, action) => {
  let {type, payload} = action;
  switch(type) {
    case "CHANGE_LIST":
      let newstate = {...prevState}
      newstate.list = [...newstate.list, ...payload]
      return newstate
    default:
      return prevState
  }
}

// App.js
class App extends Component {
  componentDidMount() {
    store.subscribe(() => {
      console.log(store.getState())
    })
  }

  handleClick = () => {
    store.dispatch(getSaAction())
  }

  render() {
    return <div >
      <button onClick={this.handleClick}>获取异步</button>
    </div>
  }
}
```

 好的，我帮你整理和更新了你提供的 React 笔记，并进行了一些适当的修改，使其更清晰易懂。

# 七. React 补充

## 1. Portal

**概念：** Portal 提供了一种将子节点渲染到父组件 DOM 节点之外的 DOM 节点的能力。

**1.1 用法**

*   **普通组件：** 子组件的元素会挂载到父组件的 DOM 节点中。

    ```jsx
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    ```

*   **Portal 组件：**  React 不再创建 div 节点，而是将子元素渲染到指定的 DOM 节点上。`domNode` 是一个有效的、任意位置的 DOM 节点。

    ```jsx
    render() {
      return ReactDOM.createPortal(
        this.props.children,
        domNode
      );
    }
    ```

*   **典型应用场景：** 当父组件的 DOM 元素有 `overflow: hidden` 或 `z-index` 样式，而子元素需要超出父元素的盒子显示时，可以使用 Portal。 例如，对话框、悬浮框和小提示。

**1.2 Portal 中的事件冒泡**

虽然通过 Portal 渲染的元素在父组件的盒子之外，但渲染的 DOM 节点仍在 React 的元素树上。 因此，在该 DOM 元素上的点击事件仍然可以在 DOM 树中被监听到。

**1.3 示例代码**

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const getDiv = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
};

const withPortal = (WrappedComponent) => {
  class AddPortal extends Component {
    constructor(props) {
      super(props);
      this.el = getDiv();
    }

    componentWillUnmount() {
      document.body.removeChild(this.el);
    }

    render(props) {
      return ReactDOM.createPortal(<WrappedComponent {...props} />, this.el);
    }
  }

  return AddPortal;
};

class Modal extends Component {
  render() {
    return (
      <div>
        <div>a modal content</div>
        <button type="button">Click</button>
      </div>
    );
  }
}

const PortalModal = withPortal(Modal);

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <h3>ppppppppp</h3>
        <h3>num: {this.state.clicks}</h3>
        <PortalModal />
      </div>
    );
  }
}

export default Page;
```

## 2. Lazy 和 Suspense

**2.1 React.lazy 定义**

`React.lazy` 函数允许你像渲染常规组件一样处理动态引入（的组件），实现懒加载。

**2.2 为什么代码要分割（Code Splitting）**

当程序越来越大，代码量越来越多时，一个页面上可能会堆积很多功能，其中有些功能可能用不到，但仍然会被下载和加载。 代码分割可以优化加载性能，类似于图片懒加载的理论。

**2.3 实现原理**

当 Webpack 解析到 `import()` 语法时，它会自动地开始进行代码分割，将代码分割成单独的文件。 当使用到这些文件的时候，才会异步加载。

**2.4 解决方案**

`React.lazy` 和常用的第三方库 `react-loadable` 都使用了代码分割的原理，并配合 Webpack 进行代码打包拆分，从而达到异步加载的目的，大大提高首屏渲染速度。

**注意：** `React.lazy` 不支持服务端渲染，此时 `react-loadable` 是一个不错的选择。

**2.5 如何使用 React.lazy**

以下示例代码使用 `create-react-app` 脚手架搭建：

*   **OtherComponent.js 文件内容**

    ```jsx
    import React from 'react';

    const OtherComponent = () => {
      return (
        <div>
          我已加载
        </div>
      );
    };

    export default OtherComponent;
    ```

*   **App.js 文件内容**

    ```jsx
    import React, { Suspense, Component } from 'react';
    import './App.css';
    
    // 使用 React.lazy 导入 OtherComponent 组件
    const OtherComponent = React.lazy(() => import('./OtherComponent'));
    
    export default class App extends Component {
      state = {
        visible: false
      };
    
      render() {
        return (
          <div className="App">
            <button onClick={() => {
              this.setState({ visible: true });
            }}>
              加载 OtherComponent 组件
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              {
                this.state.visible
                  ?
                  <OtherComponent />
                  :
                  null
              }
            </Suspense>
          </div>
        );
      }
    }
    ```

    **解释：**

    *   使用 `React.lazy` 导入 `OtherComponent` 组件。
    *   使用 `Suspense` 组件包裹 `OtherComponent`，并指定 `fallback` 属性，用于在组件加载时显示 loading 状态。
    *   当点击按钮时，`OtherComponent` 组件才会异步加载。

**2.6 Suspense**

如果在 App 渲染完成后，包含 `OtherComponent` 的模块还没有被加载完成，可以使用加载指示器为此组件做优雅降级。 使用 `Suspense` 组件来解决这个问题。

**注意：** 使用 `Suspense` 的时候，`fallback` 属性必须存在且有内容，否则会报错。

## 3. forwardRef

**概念：** 引用传递（Ref forwarding）是一种通过组件向子组件自动传递引用 `ref` 的技术。

**使用场景：** 对于应用者的大多数组件来说没有什么作用。但是对于有些重复使用的组件，可能有用。 例如某些 `input` 组件，需要控制其 `focus`，本来是可以使用 `ref` 来控制，但是因为该 `input` 已被包裹在组件中，这时就需要使用 `Ref forward` 来透过组件获得该 `input` 的引用。 可以透传多层。

**3.1 未使用 forwardRef**

*   **子组件**

    ```jsx
    class Child extends Component {
      componentDidMount() {
        this.props.callback(this.refs.myinput);
      }

      render() {
        return <div>
          <input type="text" ref="myinput" />
        </div>;
      }
    }
    ```

*   **父组件**

    ```jsx
    class App extends Component {
      render() {
        return (
          <div>
            <Child callback={(el) => {
              el.focus();
            }} />
          </div>
        );
      }
    }
    ```

**3.2 使用 forwardRef**

*   **子组件**

    ```jsx
    import React, { forwardRef } from 'react';

    const Child = forwardRef((props, ref) => {
      return <div>
        <input type="text" ref={ref} />
      </div>;
    });
    ```

*   **父组件**

    ```jsx
    import React, { Component, createRef } from 'react';
    
    class App extends Component {
      myref = createRef();
    
      componentDidMount() {
        this.myref.current.focus();
      }
    
      render() {
        return (
          <div>
            <Child ref={this.myref} />
          </div>
        );
      }
    }
    ```

## 4. Functional Component 缓存 (React.memo)

**4.1 为什么起 memo 这个名字？**

在计算机领域，记忆化（Memoization）是一种主要用来提升计算机程序速度的优化技术方案。 它将开销较大的函数调用的返回结果存储起来，当同样的输入再次发生时，则返回缓存好的数据，以此提升运算效率。

**4.2 作用**

组件仅在它的 `props` 发生改变的时候进行重新渲染。 通常来说，在组件树中 React 组件，只要有变化就会走一遍渲染流程。 但是使用 `React.memo()`，我们可以仅仅让某些组件进行渲染。

**4.3 与 PureComponent 区别**

*   `PureComponent` 只能用于 `class` 组件。
*   `memo` 用于 `functional` 组件。

**4.4 用法**

```jsx
import React, { memo } from 'react';

const Child = memo(() => {
  return <div>
    <input type="text" />
  </div>;
});
```

或者

```jsx
import React, { memo } from 'react';

const Child = () => {
  return <div>
    <input type="text" />
  </div>;
};

const MemoChild = memo(Child);
```



 好的，我来对你提供的 React 扩展内容进行完善和补充，使其更全面和易于理解。

# **八. React 扩展**

## **1. GraphQL**

*   **1.1 介绍与 Hello World**

    GraphQL 是一种为 API 而生的查询语言，也是一种 API 数据查询规范。它允许客户端精确地请求所需的数据，避免了传统 REST API 中常见的过度获取（over-fetching）和获取不足（under-fetching）问题。

    **优点：**

    *   **精确数据请求：** 客户端可以指定需要哪些字段，服务器只返回这些字段。
    *   **强大的类型系统：** GraphQL 使用类型系统来描述数据，有助于客户端和服务端之间的沟通，并提供更好的错误检查。
    *   **自省能力：** 客户端可以查询 GraphQL 服务的 schema，了解可用数据类型和查询方式。
    *   **版本控制：** GraphQL 允许在同一个 endpoint 上演化 API，而无需创建新的版本。

    **Hello World 示例（服务端 - Node.js + Express + graphql）：**

    ```javascript
    const express = require('express');
    const { graphqlHTTP } = require('express-graphql');
    const { buildSchema } = require('graphql');

    // 1. 定义 Schema
    const schema = buildSchema(`
      type Query {
        hello: String
      }
    `);

    // 2. 定义 Resolver (处理函数)
    const root = {
      hello: () => 'Hello world!'
    };

    // 3. 创建 Express 应用
    const app = express();

    // 4. 添加 GraphQL 中间件
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true, // 启用 GraphiQL 图形界面
    }));

    // 5. 启动服务器
    app.listen(4000, () => {
      console.log('Running a GraphQL API server at http://localhost:4000/graphql');
    });
    ```

    **客户端查询：**

    ```graphql
    query {
      hello
    }
    ```

    **服务端响应：**

    ```json
    {
      "data": {
        "hello": "Hello world!"
      }
    }
    ```

    **解释：**

    *   **Schema：**  定义了 API 的数据结构和可用查询。 `type Query` 定义了根查询类型，`hello: String` 定义了一个名为 `hello` 的字段，返回字符串类型。
    *   **Resolver：**  为 Schema 中的每个字段提供一个函数，用于获取数据。  `hello: () => 'Hello world!'`  定义了 `hello` 字段的 resolver，简单地返回 "Hello world!" 字符串。
    *   **GraphiQL：**  一个交互式的 GraphQL IDE，用于探索 API、编写和执行查询。

*   **1.2 参数类型与传递**

    GraphQL 支持多种参数类型，包括：

    *   **Int：** 整数
    *   **Float：** 浮点数
    *   **String：** 字符串
    *   **Boolean：** 布尔值
    *   **ID：**  唯一标识符（通常是字符串）
    *   **Lists：**  数组
    *   **Non-Null：**  表示字段不能为空

    **示例：**

    ```graphql
    type Query {
      user(id: ID!): User
      users(limit: Int, offset: Int): [User]
    }

    type User {
      id: ID!
      name: String!
      email: String
    }
    ```

    **客户端查询示例：**

    ```graphql
    query {
      user(id: "123") {
        id
        name
        email
      }
      users(limit: 10, offset: 20) {
        id
        name
      }
    }
    ```

    **服务端 Resolver 示例：**

    ```javascript
    const root = {
      user: (args) => {
        // args.id 包含客户端传递的 ID
        // 在数据库中查找用户并返回
        return { id: args.id, name: 'John Doe', email: 'john.doe@example.com' };
      },
      users: (args) => {
        // args.limit 和 args.offset 包含客户端传递的 limit 和 offset
        // 从数据库中获取用户列表并返回
        return [
          { id: '1', name: 'Alice' },
          { id: '2', name: 'Bob' }
        ];
      }
    };
    ```

*   **1.3 Mutation**

    Mutation 用于修改服务端数据。  它类似于 REST API 中的 POST、PUT、PATCH 和 DELETE 请求。

    **示例：**

    ```graphql
    type Mutation {
      createUser(name: String!, email: String!): User
      updateUser(id: ID!, name: String, email: String): User
      deleteUser(id: ID!): Boolean
    }
    ```

    **客户端 Mutation 示例：**

    ```graphql
    mutation {
      createUser(name: "Jane Doe", email: "jane.doe@example.com") {
        id
        name
        email
      }
    }

    mutation {
      updateUser(id: "123", name: "Jane Updated") {
        id
        name
        email
      }
    }

    mutation {
      deleteUser(id: "123")
    }
    ```

    **服务端 Resolver 示例：**

    ```javascript
    const root = {
      createUser: (args) => {
        // args.name 和 args.email 包含客户端传递的数据
        // 创建新用户并返回
        return { id: 'new-user-id', name: args.name, email: args.email };
      },
      updateUser: (args) => {
        // args.id, args.name 和 args.email 包含客户端传递的数据
        // 更新用户并返回
        return { id: args.id, name: args.name, email: args.email };
      },
      deleteUser: (args) => {
        // args.id 包含客户端传递的 ID
        // 删除用户并返回 true/false
        return true;
      }
    };
    ```

*   **1.4 结合数据库**

    GraphQL 可以与各种数据库集成，例如 MongoDB、MySQL、PostgreSQL 等。

    **示例（MongoDB + Mongoose）：**

    ```javascript
    const mongoose = require('mongoose');
    const { buildSchema } = require('graphql');
    const { graphqlHTTP } = require('express-graphql');
    const express = require('express');

    // 1. 连接数据库
    mongoose.connect('mongodb://localhost:27017/graphql-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // 2. 定义 Schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: String
    });

    // 3. 创建 Model
    const User = mongoose.model('User', userSchema);

    // 4. 定义 GraphQL Schema
    const schema = buildSchema(`
      type User {
        id: ID!
        name: String!
        email: String
      }

      type Query {
        user(id: ID!): User
        users: [User]
      }

      type Mutation {
        createUser(name: String!, email: String!): User
      }
    `);

    // 5. 定义 Resolver
    const root = {
      user: async (args) => {
        return await User.findById(args.id);
      },
      users: async () => {
        return await User.find();
      },
      createUser: async (args) => {
        const user = new User({ name: args.name, email: args.email });
        return await user.save();
      }
    };

    // 6. 创建 Express 应用
    const app = express();

    // 7. 添加 GraphQL 中间件
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    }));

    // 8. 启动服务器
    app.listen(4000, () => {
      console.log('Running a GraphQL API server at http://localhost:4000/graphql');
    });
    ```

*   **1.5 客户端访问**

    可以使用各种 GraphQL 客户端库来访问 GraphQL API，例如：

    *   **Apollo Client：**  一个功能强大的 GraphQL 客户端，支持 React、Angular、Vue 等框架。
    *   **Relay：**  Facebook 开发的 GraphQL 客户端，专注于性能和数据一致性。
    *   **graphql-request：**  一个轻量级的 GraphQL 客户端，易于使用。

    **示例（使用 `graphql-request`）：**

    ```javascript
    import { GraphQLClient, gql } from 'graphql-request';

    const endpoint = 'http://localhost:4000/graphql';

    const graphQLClient = new GraphQLClient(endpoint);

    const query = gql`
      query {
        users {
          id
          name
          email
        }
      }
    `;

    graphQLClient.request(query)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    ```

*   **1.6 结合 React**

    可以使用 Apollo Client 或 Relay 等库将 GraphQL 集成到 React 应用中。

    **示例（使用 Apollo Client）：**

    ```javascript
    import React from 'react';
    import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
    
    // 1. 创建 Apollo Client
    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache()
    });
    
    // 2. 定义 GraphQL 查询
    const GET_USERS = gql`
      query {
        users {
          id
          name
          email
        }
      }
    `;
    
    // 3. 创建 React 组件
    function Users() {
      const { loading, error, data } = useQuery(GET_USERS);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error : {error.message}</p>;
    
      return (
        <ul>
          {data.users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      );
    }
    
    // 4. 将 Apollo Client 集成到 React 应用中
    function App() {
      return (
        <ApolloProvider client={client}>
          <div>
            <h2>My first Apollo app 🚀</h2>
            <Users />
          </div>
        </ApolloProvider>
      );
    }
    
    export default App;
    ```

## **2. dva**

*   **介绍**

    dva 是一个基于 Redux、Redux-Saga 和 React-Router 的轻量级前端框架。它简化了 React 应用的状态管理和数据流，并提供了一些常用的工具和约定，使开发更加高效。

    **核心概念：**

    *   **Model：**  包含 state、reducers、effects 和 subscriptions。
        *   **state：**  应用的状态数据。
        *   **reducers：**  纯函数，用于修改 state。
        *   **effects：**  处理异步操作，例如 API 请求。
        *   **subscriptions：**  监听数据源，例如键盘事件、路由变化等。
    *   **Router：**  管理应用的路由。
    *   **Component：**  React 组件，用于渲染 UI。
    *   **Connect：**  将 Model 中的 state 和 dispatch 方法连接到 React 组件。

*   **dva 应用的最简结构**

    ```javascript
    import dva from 'dva';
    import React from 'react';

    const App = () => <div>Hello dva</div>;

    // 创建应用
    const app = dva();

    // 注册视图
    app.router(() => <App />);

    // 启动应用
    app.start('#root');
    ```

*   **数据流图**

    (建议插入一张 dva 的数据流图，描述 Action -> Reducer -> State -> View 的过程)

*   **dva-cli**

    `dva-cli` 已经不推荐使用，建议使用 `create-umi` 来创建 dva 应用。

**3. umi**

*   **介绍**

    umi 是一个可插拔的企业级 React 应用框架。它提供了开箱即用的功能，例如路由、构建、部署等，并支持插件扩展，可以满足各种复杂的业务需求。

    **核心特性：**

    *   **约定式路由：**  根据 `pages` 目录自动生成路由配置。
    *   **插件机制：**  通过插件扩展 umi 的功能。
    *   **TypeScript 支持：**  内置 TypeScript 支持。
    *   **Mock 数据：**  方便开发和测试。
    *   **代理：**  解决跨域问题。
    *   **dva 集成：**  无缝集成 dva 框架。
    *   **Ant Design 集成：**  方便使用 Ant Design 组件库。

*   **安装脚手架**

    ```bash
    mkdir myapp && cd myapp
    npx @umijs/create-umi-app
    ```

*   **目录结构**

    ```
    myapp/
    ├── .umi/             # 临时文件，编译产物
    ├── mock/            # Mock 数据
    ├── pages/           # 页面文件
    ├── src/             # 源代码
    ├── .umirc.ts        # Umi 配置文件
    ├── package.json     # 项目依赖
    └── README.md        # 项目说明
    ```

*   **路由**

    umi 会根据 `pages` 目录自动生成路由配置。

    *   **(1) 基础路由**

        在 `pages` 目录下创建的每个文件都会自动生成一个路由。例如，`pages/index.js` 会生成 `/` 路由，`pages/film.js` 会生成 `/film` 路由。

    *   **(2) 重定向**

        ```javascript
        // pages/index.js
        import React from 'react';
        import { Redirect } from 'umi';

        export default () => {
          return (
            <Redirect to="/film" />
          );
        }

        // 在 film 中的 _layout.js
        import { Redirect } from 'umi';

        export default function Film(props) {
          if (props.location.pathname === '/film' || props.location.pathname === '/film/') {
            return <Redirect to="/film/nowplaying" />
          }
          return (
            <div>
              {props.children}
            </div>
          )
        }
        ```

    *   **(3) 嵌套路由**

        在 `pages` 目录下创建目录，目录下的文件会自动生成嵌套路由。例如，`pages/film/nowplaying.js` 会生成 `/film/nowplaying` 路由。  (注意:  如果嵌套路由不生效，尝试重启 umi 应用。)

    *   **(4) 动态路由**

        使用 `$` 符号定义动态路由参数。例如，`pages/detail/$id.js` 会生成 `/detail/:id` 路由。

        ```javascript
        // pages/detail/$id.js
        import React from 'react';
        import { useParams } from 'umi';

        export default () => {
          const { id } = useParams();

          return (
            <div>
              <h1>Detail Page</h1>
              <p>ID: {id}</p>
            </div>
          );
        }
        ```

    *   **(5) 路由拦截**

        使用 `wrappers` 属性可以对路由进行拦截，例如进行权限验证。

        ```javascript
        // center.tsx
        import React from 'react';

        const Center = () => {
          return (
            <div>
              <h1>center</h1>
            </div>
          );
        }

        Center.wrappers = ['@/wrappers/auth']
        export default Center

        // auth.tsx
        import React from 'react'
        import { Redirect } from 'umi'

        export default (props: any) => {
          const isLogin = localStorage.getItem("token")
          if (isLogin) {
            return <div>{props.children}</div>;
          } else {
            return <Redirect to="/login" />;
          }
        }
        ```

    *   **(6) hash 模式**

        ```javascript
        // .umirc.js
        export default {
          history: { type: 'hash' }
        }
        ```

    *   **(7) 声明式导航**

        ```javascript
        import React from 'react';
        import { NavLink } from 'umi'
        import style from './index.less'

        export default function (props: any) {
          if (props.location.pathname.includes('/detail')) {
            return <div>{props.children}</div>
          }
          return (
            <div>
              <ul>
                <li>
                  <NavLink to="/film" activeClassName={style.active}>film</NavLink>
                </li>
                <li>
                  <NavLink to="/cinema" activeClassName={style.active}>cinema</NavLink>
                </li>
                <li>
                  <NavLink to="/center" activeClassName={style.active}>center</NavLink>
                </li>
              </ul>
              {props.children}
            </div>
          );
        }
        ```

    *   **(8) 编程式导航**

        ```javascript
        import { history } from 'umi';
    
        history.push(`/detail/${item}`)
        ```

*   **Mock 功能**

    umi 约定 `mock` 文件夹下的文件或者 `page(s)` 文件夹下的 `_mock` 文件即 mock 文件。

    ```javascript
    // mock/api.js
    export default {
      // 支持值为 Object 和 Array
      'GET /api/users': { users: [1, 2] },
      // GET POST 可省略
      '/api/users/1': { id: 1 },

      // 支持自定义函数，API 参考 express@4
      'POST /api/users/create': (req, res) => { res.end('OK'); },
    }
    ```

*   **反向代理**

    ```javascript
    // .umirc.js
    export default {
      proxy: {
        '/ajax': {
          target: 'https://m.maoyan.com',
          // pathRewrite: { '^/api': '' },
          changeOrigin: true
        }
      },
    }
    ```

*   **Antd**

    ```javascript
    // .umirc.ts
    export default {
      antd: {
        //自定义配置
      }
    }

    //组件页面中使用
    import { Button } from 'antd-mobile'
    <Button type="primary">add</Button>
    ```

*   ### **dva 集成**

    *   **(1) 同步**

        ```javascript
        // .umirc.ts
        export default {
          dva: {
            //自定义配置
          }
        }

        // models/kerwin.js
        export default {
          //命名空间
          namespace: 'kerwin',
          state: {
            isShow: true,
            list: []
          },
          //处理state－－同步
          reducers: {
            //reducer简写， type类型是show的时候自动处理
            show(state, { payload }) {
              return { ...state, ...payload }
            },
            hide(state, { payload }) {
              return { ...state, ...payload }
            }
          },
          // yield表示后面的方法执行完以后 call表示调用一个api接口
          // put表示一个派发
          effects: {
            *showEffect(payload, { put }) {
              yield put({
                type: 'show',
                payload: {
                  isShow: true
                }
              })
            },
            *hideEffect(payload, { put }) {
              yield put({
                type: 'hide',
                payload: {
                  isShow: false
                }
              })
            }
          }
        }

        //根组件
        import { connect } from 'dva';

        function BasicLayout(props) {
          return (
            <div >
              {
                props.isShow ?
                  ...
                  : null
              }
              {props.children}
            </div>
          );
        }

        //state.kerwin 命名空间
        export default connect(state => state.kerwin)(BasicLayout);

        //detail.js
        import { connect, useDispatch } from 'dva';
        import { useEffect } from 'react';

        function Detail(props) {
          const dispatch = useDispatch()
          useEffect(() => {
            dispatch({
              type: "kerwin/hideEffect" //命名空间kerwin
            })
            return () => {
              dispatch({
                type: "kerwin/showEffect"//命名空间kerwin
              }
            )
          };
        }, [])
        return <div>
          Detail
        </div>
      }
      export default connect(state => state.kerwin)(Detail)
      ```

    *   **(2) 异步**

        ```javascript
        // models/kerwin.js
        import { getNowplaying } from '../util/getNowplaying';  //封装的fetch调用接口
        export default {
          ...
          reducers: {
            ...
            changeList(state, { payload }) {
              return { ...state, ...payload }
            }
          },
          // 异步
          // yield表示后面的方法执行完以后 call表示调用一个api接口
          effects: {
            ...
            *getListEffect(payload, { put, call }) {
              let res = yield call(getNowplaying, "test-by-kerwin")
              yield put({
                type: "changeList",
                payload: {
                  list: res
                }
              })
            }
          }
        }
        
        // /util/getNowplaying
        import { fetch } from 'dva' //dva内置的fetch
        export async function getNowplaying(value) {
          console.log(value) //value 是call的第二个参数
          var res = await fetch("/ajax/comingList?ci=65&token=&limit=10&optimus_uuid=43388C403C4911EABDC9998C784A573A4F64A16AA5A34184BADE807E506D749E&optimus_risk_level=71&optimus_code=10")
          var result = await res.json()
          return result.coming
        }
        
        // nowplaying.js
        import React, { useEffect } from 'react'
        import { connect, useDispatch } from 'dva';
        
        function Nowplaying(props) {
          let { list, loading } = props
          let dispatch = useDispatch()
          useEffect(() => {
            if (list.length === 0) {
              dispatch({
                type: "kerwin/getListEffect" //命名空间kerwin
              })
            }
          }, [list])
          return (
            <div>
              nowplaying--{loading.global ? '正在加载数据...' : ''}
              {
                // 遍历list
              }
            </div>
          )
        }
        export default connect(({ kerwin, loading }) => ({
          ...kerwin,
          loading
        }))(Nowplaying)
        ```
