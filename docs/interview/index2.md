## http-equiv

`http-equiv`是 meta 标签内容中非常重要的一环，从字面上看是跟 HTTP 相关，事实上其该属性的内容值都是特定 HTTP 的头，该属性与服务器和浏览器进行交互，让网站内容显示的准确和及时。 该属性中`content-type、content-language和set-cookie`已经被废除了，同时像`cleartype、imagetoolbar`这类不在 HTML 标准范围内的，在此不再进行描述。

#### content-security-policy

处于安全方面的考虑，浏览器的同源策略在一定程度上保护了用户安全，但是像`script、link、img`等标签是不受同源策略的影响，而这些因素会给我们的用户带来安全风险，这个时候，该属性就出马了。 在浏览器中，通过设置该属性来声明哪些动态资源允许被加载以此减少 XSS 攻击。该属性的内容包括了对`script、style、font、media`等静态资源的控制，由于其内容过多，在此就不再进行赘述， 想要对此进行了解的，可以阅读[Content Security Policy Reference](https://link.juejin.cn?target=https%3A%2F%2Fcontent-security-policy.com%2F 'https://content-security-policy.com/')。

#### cache-control、Pragma、Expires

将这三个属性并列在一起，是因为其跟 HTTP 头有着同样的属性。从字面上看，加上相应的属性能够让浏览器缓存相应的 html 内容，所以在某些网站（包括大型网站）上你能够看到以下 meta 标签内容

```js
<meta http-equiv="cache-control" content="max-age=180" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
```

但是，现实是残酷的，这些标签往往不会生效，甚至在 HTML5 规范中，http-equiv 中的属性并不包括这三个，如果我们需要进行缓存控制的话，还是 寄希望与 HTTP headers 上。

#### x-dns-prefetch-control

虽然在 meta 标签设置缓存无效，但是我们可以设置 meta 标签来提前进行 DNS 解析以此来提升网站性能。在 HTML 页面中的 a 标签会自动启用 DNS 提前解析，但是在 HTTPS 上却失效了，这个时候就轮到该属性登场了 通过设置`<meta http-equiv="x-dns-prefetch-control" content="on" />`就可以让 a 标签在 HTTPS 环境下进行 DNS 预解析。

#### refresh

这个属性的值可以进行页面的跳转，其效果跟如下函数一样。

```js
setTimeout(function () {
  window.location.href = 'https://www.example.com';
}, time);
```

其常用的用法如下：

```js
//当前页面每一秒后刷新一下
<meta http-equiv="refresh" content="1">
//当前页面一秒后跳转到首页
<meta http-equiv="refresh" content="0;url='/'">
/当前页面一秒后跳转到百度
<meta http-equiv="refresh" content="0;url='https://www.baidu.com'">
```

需要注意的是，在某些浏览器（Firefox）需要用户手动启用 autorefreh，同时其相对于 JS 执行，跳转需要等待时间过长。

#### default-style

这个属性指定了在页面上使用的首选样式表. content 属性必须包含`<link>`元素的标题, href 属性链接到 CSS 样式表或包含 CSS 样式表的`<style>`元素的标题.

## name

`name`是我们日常使用最频繁的属性，其中`author、keywords、description、robots、viewport`的值在平时中经常使用，所以不在此进行讲解。 下面列出一些在应用中比较有用的值。

```js
/*保留历史记录以及动画效果*/
<meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes">

/*是否启用 WebApp 全屏模式*/
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- 设置状态栏的背景颜色,只有在 “apple-mobile-web-app-capable” content=”yes” 时生效 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">

/*添加到主屏后的标题*/
<meta name="apple-mobile-web-app-title" content="App Title">

/*在网页上方显示一个app banner，提供app store下载*/
<meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT"

/*启用360浏览器的极速模式(webkit)*/
<meta name="renderer" content="webkit">

/*uc强制竖屏*/
<meta name="screen-orientation" content="portrait">

/*QQ强制竖屏*/
<meta name="x5-orientation" content="portrait">

/*UC强制全屏*/
<meta name="full-screen" content="yes">

/*QQ强制全屏*/
<meta name="x5-fullscreen" content="true">

/*UC应用模式*/
<meta name="browsermode" content="application">

/*QQ应用模式*/
<meta name="x5-page-mode" content="app">

/*禁止自动探测并格式化手机号码*/
<meta name="format-detection" content="telephone=no">
```
