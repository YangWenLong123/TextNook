## 基于 navigator.userAgent 的 User Agent 检测 ‌

```js
function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|windows phone|phone|webos|kindle|tablet/i;
  return mobileRegex.test(ua.toLowerCase());
}
```

## 基于 navigator.userAgent 的插件方案

```js
import MobileDetect from 'mobile-detect';

// 初始化检测器
const md = new MobileDetect(navigator.userAgent);

// 判断设备类型
if (md.mobile()) {
  console.log('移动端登录设备（手机/平板）');
} else if (md.tablet()) {
  console.log('平板设备');
} else {
  console.log('PC 端设备');
}
```

查看[Demo](https://hgoebl.github.io/mobile-detect.js/check/)
