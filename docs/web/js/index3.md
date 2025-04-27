用户在浏览器中打开某 web 应用（通常是后台管理系统）很长时间且未刷新页面时，如果应用有新功能添加或问题修复，用户可能无法及时知道有新版发布。这样会导致用户继续使用旧版，影响用户体验和数据准确性，甚至出现程序报错。

## 安装

```bash
npm install version-polling --save
```

## 使用示例

使用轮询，当检测到有新版本时，会触发 onUpdate 回调函数，弹出提示用户有更新，点击确定刷新页面。

```javascript
import { createVersionPolling } from 'version-polling';
import { Modal } from 'ant-design-vue';

createVersionPolling({
  appETagKey: '__SOP_TRAINING_SYSTEM__',
  pollingInterval: 5 * 1000,
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    Modal.confirm({
      title: '提示',
      content: '检测到有新版本发布，是否刷新页面？',
      okText: '刷新',
      cancelText: '取消',
      onOk: () => {
        location.reload();
      },
    });
  },
});
```

不使用轮询，仅通过前端事件触发检测

```javascript
import { createVersionPolling } from 'version-polling';
import { Modal } from 'ant-design-vue';

createVersionPolling({
  eventTriggerList: ['popstate'],
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  silentPollingInterval: true,
  onUpdate: (self) => {
    Modal.confirm({
      title: '提示',
      content: '检测到有新版本发布，是否刷新页面？',
      okText: '刷新',
      cancelText: '取消',
      onOk: () => {
        location.reload();
      },
    });
  },
});
```

## API

[](https://www.npmjs.com/package/version-polling#api)

| 参数                  | 说明                                                     | 类型             | 默认值                                               |
| --------------------- | -------------------------------------------------------- | ---------------- | ---------------------------------------------------- |
| vcType                | 版本控制方式，可选值有`etag`、`chunkHash`、`versionJson` | `string`         | `etag`                                               |
| htmlFileUrl           | `index.html`文件地址                                     | `string`         | `${location.origin}${location.pathname}`             |
| chunkName             | chunk 名称                                               | `string`         | `index`                                              |
| versionFileUrl        | `version.json`文件地址                                   | `string`         | `${location.origin}${location.pathname}version.json` |
| eventTriggerList      | 触发版本检测的事件名称列表                               | `string[]`       | `-`                                                  |
| pollingInterval       | 轮询间隔，单位为毫秒，默认为 5 分钟                      | `number`         | `5 * 60 * 1000`                                      |
| silent                | 为`true`时，不进行版本检测                               | `boolean`        | `false`                                              |
| silentPollingInterval | 为`true`时，不做轮询版本检测                             | `boolean`        | `false`                                              |
| silentPageVisibility  | 为`true`时，`visibilitychange`事件不会触发版本检测       | `boolean`        | `false`                                              |
| onUpdate              | 检测到版本更新触发的回调函数                             | `(self) => void` | `-`                                                  |
