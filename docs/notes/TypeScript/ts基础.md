---
title: ts基础
createTime: 2025/05/02 14:56:14
permalink: /article/v1vitd7s/
---
# 1. TypeScript 介绍

> Type + JavaScript    JavaScript 的超集(js有的ts都有)
>
> 增加了类型支持

![](.\imags6\1.png)

# 2. ts相对js优势

![](.\imags6\2.png)

# 3. ts包安装

命令

npm i -g typescript



tsc -v  查看版本

## 1.  ts 转换为js

命令 

tsc hello.js

![](.\imags6\3.png)

- 运行ts代码

  创建ts文件  --->   编译(tsc  文件名.ts)  --> 运行(node  文件名.js)

## 2. 简化Ts运行步骤

> 安装 ts-node包

命令

```
npm i -g ts-node
```

运行

```
ts-node 文件名.ts
```

添加tsconfig.json

```
{
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS" 
    }
  }
}
```

# 4. ts常用类型

## 1. 类型注解

```ts
: 类型    // 约定变量是什么类型 ，不可赋值其他类型
: number
```

## 2. 类型别名

> 同一类型 重复使用

```ts
type 类型别名 = 类型
type numStrArr = (number | string)[]
let arr: numberStrArr = [1, '2']
```

## 3. 类型注解使用

- 原始类型

  ```ts
  let num: number = 18
  let str: string = '张三'
  let isLoading: boolean = false
  let a: null = null
  let b: undefinde = undefinde
  let s: symbol = symbol()
  let a: null = null
  let b: undefinde = undefinde
  let s: symbol = symbol()
  ```

- 数组类型

  ```ts
  let numbers: number[] = [1, 3, 5]
  let numbers: string[] = ['a', 'b']
  let strings: Array<string> = ['a', 'b']  // 不推荐
  
  
  // 既要number 又要string的数组  // 联合类型
  let arr: (number | string)[] = [1, 'a']
  
  let arr3: number | string[] = 1
  ```

- 函数类型

  - 单独添加参数和返回值

  ```ts
  const add = (num1: number, num2: number): number => {
      return num1 + num2  //必须要有返回值
  }
  ```

  - 统一指定参数类型 返回值类型  必须是表达式函数

  ```ts
  const add: (num1: number, num2: number) => number = (num1, num2) => {
      return num1 + num2
  }
  ```

  - 没有返回值

  ```ts
  const greet = (name: string): void => {
      console.log(name)
  }
  ```

  - 可传可不穿【**可选参数后不可以有必选参数**】

  ```ts
  const add3 = (num1?: number, num2?: number): void => {
    console.log(num1)
    console.log(num2)
    
  }
  
  // add3(1, 2)
  add3(1)
  ```

- 对象类型 【**注意使用分号隔开**】

```ts
let obj: {name: string; age: number; add(num1: number, num2: number): number} = {
    name: '张三',
    age: 15,
    add(num1, num2) {
        return num1 + num2
    }
}



let obj1: {
  name: string
  age: number
  add(num1: number, num2: bunber): numbers
} =
{
  name: '张三',
  age: 18,
  add(num1, num2){
      return: num1 + num2
  }
}
```

- 对象数组类型

  ```ts
  interface User{
      name:string,
      age:number
  }
  let list:(User)[] = [{name:"黄四郎",age:45},{name:"马邦德",age:44}]
  ```

  

# 4. 接口

> 为了实现对象类型的复用

```ts
interface 类型名 {具体属性类名}
interface Iperson {
    namme: string
    age: number
    add(): void
}
```

## 1. 接口与类型别名的区别

- 相同点：都可以为对象定义重复类型

- 不同点：接口只可以为对象定义重复类名

  ​                类型别名既可以为对象也可以给其他对象定义

  ```ts
  type Iperson = {
      name: string
      age: numbert
      add(): void
  }
  
  let obj: Iperson = {
      name: '张三',
      age: 12,
      add() {
          
      }
  }
  ```

  ## 2. 接口继承

  > 如果两个接口有相同的属性类型，可以通过extends关键字继承  继承接口就有了被继承的全部类型属性

  ```ts
  interface Point2D {x: number; y: number}
  interface Point3D extends Point2D {z: number}
  ```

# 5. 元组

> 可以为数组限制数组的元素个数

