> 判断IE浏览器7-10

```
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}
 
```
> this指向问题
```
var x = 10;
var a = {
  x: 20,
  b: {
    fn: function () {
      x = 30
      console.log(this.x);
    },
  },
};
a.b.fn.call(a); // 20
a.b.fn(); // null
(a.b.fn = a.b.fn)(); //30
(a.b.fn , a.b.fn)(); //30
```
> xss
```
csp
```

```
e.preventDefault(); // 阻止默认事件
e.stopPropagation(); // 停止冒泡
```



> 简单请求

不会触发CORS预检的请求称为简单请求，满足以下所有条件的才会被视为简单请求，基本上我们日常开发只会关注前面两点

* 使用GET、POST、HEAD其中一种方法
* 只使用了如下的安全首部字段，不得人为设置其他首部字段
    * Accept
    * Accept-Language
    * Content-Language
    * Content-Type 仅限以下三种
        * text/plain
        * multipart/form-data
        * application/x-www-form-urlencoded
    * HTML头部header field字段：DPR、Download、Save-Data、Viewport-Width、WIdth
* 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问
* 请求中没有使用 ReadableStream 对象

> 预检请求

需预检的请求要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响

下面的请求会触发预检请求，其实非简单请求之外的就会触发预检，就不用记那么多了

* 使用了PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH方法
* 人为设置了非规定内的其他首部字段，参考上面简单请求的安全字段集合，还要特别注意Content-Type的类型
* XMLHttpRequestUpload 对象注册了任何事件监听器
* 请求中使用了ReadableStream对象

```javascript
let a = 10
let total = 0
let result = {}
function foo(a) {
    for (var i = 0; i < 3; i++) {
        result[i] = function () {
            total = total + i * a
            console.log(total)
        }
    }
}
foo(1)
result[0]()  // 3
result[1]()  // 6
result[2]()  // 9

```


```javascript
setTimeout(() => {
    console.log('1');
    Promise.resolve().then(() => {
        console.log('2');
    })
}, 0);
new Promise(function (resolve, reject) {
    console.log('3');
    setTimeout(function () {
        console.log('4');
        resolve('5')
    }, 0)
}).then((res) => {
    console.log('6');
    setTimeout(() => {
        console.log(res);
    }, 0)
})
/*
3
1
2
4
6
5
*/
```

`
```typescript
export type Constructor<T> = new (...args) => T;

export interface Constructor2<T> {
    new(...args): T;
    // prototype: any;
}

export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Alias type for primitive types
 * @ignorenaming
 */
type Primitive = undefined | null | boolean | string | number | Function;

/**
 * Type modifier to make all the properties of an object Readonly
 */
export type Immutable<T> = T extends Primitive
    ? T
    : T extends Array<infer U>
    ? ReadonlyArray<U>
    : /* T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : // es2015+ only */
    DeepImmutable<T>;

/**
 * Type modifier to make all the properties of an object Readonly recursively
 */
export type DeepImmutable<T> = T extends Primitive
    ? T
    : T extends Array<infer U>
    ? DeepImmutableArray<U>
    : /* T extends Map<infer K, infer V> ? DeepImmutableMap<K, V> : // es2015+ only */
    DeepImmutableObject<T>;

/** @hidden */
interface DeepImmutableArray<T> extends ReadonlyArray<DeepImmutable<T>> { }
/** @hidden */
/* interface DeepImmutableMap<K, V> extends ReadonlyMap<DeepImmutable<K>, DeepImmutable<V>> {} // es2015+ only */
/** @hidden */
type DeepImmutableObject<T> = { readonly [K in keyof T]: DeepImmutable<T[K]> };

export type ReadonlyObject<T> = { readonly [K in keyof T]: T[K] };
```

```
const xhr = new XMLHttpRequest();
const url = 'https://bar.other/resources/public-data/';

xhr.open('GET', url);
xhr.onreadystatechange = someHandler;
xhr.send();
```

```
https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html
```

```
常见的http code
101 Switching Protocols
200 OK
204 No Content
206 Partial Content
301 Moved Permanently
302 Found
304 Not Modified
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not found
405 Method Not Allowed
412 Precondition Failed
414 URI Too Long
416 Range Not Satisfiable
500 Internal Server Error
502 Bad Gateway
504 Gateway Timeout
```


```typescript
Function.prototype['bind2'] = function (that, ...args) {
  let fn = this;

  function res(...args2) {
    let q = args.concat(args2);
    return fn.apply(that, q);
  }

  return res;
};

function a() {
  console.log(this, arguments);
  return 1;
}
let b = a.bind2(1, 2, 5);
console.log(b());
let c = b.bind2(3, 4);
console.log(c());
let d = c.bind2(3, 4);
console.log(d());
```

```typescript
function quickSort(arr, start, end) {
  // 终止条件
  if (start >= end) {
    return;
  }

  // 返回 pivotIndex
  let index = partition(arr, start, end);

  // 将相同的逻辑递归地用于左右子数组
  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
}
function partition(arr, start, end) {
  // 以最后一个元素为基准
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // 交换元素
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // 移动到下一个元素
      pivotIndex++;
    }
  }

  // 把基准值放在中间
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}
```


```
setTimeout(()=>console.log('setTimeout'), 0);
Promise.resolve().then(()=>console.log('promise'));
requestAnimationFrame(()=>console.log('animation'));
requestIdleCallback(()=>console.log('idle'));
```

promise
animation
setTimeout
idle

promise
setTimeout
animation
idle


```
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype.m = 9
A.prototype = {
 n: 2,
 m: 3
}

