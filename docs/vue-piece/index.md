---
title: '程序员盒子、Vue社区'
description: '搭建最全的 Vue3 生态社区资源文档'
---

搭建最全的 Vue3 生态社区资源文档

## Vue 社区

<script setup>
import { ref } from 'vue'

const count = ref([
  { name: 'Vue.js', icon: 'https://router.vuejs.org/logo.svg', url: 'https://cn.vuejs.org/guide/essentials/application' },
  { name: 'Vue Router', icon: 'https://router.vuejs.org/logo.svg', url: 'https://router.vuejs.org/zh/introduction.html' },
  { name: 'Pinia', icon: 'https://pinia.web3doc.top/logo.svg', url: 'https://pinia.web3doc.top/introduction.html' },
  { name: 'Persistedstate', icon: 'https://prazdevs.github.io/pinia-plugin-persistedstate/logo-dark.svg', url: 'https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/' },
  { name: 'Vite', icon: 'https://cn.vitejs.dev/logo.svg', url: 'https://cn.vitejs.dev/guide/#trying-vite-online' },
  { name: 'VueUse', icon: 'https://vueuse.nodejs.cn/favicon.svg', url: 'https://vueuse.nodejs.cn/' },
  { name: 'Nuxt JS', icon: 'https://www.nuxtjs.cn/icon.png', url: 'https://www.nuxtjs.cn/guide/installation' },
])


const count2 = ref([
  { name: 'Vue.js挑战', icon: 'https://router.vuejs.org/logo.svg', url: 'https://cn-vuejs-challenges.netlify.app/' },
  { name: 'Vue.js Examples', icon: 'https://vuejsexamples.com/assets/vue.png', url: 'https://vuejsexamples.com/' },
  { name: 'Vue 3 备忘清单', icon: 'https://wangchujiang.com/reference/icons/touch-icon-iphone.png', url: 'https://quickref.cn/docs/vue.html' },
])