```ts
let arr: [number, number] = [112.3, 13.2] // 只可以有2个元素
```

# 6. 类型推论

> 可以省略注解的书写
>
> - 使用场景
>
>   1. 在变量初始的时候赋予初始值
>
>   ```ts
>   let num = 12   // let num: number = 12
>   ```
>
>   1. 在函数参数指定类型后返回值注解可以不写
>
>   ```ts
>   const add = (num1: number, num2: number) =>{
>       return num1 + num2  // 返回值为number
>   }
>   ```
>
>   



# 7. 类型断言

> 在获取dom节点时，类型是 Element  此次只可以获取标签的公共属性
>
> 需要利用as 限制具体类型
>
> ```ts
> const a = document.querySelector('.a') as HTMLAnchorElement
> ```
>
> 可以利用 console.dir(节点)  查看类型

# 8. 字面量类型

> 就是为变量固定某一个值，和const一样

```ts
const str = 'abc' // 类型就是为 'abc'  只可以为 'abc'

let num: 18 = 18  // 这个值只可以为18
```

- 使用场景

  在一个函数里面只可以传入固定值

  ```ts
  const chang = (str: 'up' | 'left') => {
      // 参数只可以传入 'up' 'left'
  }
  ```

  

# 9. 枚举类型【还有值】

> 利用关键字 enum
>
> 枚举类型 = 字面量 + |  // 定义多个字面量类型

```ts
enum 枚举名称 {具体的字面量类型} // 不只是类型 还有值
enum Direction {Up, Down, Left, Right}
```

- 访问枚举成员

  ```ts
  enum Direction {Up, Down, Left, Right}
  Direction.Up  // 返回的是索引  默认值为0
  Direction[0]  / Up  访问值
  
  enum Direction {Up, Down, Left, Right}  0 1 2 3
  enum Direction {Up = 1, Down, Left, Right}  1 2 3 4
  ```

- 举例

  ```ts
  enum Direction {Up, Down, Left, Right}
  
  cont change = (direction: Direction) => {
      console.log(direction) // 0 索引
  }
  
  change(Direction.Up)
  ```

  ```ts
  enum Response1 {
    Success = "SUCCESS",
    Failure = "FAILURE"
  }
  console.log(Response.Success); // 输出 "SUCCESS" [3,4](@ref)
  ```

- **数字枚举**

  ```ts
  enum Direction {Up = 1, Down, Left, Right}  // 后面自动增加 1 2 3 4
  enum Direction {Up = 1, Down = 2, Left = 15, Right = 4}   1 2 15 4
  ```

  

- **字符串枚举注意点**

  ```ts
  enum Response1 {
    Success = "SUCCESS",
    Failure // 错误写法  // 第一个赋值字符串后  第二个必须赋值
  }
  console.log(Response.Success); // 输出 "SUCCESS" [3,4](@ref)
  ```




# 10. any类型【不推荐使用】

> any 是TypeScript的逃生舱  让ts的安全机制失效
>
> 默认的any类型   初始变量不负责，  函数参数不限定类型  所有这种情况时要注意添加类型

```ts
let num: any = 12
num = 'a'  // 不报错
a()  //不报错
```

# 11. typeof  的使用

> 可以根据上下文有点变量或属性(不可是函数调用类型) 来再用次类型  减少相同类型的多次书写

```ts
let user = {name: '张三', age: 13} 

let obj: typeof user  // 此时obj 就是{name: string, age: number} 类型
```



# 12. 类的基本定义[类也可使类型]

- 类的基本定义

```ts
class Person {
    // public 表示实例公共属性
    public name: string;
    public age: number;
    // public可以省略
    like: string;
    constructor(name: string, age: number, like: string) {
        this.name = name;
        this.age = age;
        this.like = like
    }
    // 实例方法
    public say(): string {
        return '你好啊，我是' + this.name;
    }
    // 静态方法
    static eat(food: string): string {
        return '我正在吃' + food;
    }
}
let p1 = new Person('张三', 22, '抽烟，喝酒，烫头');
console.log(p1);
```

