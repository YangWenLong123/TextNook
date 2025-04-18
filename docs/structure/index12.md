# 前言

在写组件时，需要考虑以下几点

- 可扩展性
- 可维护性
- 可读性
- 可测性

# 组件封装

组件封装是将前端代码中某一特定功能模块、视图部分或逻辑处理抽象成独立的可复用代码块，以便在不同场景中复用，同时提升开发效率和代码一致性。

主要有以下类型：

- 功能型组件：纯逻辑处理，不涉及 UI。比如表单验证组件、请求封装组件。
- UI 组件：单纯的视图展示，具备一定交互功能，如按钮（Button）、输入框（Input）。
- 业务组件：结合具体业务场景的复杂组件，通常是 UI 和逻辑的结合，如用户登录面板、商品卡片组件。
- 高阶组件（HOC） ：用于逻辑复用的一种模式，接收一个组件作为输入，返回一个新的组件。
- 组合组件：通过组合多个基础组件或业务组件，形成更复杂的组件

# 组件封装是为了什么？

- 提升开发效率： 通过组件的复用，避免重复编写相似的代码。
- 代码维护性： 将复杂代码分解为易于理解和维护的小块，降低维护成本，降低复杂性
- 增强一致性： 统一的组件库确保应用的风格一致，符合设计规范。
- 提升扩展性： 组件封装良好时，可以轻松适配新的需求，通过扩展接口而不是改动原有代码。
- 降低耦合性： 通过明确的接口设计，解耦组件的内部逻辑和外部使用。

# 案例-业务组件封装

写系统时，需要添加内容，比如添加文章、添加评论等，这些内容需要添加到数据库中，并且需要添加到页面中，所以需要一个组件来完成这个功能。

```ts
<script setup lang="ts">
import {ref} from 'vue'
import CreateDep from './CreateDep.vue'

const createDepRef = ref<InstanceType<typeof CreateDep> | null>(null);

// 打开组件
const params = {};

createDepRef.value?.open(
  params,// 组件参数
  onCancel: () => {},// 取消回调
  onSuccess: res => {},// 成功回调
  onError: err => {} // 错误回调
);

</script>


<template>
<CreateDep ref="createDepRef" />
</template>
```

所以我们需要在`CreateDep`组件中添加以下代码：

```ts

<script setup lang="ts">
import {ref} from 'vue'

const params = ref({});
const onCancel = ref(null);

const open = (
  opts?:any,
  cancel?: () => void,
  success?: () => void,
  error?: () => void
) => {

  try {
    onCancel.value = cancel;
    // TODO 处理成功时
    success?.();
  } catch (error) {
    error?.(error);
  }
  params.value = opts;
}

const cancel = () => {
  onCancel.value && onCancel.value?.();
}

defineExpose({open})
</script>


<template>
// 组件内容
</template>

```

在上面组件中，我们通过`open`方法来打开组件，并且传递了参数、成功回调、失败回调等。 这样的业务组件封装就大大提高了可扩展性和可维护性。
