# ES2024：不断增强的实用性 API

了解最新的 JavaScript 特性可以让你的代码更简洁优雅，以下是 2024 年最值得关注的新功能：

- **`Promise.withResolvers()`** ：一次性创建 Promise 及其控制函数（解决异步控制流的神器）

  ```js
  const { promise, resolve, reject } = Promise.withResolvers();
  promise.then((value) => console.log(value));
  resolve('搞定！'); // 输出：搞定！
  ```

- **正则表达式`v`标志**：支持命名捕获组的变量使用（文本处理更直观）

  ```js
  const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/v;
  const result = regex.exec('2024-05-20');
  console.log(result.groups.year); // 2024
  ```

- **`Atomics.waitAsync()`** ：SharedArrayBuffer 的异步等待（多线程编程新武器）

  ```js
  const buffer = new SharedArrayBuffer(4);
  const view = new Int32Array(buffer);
  Atomics.waitAsync(view, 0, 0).then(() => {
    console.log('值已更改！');
  });
  ```

- **`Object.groupBy()`和`Map.groupBy()`** ：按条件分组数据（数据处理效率提升 10 倍）

  ```js
  const inventory = [
    { name: '苹果', type: '水果' },
    { name: '白菜', type: '蔬菜' },
    { name: '香蕉', type: '水果' },
  ];
  const result = Object.groupBy(inventory, (item) => item.type);
  console.log(result);
  // 输出: { "水果": [{name:"苹果",...}, {name:"香蕉",...}], "蔬菜": [{name:"白菜",...}] }
  ```

- **类型数组新增`TypedArray.prototype.with()`** ：创建特定位置值替换的新数组（高性能数据处理的利器）

  ```js
  const array = new Uint8Array([1, 2, 3, 4]);
  const newArray = array.with(2, 42);
  console.log(newArray); // Uint8Array [1, 2, 42, 4]
  ```

# ES2023：数组操作的非破坏性革命

这一年的更新彻底改变了我们处理数组的方式，引入了一系列不修改原数组的方法，让代码更安全、更可预测：

- **`Array.prototype.findLast()`** ：从后向前查找数组元素（告别反转数组再查找的繁琐操作）

  ```js
  const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  const lastEven = numbers.findLast((n) => n % 2 === 0);
  console.log(lastEven); // 2
  ```

- **`Array.prototype.toReversed()`** ：返回新的反转数组而不修改原数组（保持数据不变性的最佳实践）

  ```js
  const numbers = [1, 2, 3, 4, 5];
  const reversed = numbers.toReversed();
  console.log(numbers); // [1, 2, 3, 4, 5] - 原数组不变
  console.log(reversed); // [5, 4, 3, 2, 1] - 新数组
  ```

- **`Array.prototype.toSorted()`** ：返回新的排序数组而不修改原数组（React 开发者的福音）

  ```js
  const fruits = ['香蕉', '苹果', '橙子'];
  const sorted = fruits.toSorted();
  console.log(fruits); // ["香蕉", "苹果", "橙子"] - 原数组不变
  console.log(sorted); // ["橙子", "苹果", "香蕉"] - 新数组
  ```

- **`Array.prototype.toSpliced()`** ：返回新的修改后数组而不修改原数组（状态管理更简单）

  ```js
  const colors = ['红', '绿', '蓝'];
  const newColors = colors.toSpliced(1, 1, '黄', '紫');
  console.log(colors); // ["红", "绿", "蓝"] - 原数组不变
  console.log(newColors); // ["红", "黄", "紫", "蓝"] - 新数组
  ```

- **`Array.prototype.with()`** ：返回新的指定索引替换后的数组（Immutable.js 用户必学）

  ```js
  const numbers = [1, 2, 3, 4, 5];
  const newNumbers = numbers.with(2, 99);
  console.log(numbers); // [1, 2, 3, 4, 5] - 原数组不变
  console.log(newNumbers); // [1, 2, 99, 4, 5] - 新数组
  ```

# ES2022：类字段与顶层异步的突破

这一年的更新重点改进了类的封装性和模块化异步编程，大大提升了代码的组织结构：

- **类私有字段与私有方法**：`#privateField`终于标准化（面向对象编程质的飞跃）

  ```js
  class Counter {
    #count = 0; // 私有字段，外部无法直接访问

    increment() {
      return ++this.#count;
    }

    get value() {
      return this.#count;
    }
  }

  const counter = new Counter();
  console.log(counter.increment()); // 1
  console.log(counter.value); // 1
  // console.log(counter.#count); // 错误：私有字段不可访问
  ```

- **模块顶层`await`**：无需包装在异步函数中（模块化编程的革命性变化）

  ```js
  // 以前必须包装在async函数内
  // 现在可以直接在模块顶层使用
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  export { data };
  ```

- **`.at()`方法**：数组和字符串支持负索引（Python 开发者会爱上这个特性）

  ```js
  const fruits = ['苹果', '香蕉', '橙子', '葡萄'];
  console.log(fruits.at(-1)); // "葡萄" - 最后一项
  console.log(fruits.at(-2)); // "橙子" - 倒数第二项

  const str = 'Hello';
  console.log(str.at(-1)); // "o"
  ```

- **`Object.hasOwn()`** ：替代繁琐的`Object.prototype.hasOwnProperty.call()`（代码可读性大幅提升）

  ```js
  const obj = { name: '张三' };
  // 以前的写法
  console.log(Object.prototype.hasOwnProperty.call(obj, 'name')); // true
  // 现在的写法
  console.log(Object.hasOwn(obj, 'name')); // true
  ```

# ES2021：字符串处理与逻辑操作的增强

这一年的特性专注于解决常见痛点，让代码更简洁、更易于维护：

