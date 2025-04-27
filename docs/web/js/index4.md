文件上传、文件下载都是常见的需求。

大文件上传我们会通过分片上传来优化。

比如[阿里云 OSS 的大文件分片上传](https://link.juejin.cn?target=https%3A%2F%2Fhelp.aliyun.com%2Fzh%2Foss%2Fuser-guide%2Fmultipart-upload 'https://help.aliyun.com/zh/oss/user-guide/multipart-upload')：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2f093021bc414f0684d39ab9fca96378~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=j0633NQ5Xj5SYncwpacTBIG8fz0%3D)

那大文件下载如何优化呢？

答案也是分片下载，或者叫流式传输。

我们试一下：

```js
npm install -g @nestjs/cli
nest new download-test
```

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/59ad7fe781de45dda5f0e3d1cf78a3c2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=F54R2CaZZudgT%2BWtqbVwqeQ2Jxo%3D)

创建个 Nest 项目。

在 AppController 里添加个 download 的路由：

```js
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  download(@Res() res: Response) {
    const content = fs.readFileSync('package.json');

    res.set('Content-Disposition', `attachment; filename="guang.json"`);

    res.end(content);
  }
}
```

把服务跑起来：

```js
npm run start:dev
```

浏览器访问下：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9ce82ac1bde34a9dba3be80c31728731~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=f9Yn1yIhIt2jm9WWfbeBmSU7TEo%3D)

可以看到，触发了下载。

在 devtools 里可以看到正确设置了 header：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f57b2df6692747288c0ba22dae2564fa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=686cOokNS5ti7HhrmQdMPcGgAxg%3D)

header 通过 @Header 装饰器加也可以：

```js
@Get('download')
@Header('Content-Disposition', `attachment; filename="guang.json"`)
download(@Res() res: Response) {
    const content = fs.readFileSync('package.json');

    res.end(content);
}
```

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/25dd059fceee463b89119f76ea4266eb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=hZdMmuJ5Fvbm24zZQ%2FomWi%2Flc7Y%3D)

效果一样。

但是，这样文件是全部读取出来返回，如果文件大了，比如好几个 G，会占用很大的内存。

当大文件下载的时候，能不能读出一部分返回一部分，也就是流式的下载呢？

可以的，http 有这个功能。

就是 transfer-encoding:chunked

这个是面试常考题。

从服务器下载一个文件的时候，如何知道文件下载完了呢？

有两种方式：

一种是 header 里带上 Content-Length，浏览器下载到这个长度就结束。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8e39d356ca71491eb7334928dca2e817~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=fFzy%2BQLNoJIg8W5fkDwJvUNfpYw%3D)

另一种是设置 transfer-encoding:chunked，它是不固定长度的，服务器不断返回内容，直到返回一个空的内容代表结束。

比如这样：

```js
5;
Hello;
1, 5;
World;
1;
!0;
```

这里分了 “Hello” “,” “World”“!” 这 4 个块，长度分别为 5、1、5、1

最后以一个长度为 0 的块代表传输结束。

这样，不管内容多少都可以分块返回，就不用指定 Content-Length 了。

这就是大文件的流式传输的原理，就是 transfer-encoding:chunked。

然后我们在代码里实现下：

```js
@Get('download2')
@Header('Content-Disposition', `attachment; filename="guang.json"`)
download2(@Res() res: Response) {
    const stream = fs.createReadStream('package.json');

    stream.pipe(res);
}
```

node 的 stream 本来就是分块读取内容的，这里配合流式返回数据很合适。

现在就不再返回 Content-Length 了，而是返回了 Transfer-Encoding:chunked：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ba4be03071e74c7085baafaa0ccfa3d9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=Kb2Jzzsp0oHfzpxGPDOpH4W8w4Q%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a6aa0424381542f5b0a4ed850615ff3e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=A55i65jNwxuBhnHMHFC4NQZ89ug%3D)

这就是流式传输。

不过在 nest 里最好不要直接用 node 的 stream api。

因为它有很多事件，比如 data、error、end 等，自己处理还是挺麻烦的。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e6de656a38ea4037957796f52b70acb3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=MgUtagqAhD6OB8Gd8AGZhjxeIiQ%3D)

可以直接用 Nest 封装的一个类 StreamableFile：

