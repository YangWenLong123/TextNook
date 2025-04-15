在浏览器中，两个同域的标签页（Tab）之间通信有多种实现方式，以下是常见的几种方法及其原理和代码示例：

## 1. 使用 `localStorage` 事件

当修改 `localStorage` 时，会触发 `storage` 事件，其他同源页面可以监听该事件实现通信。

```javascript
// Tab A 发送消息
localStorage.setItem('message', JSON.stringify({ content: 'Hello Tab B!' }));

// Tab B 接收消息
window.addEventListener('storage', (e) => {
  if (e.key === 'message') {
    const message = JSON.parse(e.newValue);
    console.log('Received:', message);
  }
});
```

**特点**：

- 只能传递字符串，需手动序列化/反序列化。
- **当前 Tab 修改数据时不会触发自己的监听器**，只有其他 Tab 会收到事件。
- 受同源策略限制，仅限同域页面。

## 2. **BroadcastChannel API**

现代浏览器提供的专用通信 API，允许同源页面通过命名频道通信。

```javascript
// Tab A 发送消息
const channel = new BroadcastChannel('my_channel');
channel.postMessage({ content: 'Hello Tab B!' });

// Tab B 接收消息
const channel = new BroadcastChannel('my_channel');
channel.onmessage = (e) => {
  console.log('Received:', e.data);
};
```

**特点**：

- 直接支持结构化数据（对象、数组等）。
- 需手动关闭频道（`channel.close()`）。
- 兼容性良好（支持 Chrome 54+、Firefox 38+、Edge 79+）。

## 3. **通过 `window.postMessage`（需窗口引用）**

如果两个 Tab 存在引用关系（如通过 `window.open` 打开），可直接通过 `postMessage` 通信。

```javascript
// Tab A 打开 Tab B 并发送消息
const newTab = window.open('https://same-domain.com/tabB');
newTab.postMessage('Hello Tab B!', 'https://same-domain.com');

// Tab B 接收消息
window.addEventListener('message', (e) => {
  if (e.origin === 'https://same-domain.com') {
    console.log('Received:', e.data);
  }
});
```

**特点**：

- 需要直接引用目标窗口对象（如通过 `window.open` 或 `window.opener`）。
- 适用于有明确父子关系的页面。

## 4. **Service Worker 作为中介**

通过 Service Worker 作为消息中转站，实现跨 Tab 通信。

```javascript
// Tab A 发送消息
navigator.serviceWorker.controller.postMessage({
  type: 'MSG_TO_OTHER_TABS',
  data: 'Hello from Tab A!',
});

// Service Worker 代码（sw.js）
self.addEventListener('message', (event) => {
  if (event.data.type === 'MSG_TO_OTHER_TABS') {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        if (client.id !== event.source.id) {
          client.postMessage(event.data);
        }
      });
    });
  }
});

// Tab B 接收消息
navigator.serviceWorker.addEventListener('message', (event) => {
  console.log('Received:', event.data);
});
```

**特点**：

- 支持离线场景和复杂通信逻辑。
- 需要注册 Service Worker（`navigator.serviceWorker.register('sw.js')`）。