- 类的简写

  ```ts
  class Person {
      // 省略写法，不需要提前定义类型
      // public name: string;
      // public age: number;
      // like: string;
      constructor( public name: string,  public age: number, public like: string) {
          // 省略写法，不需要再去对每个属性赋值
          // this.name = name;
          // this.age = age;
          // this.like = like
      }
      // 实例方法
      public say(): string {
          return '你好啊，我是' + this.name;
      }
      // 静态方法
      static eat(food: string): string {
          return '我正在吃' + food;
      }
  }
  ```

- 类的继承

```ts
class Ren {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    move() {
        console.log('移动')
    }
}

class User extends Ren{
    siHai() {
        conole.log('你好')
    }
}

let user = new User()
user.move()  // 可以访问父类的方法
```

- 类的实现

  ```ts
  interface Singable {
      sing(): void {}
  }
  
  class Person implements Singable {
      sing() {
          console.log('唱歌')
      }
  }
  ```

## 1. 类的修饰符

> 类的属性和方法 有特定的作用或者限制 就需要通过修饰符进行处理
>
> js中类的修饰符： public static readonly（只读）
>
> ts中类的修饰符：除了js类的三个修饰符之外，新增了：
>
> - public （公共） 公共属性、方法，可以在实例以及子类中访问
> - protected (保护) 只能在子类中访问该属性和方法
> - private（私有） 只能在当前类中访问该属性和方法
> - readonly(只读属性可以初始化)【只可以修饰属性】  防止构造函数外对变量的赋值

```ts
class Person {
    
    protected age!: number;
    private name!: string;
    public sex!: string;
  
    private getName() {}
    protected getAge() {}
    public getSex() {}
  
    // name 和 getName() 只能在 Person 中用 this 访问
  }
  class User extends Person {
    constructor() {
      super();
      // User中可以访问 getAge() 和 age 以及被 public 修饰的属性以及方法
    }
  }
  const person = new Person(); // person 只能访问到 getSex() 和 sex

```

注意： private 私有属性与方法 只能在当前类中使用，不能通过子类 和 this实例访问

```ts
class Person{
    private name:string;
    constructor(name:string){
        this.name = name;
    }
    private say(){
        return 'ssss';
    }
    // 私有方法只能通过当前类进行使用
    public xxx(){
        console.log(this.name);
        console.log(this.say())
    }

}

let p1 = new Person('张麻子');
// p1.name = '黄四郎'  // 私有属性 使用报错
// p1.say()   //私有方法调用报错
p1.xxx()     //通过实例正确的使用方法
console.log(p1);    //Person { name: '张麻子' }
```



# 13. 类型兼容性

> ts采用的是结构化类型系统
>
> 如果两个对象具有相同的形状，则认为他们是同一类型

```ts
class Point {x: number; y: number}
class Point2 {x: number; y: sumber}

const p: Point = new Point2()  // 不会报错
```

## 1. 对象类型的兼容

> 成员变量多的类型可以赋值给成员少的类型

```ts
interface A { x: number; }
interface B { x: number; y: string; }
let a: A = { x: 1 };
let b: B = { x: 1, y: "2" };
a = b; // 允许（B 的成员包含 A 的所有成员）[1,4](@ref)
// b = a; // 报错，缺少属性 y
```

## 2. 函数之间的兼容性

### 1. 参数数量函数

> 参数**少**的函数可以**赋值**给参数**多**的函数

```ts
type F1 = (a: number) => void;
type F2 = (a: number, b: string) => void;
let f1: F1 = (a) => {};
let f2: F2 = f1; // 允许（F1 参数更少）[1,3,4](@ref)
```

### 2. 父兼容子的参数[逆变]

> 父类型参数可以接受子类型参数

```ts
interface Parent { name: string; }
interface Child extends Parent { age: number; }
type FParent = (p: Parent) => void;
type FChild = (c: Child) => void;
let fChild: FChild = (c) => {};
let fParent: FParent = fChild; // 允许（参数逆变）[5](@ref)
```

### 3. 函数返回值类型

> 原始类型只要类型相同就可以赋值
>
> 对象类型  满足返回最多的 可以赋值给返回值少的

```ts
// 原始类型
type F1 = () => string
type F2 = () => string
let f11: F1
let f22: F2
f11 = f22
f22 = f11

//对象类型
type F1 = () => {x: number}
type F2 = () => {x: numbe; y: number}
let f11: F1
let f22: F2
f11 = f22  // 多给少

```

