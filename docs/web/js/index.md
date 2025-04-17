# 常用代码片段

## 可编辑的浏览器页面

```js
(function fn() {
  if (document.body.contentEditable === 'true') {
    document.body.contentEditable = 'false';
  } else {
    document.body.contentEditable = 'true';
  }
})();
```

## Nginx 刷新 404 解决方案

```bash
server {
  location / {
    try_files $uri $uri/ /index.html;
    index index.html index.htm index.htm.gz cms/index.html;
  }
  location @router {
    rewrite ^.*$ /index.html last;
  }
}
```
