# 环境变量

对于环境变量，我们可以理解为在不同环境下，也就是在不同的域名下，去加载不同的变量。

常用的环境变量配置有以下几种

```js
  .env.development          //开发环境,一般运行npm run dev时加载
  .env.development.local    //本地环境,一般运行npm run dev时加载
  .env.test                 //测试环境,一般在npm run build:test时加载
  .env.staging              //模拟生成环境,一般在npm run build:staging时加载
  .env.production           //生成环境,一般在npm run build:production时加载
```

需要在 package.json 文件加载

```json
  "scripts": {
    "dev": "vue-cli-service serve --mode development",
    "test": "vue-cli-service serve --mode test",
    "build:dev": "vue-cli-service build --mode development",
    "build:test": "vue-cli-service build --mode test",
    "build:staging": "vue-cli-service build --mode staging",
    "build:production": "vue-cli-service build --mode production",
  },
```

# vite 环境变量和模式

Vite 在特殊的 `import.meta.env` 对象下暴露了一些常量。这些常量在开发阶段被定义为全局变量，并在构建阶段被静态替换，以使树摇（tree-shaking）更有效。

为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE\_ 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这些环境变量：

```bash
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

只有` VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。

```bash
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

如果你想要自定义环境变量的前缀，请参阅 [envPrefix](https://cn.vitejs.dev/config/shared-options#envprefix) 选项。

# env 文件

```bash
  .env  #所有情况下都会加载
  .env.local  #所有情况下都会加载，但会被git忽略
  .env.[mode] #只在指定模式下加载
  .env.[mode].local #只在指定模式下加载，但会被git忽略;
```

请注意，如果想要在环境变量中使用 $ 符号，则必须使用 \ 对其进行转义。

```bash
KEY=123
NEW_KEY1=test$foo   # test
NEW_KEY2=test\$foo  # test$foo
NEW_KEY3=test$KEY   # test123
```

# 环境变量挂在到全局变量中

```ts
export default defineConfig(({ mode }) => {
  return {
    // 定义全局变量
    define: {
      __APP_ENV__: JSON.stringify(config.VITE_APP_API_BASEURL),
    },
  };
});
```

# TypeScript 的智能提示

默认情况下，Vite 在 [vite/client.d.ts](https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts) 中为 `import.meta.env` 提供了类型定义。随着在 `.env[mode]` 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 `VITE_ `为前缀的用户自定义环境变量的 `TypeScript` 智能提示。

要想做到这一点，你可以在 src 目录下创建一个 `vite-env.d.ts` 文件，接着按下面这样增加 `ImportMetaEnv` 的定义：

```bash
/// <reference types="vite/client" />

interface ViteTypeOptions {
  // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
  // 这样就不允许有未知的键值了。
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

# 参考

https://cn.vitejs.dev/guide/env-and-mode