var c = new A();

console.log(b.n); // 1
console.log(b.m); // 9
console.log(c.n); // 2
console.log(c.m); // 3

 

function Test() {}
Object.prototype.printName = function() {
 console.log('Object');
}

Function.prototype.printName = function() {
 console.log('Function');
}

Test.printName(); // Function
var obj = new Test();
obj.printName(); // Object
```


```javascript
console.log(x)
let x = 2
console.log(x)
var x = 3

(function(){
    var x = y = 1;
})();
console.log(y);
console.log(x);
```

```
function Parent(){
   this.a = 'Parent'
}

function Tom() {
   this.a = 'Tom'
}

Parent.__proto__.print = function(){
   console.log(this.a)
}

Parent.print()
Tom.print()
var child = new Parent()
child.print()

执行以上代码，将分别输出什么？（请勿使用浏览器开发者工具调试）

 
A. 'undefined' 'Uncaught TypeError ...' 'Parent'
B. 'Parent' 'Uncaught TypeError ...' 'Uncaught TypeError ...'
C. 'Parent' 'Tom' 'Uncaught TypeError ...'
D. 'undefined' 'undefined' 'Uncaught TypeError ...'  // ✔️对
```

```
var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}

obj.say() // 10
var anotherobj={a:30}
obj.say.apply(anotherobj) // 10
function i() {
  console.log(this.a); // 10 // 严格模式下会报错，严格模式下的this在函数体内不会默认指向window，而是指向undefined
}
i();
```


```
Function.prototype.myCall = function (context) {
  let fn = this;
  let args = [];
  let that = context == null ? globalThis : Object(context);
  that.fn = fn;
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  that.fn(...args);
};
```

```
function objectFactory(clasFn) {
    var obj = new Object()
    obj.__proto__ = clasFn.prototype;
    let args = [];
      for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var ret = clasFn.apply(obj, args);
    
    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof ret === 'object' ? ret || obj : obj;
};
```

```用纯 CSS 创建一个三角形
    width: 0;
    height: 0;
    border-color: transparent transparent transparent red;
    border-width: 20px;
    border-style: solid;
```

```
function father() {
  this.num = 935;
  this.work = ['read', 'write', 'listen'];
}
function son() {}
son.prototype = new father();
let son1 = new son();
let son2 = new son();
son1.num = 117;
son1.work.pop();
console.log(son2.num);  // 935
console.log(son2.work); // ['read', 'write']
```

```
var i = 100;
function foo() {
    bbb: try {
        console.log("position1");
        return i++; 
    } finally {
        break bbb;
    }
    console.log("position2");
    return i;
}
foo();
// position1
// position2
// 101
```

```
var a = 10;
function a(){}
console.log(typeof a) // number
```

globalThis
```
Function('return this')()  // 方法一

var getGlobal = function () {  // 方法二
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 
```

```typescript
var num = prompt('请输入分母:')
try{
  console.log('a');
  value = 0 / num;
  console.log('b');
}
catch(e){
  console.log('c');
}
finally{
  console.log('d');
}
// a b d
```

```typescript
var f = function g() {
    return 23;
 };
console.log(f.name) // g
typeof g(); // TypeError

let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name); // Rectangle2
typeof Rectangle2; // 'undefined'
```

```
var a = 1;
function test(){
    console.log(a) // error
    class a {}
    console.log(a) // class
}
test();
```

```
'foo' == new function(){ return String('foo'); }; // false
'foo' == new function(){ return new String('foo'); }; // true
[] == false // true
![] == false // true
```

```
"use strict";
var uname = 'window';
(function(){console.log(this.uname)}());  // 报错 严格模式下的this在函数体内不会默认指向window，而是指向undefined
```

```
function test() {
    var n = 4399;
    function add(){
        n++;
        console.log(n);
    }
    return {n:n,add:add}
}
var result = test();
var result2 = test();
result.add();  // 4400
resukt2.add();  // 4400
console.log(result.n); // 4399
result2.add(); // 4401
```


```
class Phone{
  constructor(price){
    this.price = price;
  }
  get price(){
    return 999;
  }
}
var p = new Phone(888); // error 没有set访问器，执行set
console.log(p.price); 

class Phone{
  constructor(price){
    this.price = price;
  }
  get price(){
    return 999;
  }
  set price(x){}
}
var p = new Phone(888); 
console.log(p.price); // 999
```

```
var foo = "10"+3-"1";console.log(foo);  // 102
```

```
不支持冒泡：妈（mouseenter）妈(mouseleave)不(blur)放(focus)心你(load,unload,resize)
```

```
document.readyState;  loading | interactive | complete;
```
```
var carname="Volvo";var carname;console.log(carname)  //Volvo
```


```
async function a() {
    console.log('a');
    let _b = await b();
    console.log(2);
    return 1
}
async function b() {
    console.log('b');
    return 2
}
a();

 new Promise((resolve, reject) => {
    console.log('Promise')
    resolve(1)
}).then(x=>{
     console.log('Promise than')
})

console.log(1);

// a b Promise 1 2 (Promise than)
```