const count3 = ref([
  { name: 'Ant Design Vue', icon: 'https://next.antdv.com/assets/logo.1ef800a8.svg', url: 'https://antdv.com/docs/vue/introduce-cn/' },
  { name: 'Element Plus', icon: 'https://element-plus.org/images/element-plus-logo-small.svg', url: 'https://element-plus.org/zh-CN/' },
  { name: 'Vue Amazing UI', icon: 'https://themusecatcher.github.io/vue-amazing-ui/amazing-logo.svg', url: 'https://themusecatcher.github.io/vue-amazing-ui/' },
  { name: 'Naive UI', icon: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg', url: 'https://www.naiveui.com/zh-CN/os-theme' },
  { name: 'Vant', icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png', url: 'https://vant-ui.github.io/vant/#/zh-CN/home' },
  { name: 'VARLET', icon: 'https://varlet-varletjs.vercel.app/varlet_icon.png', url: 'https://varlet-varletjs.vercel.app/#/zh-CN/index' },
  { name: 'TDesign', icon: 'https://static.tdesign.tencent.com/favicon.ico', url: 'https://tdesign.tencent.com/vue-next/getting-started' },
  { name: 'Vuetify 3', icon: 'https://vuetifyjs.com/favicon.ico', url: 'https://vuetifyjs.com/zh-Hans/getting-started/installation/#section-5b8988c5' },
  { name: 'Primevue', icon: 'https://primevue.org/favicon.ico', url: 'https://primevue.org/vite' },
  { name: 'View Design', icon: 'https://file.iviewui.com/view-design-logo.png', url: 'https://www.iviewui.com/view-ui-plus/guide/introduce' },
  { name: 'Radix Vue', icon: 'https://www.radix-vue.com/logo.svg', url: 'https://www.radix-vue.com/' },
  { name: 'Quasar', icon: 'https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg', url: 'https://quasar.dev/start/quick-start' },
  { name: 'iDux', icon: '  https://idux.site/icons/logo.svg', url: 'https://idux.site/docs/introduce/zh' },
  { name: 'Vue DevUI', icon: 'https://vue-devui.github.io/assets/logo.svg', url: 'https://vue-devui.github.io/' },
])

const goPage = (url) => {
  window.open(url)
}

</script>

<div :class="$style.main">
  <div :class="$style.card" v-for="(row, key) in count" @click="goPage(row.url)">
    <img :src="row.icon" :class="$style.icon">
    <span :class="$style.text">{{ row.name }}</span>
  </div>
</div>

## Vue 生态

<div :class="$style.main">
  <div :class="$style.card" v-for="(row, key) in count2" @click="goPage(row.url)">
    <img :src="row.icon" :class="$style.icon">
    <span :class="$style.text">{{ row.name }}</span>
  </div>
</div>

## Vue UI 组件库

<div :class="$style.main">
  <div :class="$style.card" v-for="(row, key) in count3" @click="goPage(row.url)">
    <img :src="row.icon" :class="$style.icon">
    <span :class="$style.text">{{ row.name }}</span>
  </div>
</div>

## Vue 插件库生态

| 插件名称                   | 插件地址                                                         | Demo                                                                 | 插件描述                                                     |
| -------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| vue-draggable-resizable    | [查看](https://www.npmjs.com/package/vue-draggable-resizable)    | [预览](https://mauricius.github.io/vue-draggable-resizable)          | 用于可拖动和可调整大小元素的 Vue 组件                        |
| vue3-draggable-resizable   | [查看](https://www.npmjs.com/package/vue3-draggable-resizable)   | -                                                                    | 用于可拖动和可调整大小元素的 Vue 组件                        |
| vue-qrcode-reader          | [查看](https://github.com/gruhn/vue-qrcode-reader)               | [预览](https://gruhn.github.io/vue-qrcode-reader/)                   | 用于直接在浏览器中检测二维码和各种                           |
| vue-office                 | [查看](https://github.com/501351981/vue-office)                  | [预览](https://501351981.github.io/vue-office/examples/docs/)        | 支持 docx、xlsx、pdf 文件预览                                |
| vue-print-next             | [查看](https://www.npmjs.com/package/vue-print-next)             | [预览](https://alexpang.cn/vue-print-next/docs/)                     | 高效、灵活的打印解决方案                                     |
| v3-img-preview             | [查看](https://www.npmjs.com/package/v3-img-preview)             | [预览](https://alfred-skyblue.github.io/v3-img-preview)              | 基于 vue3 的图片预览插件                                     |
| codemirror-editor-vue3     | [查看](https://www.npmjs.com/package/codemirror-editor-vue3)     | [预览](https://rennzhang.github.io/codemirror-editor-vue3/zh-CN/)    | CodeMirror 的 vue3 组件, 开箱即用                            |
| vue-draggable-next         | [查看](https://www.npmjs.com/package/vue-draggable-next)         | [预览](https://vue-draggable-next.vercel.app)                        | Vue 3 drag-and-drop component based on Sortable.js           |
| vue.draggable.next         | [查看](https://github.com/SortableJS/vue.draggable.next)         | [预览](https://sortablejs.github.io/vue.draggable.next/#/simple)     | Vue 组件（Vue.js 3.0）允许拖放和与视图模型数组同步           |
| sortablejs-vue3            | [查看](https://www.npmjs.com/package/sortablejs-vue3)            | [预览](https://sortablejs-vue3.maxleiter.com/)                       | 基于 Sortable.js 的 Vue 3 拖放组件                           |
| vue3-emoji-picker          | [查看](https://www.npmjs.com/package/vue3-emoji-picker)          | [预览](https://codesandbox.io/p/github/delowardev/vue3-emoji-picker) | Vue3 Emoji Picker                                            |
| vue3-lazyload              | [查看](https://www.npmjs.com/package/vue3-lazyload)              | [预览](https://murongg.github.io/vue3-lazyload/)                     | 一个 vue3.x 图像延迟加载插件                                 |
| vue3-quill                 | [查看](https://www.npmjs.com/package/vue3-quill)                 | [预览](https://flyween.github.io/vue3-quill)                         | Vue3 的 Quill 编辑器                                         |
| vue3-signature             | [查看](https://www.npmjs.com/package/vue3-signature)             | -                                                                    | Vue3.js 的电子签名组件                                       |
| vue3-contextmenu           | [查看](https://www.npmjs.com/package/vue3-contextmenu)           | [预览](https://hunlongyu.github.io/vue3-contextmenu)                 | 右键菜单                                                     |
| @imengyu/vue3-context-menu | [查看](https://www.npmjs.com/package/@imengyu/vue3-context-menu) | [预览](https://docs.imengyu.top/vue3-context-menu-docs/en/)          | 右键菜单                                                     |
| qrcode-vue3                | [查看](https://www.npmjs.com/package/qrcode-vue3)                | [预览](https://qrcode-vue3-sample.vercel.app/)                       | 用于生成带有徽标和样式的二维码的 JavaScript 库               |
| vue3-text-clamp            | [查看](https://www.npmjs.com/package/vue3-text-clamp)            | [预览](https://sherwinshen.github.io/vue3-text-clamp/)               | Vue3 多行文本省略组件                                        |
| vue3-json-viewer           | [查看](https://www.npmjs.com/package/vue3-json-viewer)           | [预览](https://vjv-doc-qiuquanwu.vercel.app/)                        | 简单易用的 json 内容展示组件                                 |
| vue3-ts-jsoneditor         | [查看](https://www.npmjs.com/package/vue3-ts-jsoneditor)         | [预览](https://bestkolobok.github.io/vue3-jsoneditor/)               | json 编辑器                                                  |
| vue3-video-play            | [查看](https://www.npmjs.com/package/vue3-video-play)            | [预览](https://codelife.cc/vue3-video-play/)                         | 适用于 Vue3 的 hls.js 播放器组件，并且支持 MP4/WebM/Ogg 格式 |
| vue3-virtual-scroll-list   | [查看](https://www.npmjs.com/package/vue3-virtual-scroll-list)   | [预览](https://vue3-virtual-scroll-list-examples-xi.vercel.app)      | 一个 vue3 组件，支持高滚动性能的大量数据列表                 |
| monaco-editor-vue3         | [查看](https://www.npmjs.com/package/monaco-editor-vue3)         | -                                                                    | Monaco Editor<MonacoEditor/>是支持 VS Code 的代码编辑器      |
| vue3-tree-org              | [查看](https://www.npmjs.com/package/vue3-tree-org)              | [预览](https://sangtian152.github.io/vue3-tree-org/)                 | 基于 vue3.x 的组织架构图                                     |
| vue3-star-ratings          | [查看](https://www.npmjs.com/package/vue3-star-ratings)          | [预览](https://vue3-star-ratings.netlify.app/demo)                   | vue3 星级评分                                                |
| vue-codemirror6            | [查看](https://www.npmjs.com/package/vue-codemirror6)            | [预览](https://logue.dev/vue-codemirror6/)                           | 代码编辑器                                                   |
| vue-danmaku                | [查看](https://www.npmjs.com/package/vue3-danmaku)               | [预览](https://hellodigua.github.io/vue-danmaku/)                    | 基于 Vue.js 的弹幕交互组件                                   |
| vue3-json-excel            | [查看](https://www.npmjs.com/package/vue3-json-excel)            | -                                                                    | 将 JSON 格式数据以 excel 文件的形式下载                      |
| vue3-google-oauth2         | [查看](https://www.npmjs.com/package/vue3-google-oauth2)         | [预览](https://boring-lamport-199b25.netlify.app/)                   | 谷歌账号登录                                                 |
| vue3-countdown             | [查看](https://www.npmjs.com/package/vue3-countdown)             | [预览](https://wuanrin.github.io/vue3-countdown)                     | 倒计时组件                                                   |
| vcolorpicker               | [查看](https://www.npmjs.com/package/vcolorpicker)               | [预览](http://vue-color-picker.rxshc.com/)                           | 基于 Vue 的颜色选择器插件                                    |
| @vueusemotion              | [查看](https://github.com/vueuse/motion)                         | [预览](https://motion.vueuse.org/)                                   | 可组合项可使您的组件动起来                                   |
| vue3-dnd                   | [查看](https://github.com/hcg1023/vue3-dnd)                      | [预览](https://www.vue3-dnd.com/)                                    | Drag and Drop for Vue3                                       |

## 在线演练场

- [VueUse Playground](https://play.vueuse.org/)
- [Vue + Vite on Repl.it](https://replit.com/@replit/VueJS)
- [Vue on CodeSandbox](https://codesandbox.io/p/devbox/github/codesandbox/sandbox-templates/tree/main/vue-vite)
- [Vue on Codepen](https://codepen.io/pen/editor/vue)
- [Vue on WebComponents.dev](https://studio.webcomponents.dev/create/cevue)
- [Vue 3 Template Explorer](https://template-explorer.vuejs.org/#eyJzcmMiOiI8ZGl2PlxyXG4gIDIzMVxyXG48L2Rpdj4iLCJvcHRpb25zIjp7Im9wdGltaXplQmluZGluZ3MiOmZhbHNlfX0=)

<style module>
.main {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.card {
  font-weight: bold;
  box-sizing: border-box;
  padding: 3px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  &:hover .text{
    color: #3451b2 !important;
  }
}

.icon {
  height: 50px;
  margin-bottom: 4px;
}

.text {
  font-size: 14px;
  font-weight: 500;
  
}

</style>

<!-- <script
  src="https://beaudar.lipk.org/client.js"
  repo="https://github.com/YangWenLong123/TextNook"
  branch="main"
  issue-term="pathname"
  issue-label="pathname"
  theme="github-dark"
  crossorigin="anonymous"
  async
>
</script> -->
