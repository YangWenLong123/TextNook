## 通过设置下个月的第一天，然后减去一天

```js
function getDaysInMonth(year, month) {
  // 创建下个月的第一天的日期对象
  // 注意：月份是从0开始计数的，因此month + 1代表下个月
  const nextMonthFirstDay = new Date(year, month + 1, 1);
  // 将下个月的第一天设置为前一天，即得到当前月的最后一天
  nextMonthFirstDay.setDate(0);
  // 返回当前月最后一天的日期部分
  return nextMonthFirstDay.getDate();
}

// 示例：获取2024年9月的天数
const days = getDaysInMonth(2024, 8); // 8代表9月
console.log(days); //30
```

## 利用 getMonth 方法的特性

```js
// window.location.href = "https://juejin.cn/user/84036866547575"
function getDaysInMonth(year, month) {
  // 创建当前月的第一天的日期对象
  const firstDay = new Date(year, month, 1);
  // 从第一天开始增加日期，直到月份发生改变
  let day = 1;
  while (firstDay.getMonth() === month) {
    firstDay.setDate(day);
    day++;
  }
  // 当月份发生变化时，day - 1 即为当前月的天数
  return day - 1;
}
// 示例：获取2024年9月的天数
const days = getDaysInMonth(2024, 8); // 8代表9月
console.log(days); //30
```

## 平闰年+月份数组计算

```js
// 注意month参数应该是一个从0开始计数的整数，比如 0代表1月，1代表2月，以此类推
function getDays(year, month) {
  // 定义一个数组来存储每个月的天数
  let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // 判断是否为闰年
  // 闰年的条件是：能被4整除但不能被100整除，或者能被400整除
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    days[1] = 29;
  }
  //返回指定月份的天数
  return days[month];
}
// 示例：获取2024年9月的天数
const days = getDays(2024, 8); // 8代表9月
console.log(days); // 30
```

## new Date()设置为 0

```js
// window.location.href = "https://juejin.cn/user/84036866547575"
function getMonthDay(year, month) {
  //月份是从 0 开始计数的，因此 month + 1 表示实际的月份
  // 使用 0 作为天数参数，会使 Date 对象自动设置为该月的最后一天
  let days = new Date(year, month + 1, 0).getDate();
  // 返回该月份的天数
  return days;
}
// 示例：获取2024年9月的天数
const days = getMonthDay(2024, 8); // 8代表9月
console.log(days); //30
```