```js
@Get('download3')
download3() {
    const stream = fs.createReadStream('package.json');

    return new StreamableFile(stream, {
      disposition: `attachment; filename="guang.json"`
    });
}
```

试一下：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/20bcff8a2f414d45bff32d8e491d8b68~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=SOz%2BmDbmtONiMo831n4vY0q6vqo%3D)

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/338e1aa128634d42bad059cfe72d6eca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=Yp4F8lhrCWI1J5%2FiDcBtU6ciLVo%3D)

效果一样。

只是这里的 Content-Type 默认是 application/octet-stream 二进制流：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3ac01c7ecb1e4c42a0b75ab651d8f5a8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=mS%2BApNnn1qBOWouvIVCqEJRfCsE%3D)

你也可以改一下：

```js
@Get('download3')
download3() {
    const stream = fs.createReadStream('package.json');

    return new StreamableFile(stream, {
      type: 'text/plain',
      disposition: `attachment; filename="guang.json"`
    });
}
```

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2411a1aa9ade4b45983f6211f0ae1c35~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=ORHi%2B5P6vEbtGbnxPIr9xm5ElwM%3D)

这样就实现了流式传输了。

相比大文件上传需要自己实现分片，大文件下载这个，浏览器和 http 内置了支持，直接指定对应 header 就行，自己不用做很多事情。

然后具体的 http 响应体是什么样的呢？

我们用 wireshark 抓包看一下：

在 [wireshark 官网](https://link.juejin.cn?target=https%3A%2F%2Fwww.wireshark.org%2F 'https://www.wireshark.org/')下载安装包：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c161b9fa7e204e109e6a3f968755c54d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=OfAP9FR8L70ROf1W7rlIL%2FGtlLA%3D)

安装后把它跑起来：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/75cc423b35574ae8a4a6e40e68058280~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=5V3AIVdk1QQHpwgkKjZ%2BrAKwsm0%3D)

选择 loopback 这个网卡，本地回环地址，可以抓到 localhost 的包：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/33b9f28507dc415d9ff4d311b4d86215~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=lcVG7wddFxOJVPXL3ijzoMHlrE8%3D)

输入过滤器 port 3000，也就是过滤 3000 端口的数据包。

然后回车就会进入抓包界面：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b7052323dda0432990f4c52892bf973a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=BiReQjNTjxeWcVk99b9ZLQOk%2F%2BA%3D)

这时候再访问下 [http://localhost:3000/download3](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A3000%2Fdownload3 'http://localhost:3000/download3')

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8056860110fe475fa8c76cb8f9c673af~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=blR%2FlBrciuisgQ89mbp34hKzNb8%3D)

可以看到抓到了几个 tcp 的包：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0edc33f048754eb2aa53e6d3d69db55f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=pPlwAB%2FmXdIMd7cYuG4BPJQDuUs%3D)

这两个分别是请求和响应：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/dcad89a4ab4949169bf1367bb85ffe41~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=RAi5qIEQnkaE5zxLP6chMHhJMhU%3D)

如果多了找不到，点一下 protocal 会排序： ![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d4d8f7d84d6a4f078ecbf371da5d82e7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=89z%2Fl8NQ%2FqjOHNEhke4uJCoBNfc%3D)

可以看到，确实是分块传输的：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a428fd585a8543198f31535f60010d2f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=TZDWH8EnzWrbupd48lkJcY6ydvg%3D)

这里有一个数据块，然后一个空块结尾。

再访问下 [http://localhost:3000/download](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A3000%2Fdownload 'http://localhost:3000/download') 接口对比下：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e11a3f4253eb4ef5b062525365a7ffed~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=aP7E4A6wcy0kityVo0QvX7U13g4%3D)

和上面的对比下，这就是没有分块的响应。

当然，现在的文件比较小，可以找一个大一点的文件试一下：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b3c659b7382a495d8b4a5a6f7a6ac708~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=rxOfgGqxSVxP5DSYg2LHoeSG1Bw%3D)

可以看到，现在分片就多了：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9ecc014c65eb456ead9f060a7139434c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=aA08WlU2aopW6BviqeWz%2FEF3qjg%3D)

大概是 65536 一个分块，也就是 64k。

每个分块都有 chunk size 和 chunk data：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d954d2c05d4f435498cb284f40f47fdd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1745634891&x-orig-sign=dskNNxNMuuB%2FtSXA2ytZZyjUzL0%3D)

