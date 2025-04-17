# Vue 社区

<script setup>
import { ref } from 'vue'

const count = ref([
  { name: 'Vue.js', icon: 'https://router.vuejs.org/logo.svg', url: 'https://cn.vuejs.org/guide/essentials/application' },
  { name: 'Vue Router', icon: 'https://router.vuejs.org/logo.svg', url: 'https://router.vuejs.org/zh/introduction.html' },
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
  margin-right: 16px;
  margin-bottom: 16px;
  cursor: pointer;
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.text {
  font-size: 14px;
  font-weight: 500;
}


</style>
