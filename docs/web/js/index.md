常用代码片段

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

## Nginx 配置

```bash
server
{
    listen 80;
    server_name www.alongweb.top;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/www.alongweb.top;

    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #SSL-END

    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END

    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-74.conf;
    #PHP-INFO-END

    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/www.alongweb.top.conf;
    #REWRITE-END

    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }

    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }

    #禁止在证书验证目录放入敏感文件
    if ( $uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$" ) {
        return 403;
    }

     location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      24h;
        error_log /dev/null;
        access_log /dev/null;
    }

    location ~ .*\.(js|css)?$
    {
        expires      1d;
        error_log /dev/null;
        access_log /dev/null;
    }

    gzip_static on;
    location / {
      #需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
      #try_files $uri $uri/ @router;
      try_files $uri $uri/ /index.html;
      index index.html index.htm index.htm.gz cms/index.html;
      #强缓存配置
      add_header Cache-Control "public, max-age=86400";
    }
    location @router {
      rewrite ^.*$ /index.html last;
    }

    access_log  /www/wwwlogs/www.alongweb.top.log;
    error_log  /www/wwwlogs/www.alongweb.top.error.log;
}
```