确实是分块了。

### 总结

大文件上传的优化是分片上传，大文件下载的优化是分片下载。

只不过这个分片下载 http 帮你做了，你只要指定 transfer-encoding:chunked 就行，也叫流式传输。

在 Nest 里可以用 fs.createReadStream 获取文件流，然后返回 StreamableFile 的对象就可以了。

返回的响应就是流式的，我们通过 wireshark 抓包证实了这点。

每个分块都有 chunk size、chunk data 的信息。

### 前端如何下载

1.  **使用分片下载：** 将大文件分割成多个小块进行下载，可以降低内存占用和网络传输中断的风险。这样可以避免一次性下载整个大文件造成的性能问题。
1.  **断点续传：** 实现断点续传功能，即在下载中途中断后，可以从已下载的部分继续下载，而不需要重新下载整个文件。
1.  **进度条显示：** 在页面上展示下载进度，让用户清晰地看到文件下载的进度。如果一次全部下载可以从 process 中直接拿到参数计算得出（很精细），如果是分片下载，也是计算已下载的和总大小，只不过已下载的会成片成片的增加（不是很精细）。
1.  **取消下载和暂停下载功能：** 提供取消下载和暂停下载的按钮，让用户可以根据需要中止或暂停下载过程。
1.  **合并文件：** 下载完成后，将所有分片文件合并成一个完整的文件。

以下是一个基本的前端大文件下载的实现示例：

可以在类里面增加注入一个回调函数，用来更新外部的一些状态，示例中只展示下载完成后的回调

```js
class FileDownloader {
  constructor({url, fileName, chunkSize = 2 * 1024 * 1024, cb}) {
    this.url = url;
    this.fileName = fileName;
    this.chunkSize = chunkSize;
    this.fileSize = 0;
    this.totalChunks = 0;
    this.currentChunk = 0;
    this.downloadedSize = 0;
    this.chunks = [];
    this.abortController = new AbortController();
    this.paused = false;
    this.cb = cb
  }

  async getFileSize() {
    const response = await fetch(this.url, { signal: this.abortController.signal });
    const contentLength = response.headers.get("content-length");
    this.fileSize = parseInt(contentLength);
    this.totalChunks = Math.ceil(this.fileSize / this.chunkSize);
  }

  async downloadChunk(chunkIndex) {
    try {
        const start = chunkIndex * this.chunkSize;
        const end = Math.min(this.fileSize, (chunkIndex + 1) * this.chunkSize - 1);

        const response = await fetch(this.url, {
          headers: { Range: `bytes=${start}-${end}` },
          signal: this.abortController.signal
        });

        if (!response.ok) { throw new Error('Network response was not ok'); }

        const blob = await response.blob();
        this.chunks[chunkIndex] = blob;
        this.downloadedSize += blob.size;

        if (!this.paused && this.currentChunk < this.totalChunks - 1) {
          this.currentChunk++;
          this.downloadChunk(this.currentChunk);
        } else if (this.currentChunk === this.totalChunks - 1) {
          this.mergeChunks();
        }
    } catch (err) {
      console.log('err', err)
    }
  }

  async startDownload() {
    if (this.chunks.length === 0) {
      await this.getFileSize();
    }
    this.downloadChunk(this.currentChunk);
  }

  pauseDownload() {
    this.paused = true;
  }

  resumeDownload() {
    this.paused = false;
    this.downloadChunk(this.currentChunk);
  }

  cancelDownload() {
    this.abortController.abort();
    this.reset();
  }

  async mergeChunks() {
    const blob = new Blob(this.chunks, { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = this.fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      this.cb && this.cb({
        downState: 1
      })
      this.reset();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  reset() {
    this.chunks = [];
    this.fileName = '';
    this.fileSize = 0;
    this.totalChunks = 0;
    this.currentChunk = 0;
    this.downloadedSize = 0;
  }
}


// 使用示例
const url = "https://example.com/largefile.zip";
const fileName = "largefile.zip";

const downloader = new FileDownloader({url, fileName, cb: this.updateData});

// 更新状态
updateData(res) {
  const {downState} = res
  this.downState = downState
}

// 开始下载
downloader.startDownload();

// 暂停下载
// downloader.pauseDownload();

// 继续下载
// downloader.resumeDownload();

// 取消下载
// downloader.cancelDownload();

```
