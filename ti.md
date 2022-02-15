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