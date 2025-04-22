# 按钮防抖解决方案

```js
import { ref, onUnmounted } from 'vue';

export function useDebounceClick(wait = 300) {
  const isWaiting = ref(false); // 用于防抖的内部状态
  const loading = ref(false); // 用于表示异步操作的加载状态

  const handleClick = async (callback: () => Promise<void> | void) => {
    if (isWaiting.value) return; // 如果仍在等待中，则直接返回

    isWaiting.value = true;
    loading.value = true; // 设置加载状态为 true

    try {
      // 执行用户传入的异步回调函数
      await callback();
    } catch (error) {
      console.error('Error in debounce callback:', error);
    } finally {
      // 在指定的等待时间后恢复状态
      setTimeout(() => {
        isWaiting.value = false;
      }, wait);
      loading.value = false; // 无论成功或失败，都重置加载状态
    }
  };

  // 清除状态（如果需要）
  onUnmounted(() => {
    isWaiting.value = false;
    loading.value = false;
  });

  return {
    handleClick,
    loading, // 返回 loading 状态
  };
}
```

## 使用示例

```js
<script setup lang="ts">
import { useDebounceClick } from './useDebounceClick';

const { handleClick, loading } = useDebounceClick(500); // 设置防抖时间为 500ms

const onButtonClick = async () => {
  console.log('按钮点击事件触发');
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟异步操作
  console.log('异步操作完成');
};
</script>

<template>
  <button @click="handleClick(onButtonClick)" :disabled="loading">
    <span v-if="loading">加载中...</span>
    <span v-else>点击我</span>
  </button>
</template>
```