# 14. 交叉类型

> 类似于类的接口继承，用于组合对公类型为 一个类型 &

```ts
interface Person {name: string}
interface Contact {age: number}
type Per = Person & Contact

let obj: Per = {
    name: '张三',
    age: 18
}
```

## 1. 交叉类型与接口继承的区别

![](.\imags6\4.png)

# 15. 泛型

- 泛型写法

```ts
function fn<T>(a:T):T{
    return a;
}
fn(100)  //100
fn('张麻子')  //张麻子
fn(true)  //true
//调用时传入泛型的类型
fn<number>(1000)  //1000
fn<object>({name:'张麻子'}) //{name:'张麻子'}
```

- 简写方式

  ![](.\imags6\1.webp)

-  多个泛型参数

```tsx
function fn<N,M>(a:N,b:M):N{
    return a;
}
console.log( fn(1000,'sss')   );   //1000
```

- 泛型 约束

> 使用泛型之后 会造成一些问题： 泛型之间不能使用运算符，泛型拿到数组、元祖之后没有length
>
> 解决length问题需要使用到 泛型约束
>
> 泛型约束：可以理解为 该泛型可以包含的属性及属性类型
>
> 这里出现 `extends` 关键字，此处表示泛型必须包含某种类型，从而在调用时约束了传入的类型。

```tsx
function fn<T>(arr:T):number{
    return arr.length;    //报错  泛型T 不存在 length属性
}
console.log( fn([100,200,300])  );
```

解决办法

```ts
function fn<T>(arr: T[]): T[] {
    console.log(arr.length) // 2
}

fn([1,2])

// 定义泛型的约束
interface Len{
    length:number
}
function fn<T extends Len>(arr:T):number{ // extends Len   T必须要有length属性  这样T类型的arr就可以访问length属性了
    return arr.length;    
}
console.log( fn([100,200,300]));   //3
```

- 多个泛型参数

```tsx
function fn<N,M>(a:N,b:M):N{
    return a;
}
console.log( fn(1000,'sss')   );   //1000
```

案例：创建一个函数来获取对象有的属性值

```ts
function getValue<T, k extends keyof T>(obj: T, key: K) { // keyof 生成对象属性的类型  'name' | 'age'
    console.log(obj[key])
}
getValue({name: '张三'，age: 14}, name) // 这样就限制了第二个参数必须传对象有的属性
```

- 泛型接口

  ![](.\imags6\5.png)

- 泛型问题

> 泛型之间不能使用运算符
>
> 解决方案： 函数重载

```tsx
function add<T>(a:T,b:T):T{
    return a+b  //报错 两个泛型不能进行加法运算
}
```

- 函数重载

> 需要注意的是只有最后一个才是真正的函数，其他的地方只能是函数类型的定义。

```tsx
function add(a: string, b: string): string
function add(a: number, b: number): number
function add(a: any, b: any) {
    return a + b;
}
console.log(add(11,22));    //33
console.log(add('ssss','eeeee'));  //sssseeeee
```

## 泛型工具

- Partial   变为可选属性

  ![](.\imags6\6.png)

- Readonly  变为只读

  ![](.\imags6\7.png)

- Pick<Type, key> 获取其中一部分

![](.\imags6\8.png)

- Record<Keys, Type>  构造对象类型

  ![](.\imags6\9.png)

# 16. never 不存在的类型

> 抛出异常，或者永远不会有返回值的函数以及永远不会为真的类型返回 `never`。

```tsx
function infiniteLoop(): never {
    while (true) {}
  }

  function error(): never {
    throw '异常错误';
  }
  error()
  infiniteLoop()
```

# 17. unknown 未知类型

> unknown 和 any 很类似

> 定义为 unknown 类型的变量可以接收 任意数据类型
>
> unknown 的变量只能赋值给 unknown 和any 类型的变量
>
> any 定义的类型变量可以赋值给任意类型变量

```tsx
let a:unknown;
a=1;
a='222'
console.log(a);  //'222'
```



```tsx
let a:unknown = '100';
// let b:string = a;  //不能讲unknown 类型 分配给string类型
let c:unknown = a;    //'100'  
let d:any = a;       //'100'
```

# 18. 索引签名类型

![](.\imags6\10.png)

# 19. 映射类型

![](.\imags6\11.png)