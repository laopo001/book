// 注: 所有题目均可以使用任意 ES 版本中的 API
/**
 * Q1: 实现一个非原生类(数组, Map/Set 等)的浅拷贝函数
 *
 * 此函数接收一个非原生类对象(可能有自定义的原型链), 返回
 * 一个此对象的浅拷贝.
 */
function shallowCopy(obj) {
    if (Array.isArray(obj)) {
        return obj.slice();
    } else if (obj instanceof Map) {
        let map = new Map();
        for (let [k, v] of obj) {
            map.set(k, v);
        }
        return map;
    } else if (obj instanceof Set) {
        let set = new Set();
        for (let x of obj) {
            set.add(x);
        }
        return set;
    } else if (obj instanceof Date) {
        let res = new Date(obj.getTime());
        return res;
    } else if (obj instanceof RegExp) {
        let res = obj;
        return res;
    } else if (obj instanceof Object) {
        let res = {};
        for (let k in obj) {
            res[k] = obj[k];
        }
        res.__proto__ = obj.__proto__;
        return res;
    } else {
        return obj;
    }
}

/**
 * Q2: 实现一个加权随机函数
 *
 * 此函数接收一个整数数组 input, 此数组:
 *  1. 元素个数 N < 10000
 *  2. 元素的值大于 0 且小于 100
 *
 * 返回一个随机函数, 此随机函数:
 *  1. 返回 [0, N - 1] 之间的一个随机整数
 *  2. 每个整数 i 被返回的概率为:
 *     数组 input 的第 i 个元素的值 / 数组 arr 的所有元素之和
 *
 * 例: 给定一个数组 input, 值为 [4, 2, 1, 3],
 *    调用 createWeightedRandom(input), 应当
 *    返回一个函数, 此函数返回一个 0 - 3 之间的一个
 *    随机整数, 相应的概率分别为:
 *    4/10, 2/10, 1/10, 3/10.
 *
 * 分别按以下两种要求实现该函数:
 * 1. 空间复杂度不限, 返回的随机函数时间复杂度 O(1)
 * 2. 空间复杂度 O(N), 返回的随机函数时间复杂度 O(logN)
 */
// Q2.1: 空间复杂度不限, 返回的随机函数时间复杂度 O(1)
function createWeightedRandom_O1(input) {
    let arr = [];

    for (let i = 0; i < input.length; i++) {
        let x = input[i];
        let v = input[i];
        while (x > 0) {
            arr.push(i);
            x--;
        }
    }

    return function () {
        return arr[Math.floor(Math.random() * arr.length)];
    };
}
// Q2.2: 空间复杂度 O(N), 返回的随机函数时间复杂度 O(logN)
function createWeightedRandom_OlogN(input) {
    let sum = 0;
    let arr = [];
    for (let i = 0; i < input.length; i++) {
        sum += input[i];
    }
    let t = 0;
    arr.push({ l: 0, v: null });
    for (let i = 0; i < input.length; i++) {
        t += input[i];
        arr.push({ l: t / sum, v: i });
    }
    // console.log(arr)
    return function () {
        let finded = null;
        function find(arr, left, right, value) {
            if (left >= right) {
                return;
            }
            let middle = Math.floor((left + right) / 2);
            // console.log(left, right, middle,value)
            if (middle >= 1 && arr[middle].l > value && arr[middle - 1].l < value) {
                finded = arr[middle].v;
                return;
            }
            if (right >= 1 && arr[right].l > value && arr[right - 1].l < value) {
                finded = arr[right].v;
                return;
            }
            if (arr[middle].l > value) {
                find(arr, left, middle, value);
            } else {
                find(arr, middle, right, value);
            }
        }
        find(arr, 0, arr.length - 1, Math.random());
        return finded;
    };
}
/**
 * Q3: 实现一个异步任务执行器 AsyncWorker
 *
 * 此 AsyncWorker: 最多只能同时执行 capacity
 * 个异步任务. 若正在执行的任务数达到 capacity,
 * 则新加入的任务需要等待其中一个正在执行的任务完
 * 成后才能被执行.
 */
 class AsyncWorker {
    constructor(capacity) {
      this.capacity = capacity;
      this.i = 0;
      this.tasks = [];
    }
    exec(task) {
      return new Promise((resolve, reject) => {
        let run = () => {
          if (this.i < this.capacity) {
            task()
              .then((res) => {
                this.i--;
                resolve(res);
                let first = this.tasks.shift();
                first && first();
              })
              .catch((err) => {
                this.i--;
                reject(err);
                let first = this.tasks.shift();
                first && first();
              });
            this.i++;
          } else {
            this.tasks.push(run);
          }
        };
        run();
      });
    }
  }