- **`String.prototype.replaceAll()`** ：一次性替换所有匹配（告别正则表达式的复杂性）

  ```js
  const message = 'JavaScript真棒，JavaScript万岁！';
  // 以前需要用正则：message.replace(/JavaScript/g, "JS");
  const newMessage = message.replaceAll('JavaScript', 'JS');
  console.log(newMessage); // "JS真棒，JS万岁！"
  ```

- **`Promise.any()`** ：任意一个 Promise 成功则成功（竞态条件处理的终极解决方案）

  ```js
  const promises = [
    fetch('https://api.example.com/endpoint-1').then((r) => r.json()),
    fetch('https://api.example.com/endpoint-2').then((r) => r.json()),
    fetch('https://api.example.com/endpoint-3').then((r) => r.json()),
  ];

  // 只要有一个成功就返回
  Promise.any(promises)
    .then((result) => console.log('最快的成功结果:', result))
    .catch((errors) => console.log('全部失败:', errors));
  ```

- **逻辑赋值运算符**：`??=`、`&&=`、`||=`简化条件赋值操作（代码量减少 30%）

  ```js
  // ||= 示例
  let config = {};
  config.debug ||= true; // 等同于 config.debug = config.debug || true;

  // &&= 示例
  let user = { name: '张三', logout: () => console.log('已登出') };
  user.logout &&= user.logout(); // 如果logout存在则执行

  // ??= 示例
  let settings = { theme: null };
  settings.theme ??= '默认'; // 如果theme为null或undefined则赋值
  console.log(settings.theme); // "默认"
  ```

- **数字分隔符**：`1_000_000`提高大数值可读性（财务计算和数据分析更直观）

  ```js
  const billion = 1_000_000_000; // 十亿
  const binary = 0b1010_0001_1000_0101;
  const hex = 0xff_ec_de_5e;
  console.log(billion); // 1000000000
  ```

# ES2020：空值处理与大整数的创新

这一年引入的特性彻底改变了错误处理和数据访问的方式，成为当代 JavaScript 最具影响力的更新之一：

- **可选链操作符**：`?.`安全访问可能为 null 的属性（前端开发者最爱的语法糖）

  ```js
  const user = {
    name: '张三',
    address: {
      city: '北京',
    },
  };

  // 以前的写法
  const zipCode = user && user.address && user.address.zipCode ? user.address.zipCode : '未知';

  // 现在的写法
  const zipCode = user?.address?.zipCode ?? '未知';
  console.log(zipCode); // "未知"
  ```

- **空值合并操作符**：`??`处理 null 或 undefined 时的默认值（React 和 Vue 开发的得力助手）

  ```js
  const foo = null;
  const bar = foo ?? '默认值';
  console.log(bar); // "默认值"

  // 与 || 不同，0和空字符串不会触发默认值
  console.log(0 ?? '默认值'); // 0
  console.log('' ?? '默认值'); // ""
  console.log(0 || '默认值'); // "默认值"
  ```

- **`BigInt`**：处理超大整数（金融计算和加密应用的救星）

  ```js
  const max = Number.MAX_SAFE_INTEGER; // 9007199254740991
  console.log(max + 1 === max + 2); // true，精度丢失

  const bigInt = 9007199254740991n;
  console.log(bigInt + 1n === bigInt + 2n); // false，精确计算
  console.log(bigInt + 1n); // 9007199254740992n
  ```

- **`Promise.allSettled()`** ：等待所有 Promise 完成而不管成功失败（异步编程的全面解决方案）

  ```js
  const promises = [
    fetch('/api/user').then((r) => r.json()),
    fetch('/api/broken-endpoint').then((r) => r.json()),
  ];

  Promise.allSettled(promises).then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        console.log('成功:', result.value);
      } else {
        console.log('失败:', result.reason);
      }
    });
  });
  ```

# ES2019：数组扁平化与字符串修剪的实用功能

这一年的新特性着重于简化常见的数据处理任务，让复杂操作变得异常简单：

- **`Array.prototype.flat()`** ：简化嵌套数组处理（复杂数据结构处理的救星）

  ```js
  const nestedArray = [1, 2, [3, 4, [5, 6]]];
  console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
  console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
  ```

- **`Array.prototype.flatMap()`** ：映射并扁平化结果（数据转换效率提升 50%）

  ```js
  const sentences = ['Hello world', 'JavaScript is awesome'];
  const words = sentences.flatMap((s) => s.split(' '));
  console.log(words); // ["Hello", "world", "JavaScript", "is", "awesome"]
  ```

- **`Object.fromEntries()`** ：键值对数组转对象（与 Object.entries 完美配合）

  ```js
  const entries = [
    ['name', '张三'],
    ['age', 30],
  ];
  const person = Object.fromEntries(entries);
  console.log(person); // {name: "张三", age: 30}

  // 与 Object.entries() 配合使用
  const obj = { a: 1, b: 2, c: 3 };
  const filtered = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value > 1));
  console.log(filtered); // {b: 2, c: 3}
  ```

- **字符串修剪方法**：`trimStart()`与`trimEnd()`（表单处理的必备工具）

  ```js
  const text = '   Hello World   ';
  console.log(text.trimStart()); // "Hello World   "
  console.log(text.trimEnd()); // "   Hello World"
  console.log(text.trim()); // "Hello World"
  ```

- **可选的 catch 参数**：允许忽略异常对象（更简洁的错误处理）

  ```js
  // 以前必须指定参数
  try {
    // 可能出错的代码
  } catch (error) {
    // 即使不使用error也必须声明
  }

  // 现在可以省略参数
  try {
    // 可能出错的代码
  } catch {
    // 不关心具体错误
  }
  ```
