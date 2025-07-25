如果你是一名开发，肯定对请求头和响应头这两个词听上去特别有亲切感，请求头和响应头顾名思义就是请求和响应相关的一些信息，但具体到请求头和响应头里面的某个参数是啥意思可能很多人就不知道了。

就像最近问到一些面试者响应头里面最常见的`Cache-Control`和`Content-Type`所代表的是什么意思，很多都回答的支支吾吾的。真要说在项目中这种面试者也肯定能正常搬砖干活，但一看就是基本功非常差，如果有对比选择的情况下非常容易被`"pass"`掉。

# 什么是请求头和响应头

简单说请求头和响应头就是`HTTP`协议的组成部分，请求头和响应头用于在客户端(浏览器)和服务器之间携带传递额外的属性，这些属性内容会用于控制`HTTP`请求和响应的行为。

其中请求头是客户端带给服务端，响应头是服务端带给客户端。

# 常见请求头含义

## Accept:

**含义**：表示指定客户端能够接受哪些类型的内容。

当客户端用接口请求时，设置`Accept`会告诉服务器要返回合适的类型格式。

示例

```bash
accept: application/json, text/plain,
```

## Accept-Charset

**含义**: 表示指定客户端能够接受哪些类型的字符集。

```css
Accept-Charset: utf-8, iso-8859-1;q=0.5
```

## Cookie

**含义**: 表示用于存储用户特有信息，让用品去识别用户的具体身份。通过`Cookie`传递用户`ID`，让服务器端识别用户身份。

示例

```bash
Cookie: session=abPC9527; user=tty
```

## Origin

**含义**: 表示跨域相关信息，用于设置`CORS`的请求。通过`Origin` 头，防止陌生的域进行请求。

示例

```bash
Origin: https://tty.com
```

## Referer

**含义:** 表示当前的请求是从哪个`url`链接过来的。

示例

```bash
Referer: https://tty.com/pageone
```

## User-Agent

**含义**: 表示包含发起请求的用户的一些代理信息，例如浏览器的具体版本和具体类型。

示例

```bash
User-Agent: Mozilla/3.0 (Windows NT 9.0; Win32; x64) AppleWebKit/517.36 (KHTML, like Gecko) Chrome/56.0.3029.110 Safari/517.3
```

## If-Modified-Since

**含义**: 表示客户端在上次获取资源的具体时间。

示例

```bash
If-Modified-Since: Tue, 10 Oct 2021 11:01:01 GMT
```

## Range

**含义**: 表示指定第一个字节到指定最后字节之间的位置，用于告诉服务器想取那个范围的数据。

示例

```bash
Range: bytes=0-255
```

# 常见响应头含义

## Access-Control-Allow-Origin

**含义**: 表示用于配置`CORS`跨域相关，指定允许访问资源的域名，如果配置为`*`表示所有可访问。

示例

```bash
Access-Control-Allow-Origin: *
```

## Cache-Control

**含义**: 表示缓存机制的缓存策略。

示例------这里面试重点

```bash
Cache-Control:public  // 响应会被缓存
Cache-Control:must-revalidate  // 指定条件下会缓存重用
Cache-Control:no-cache  // 直接向服务器端请求最新资源,不缓存
Cache-Control:max-age=10 // 设置缓存的有效时间
Cache-Control:no-store  // 在任何条件下，响应都不会被缓存
```

## Content-Length

**含义**: 表示当前响应体的具体大小，具体单位为字节。

示例

```bash
Content-Length: 9527
```

## Content-Type

**含义:** 表示响应体的具体数据格式是什么。

示例

```bash
Content-Type: application/json
```

## Date

**含义**: 表示服务器开始对客户端发送响应的具体时间。

示例

```bash
Date: Tue, 10 Oct 2021 11:01:01 GMT
```

## ETag

**含义**: 表示用于验证缓存，确保当前的资源未被修改过。如果没有更改过则返回`304`状态码，减少不必要传输。

示例

```bash
ETag: "1234952790pc"
```

## Location

**含义**: 表示用于重定向，指向一个新的`URL`。

示例

```bash
Location: https://tty.com/new-page
```

## Set-Cookie

**含义**: 表示服务器通过这个请求头把`cookie`带到客户端。客户端会在后面请求中自动将这`cookie`放在请求头中。

示例

```bash
Set-Cookie: session=pc9527; Path=/; HttpOnly; Secure
```

## Server

**含义**: 表示告诉这个服务器软件的信息，例如版本。

示例

```bash
Server: Apache/1.4.38 (Ubuntu)
```

## X-Powered-By

**含义**: 表示返回后端使用的具体框架或技术栈。

示例

```bash
X-Powered-By: Express
```

## Content-Encoding

**含义**: 表示响应体的编码方式，例如`gzip`压缩。

示例

```css
content-encoding: gzip;
```

## Last-Modified

**含义**: 表示资源最后被修改的具体时间。

示例

```bash
Last-Modified: Tue, 10 Oct 2021 11:00:00 GMT
```

## Expires

**含义**: 跟缓存相关，表示指定资源的过期时间，这个时间前都不过期。

示例

```bash
Expires: Wed, 21 Oct 2021 07:21:00 GMT
```