/* -------- 下面是测试代码 --------- */
function assert(value, message) {
    if (value !== true) {
        throw new Error(message);
    }
}
// TEST Q1
function testShallowCopy() {
    class UserModel {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    }
    const user = new UserModel('Hello', 'World');
    const user2 = shallowCopy(user);
    user2.firstName = 'Hello 2';
    user2.lastName = 'World 2';
    assert(user2 instanceof UserModel, 'should be instance');
    assert(user.fullName() === 'Hello World', 'should keep original fields');
    assert(user2.fullName() === 'Hello 2 World 2', 'should returns new value');
    let date = new Date();
    assert(date.getTime() === shallowCopy(date).getTime(), 'error');
}
// TEST Q2.1
function testCreateWeightedRandom_O1() {
    const input = [4, 2, 1, 3];
    const sampling = createWeightedRandom_O1(input);
    const count = [0, 0, 0, 0];
    for (let i = 0; i < 10000; i++) {
        count[sampling()]++;
    }

    const rates = count.map((i) => Math.round(i / 1000));

    assert(
        JSON.stringify(rates) === '[4,2,1,3]',
        `${rates} is not same to ${input}`
    );
}
// TEST Q2.2
function testCreateWeightedRandom_OlogN() {
    const input = [4, 2, 1, 3];
    const sampling = createWeightedRandom_OlogN(input);
    const count = [0, 0, 0, 0];
    for (let i = 0; i < 10000; i++) {
        count[sampling()]++;
    }
    const rates = count.map((i) => Math.round(i / 1000));
    assert(
        JSON.stringify(rates) === '[4,2,1,3]',
        `${rates} is not same to ${input}`
    );
}
// TEST Q3
async function testAsyncWorker() {
    const start = Date.now();
    const createTask = (timeout, error) => {
        return () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(timeout);
                    }
                }, timeout);
            });
    };

    const worker = new AsyncWorker(2);
    const tasks = [
        {
            status: 'fulfilled',
            value: 100,
            idealCost: 100,
            task: worker.exec(createTask(100)),
        },
        {
            status: 'fulfilled',
            value: 201,
            idealCost: 200,
            task: worker.exec(createTask(201)),
        },
        {
            status: 'rejected',
            reason: 'REJECTED',
            idealCost: 300,
            task: worker.exec(createTask(202, 'REJECTED')),
        },
        {
            status: 'fulfilled',
            value: 203,
            idealCost: 400,
            task: worker.exec(createTask(203)),
        },
        {
            status: 'fulfilled',
            value: 300,
            idealCost: 600,
            task: worker.exec(createTask(300)),
        },
    ];
    // show me bug does not support for of tasks.entries()
    for (let index = 0; index < tasks.length; index++) {
        const t = tasks[index];
        let result;
        try {
            const value = await t.task;
            result = { status: 'fulfilled', value };
        } catch (e) {
            result = { status: 'rejected', reason: e };
        }
        const realCost = Date.now() - start;
        const idealCost = (realCost - (realCost % 100)) | 0;
        if (idealCost !== t.idealCost) {
            throw new Error(
                `unexpected time cost: ${idealCost}, expected is ${t.idealCost} for ${index}`
            );
        }
        if (result.status !== t.status) {
            throw new Error(`unexpected status ${result.status} for ${index}`);
        }
        if (
            t.status === 'fulfilled' &&
            result.status === 'fulfilled' &&
            result.value !== t.value
        ) {
            throw new Error(
                `unexpected fulfilled value ${result.value}, expected is ${t.value} for ${index}`
            );
        }
        if (
            t.status === 'rejected' &&
            result.status === 'rejected' &&
            result.reason !== t.reason
        ) {
            throw new Error(
                `unexpected rejected reason ${result.reason}, expected is ${t.reason} for ${index}`
            );
        }
    }
}
async function main() {
    try {
        console.log('Testing Q1...');
        await testShallowCopy();
        console.log('PASSED!');
    } catch (e) {
        console.log(e.stack || e);
    }
    try {
        console.log('Testing Q2.1...');
        await testCreateWeightedRandom_O1();
        console.log('PASSED!');
    } catch (e) {
        console.log(e.stack || e);
    }
    try {
        console.log('Testing Q2.2...');
        await testCreateWeightedRandom_OlogN();
        console.log('PASSED!');
    } catch (e) {
        console.log(e.stack || e);
    }

    try {
        console.log('Testing Q3...');
        await testAsyncWorker();
        console.log('PASSED!');
    } catch (e) {
        console.log(e.stack || e);
    }
}
main();
