# 插件市场

<script setup>
import { ref } from 'vue'

const count = ref([
  { name: 'plyr', icon: 'https://cdn.plyr.io/static/icons/favicon.ico', url: 'https://plyr.io/', desc: '视频播放器' },
  { name: 'artplayer', icon: 'https://artplayer.org/assets/img/favicon.ico', url: 'https://artplayer.org/', desc: '视频播放器+弹幕' },
])


const goPage = (url) => {
  window.open(url)
}

</script>

<div :class="$style.main">
  <div :class="$style.card" v-for="(row, key) in count" @click="goPage(row.url)">
    <div :class="$style.nav">
      <img :src="row.icon" :class="$style.icon">
      <span :class="$style.text">{{ row.name }}</span>
    </div>
    <div :class="$style.desc">{{ row.desc }}</div>
  </div>
</div>

<style module scoped>
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
  background-color: #f6f6f7;
  border-radius: 8px;
  padding: 10px 14px;
  min-width: 150px;
  border: 1px solid #f6f6f7;

  &:hover {
    border: 1px solid #5672cd;
  }
}

.nav {
  width: 100%;
  display: flex;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
}

.text {
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
}

.desc {
  color:#67676c;
  margin-top: 8px;
  font-size: 14px;
  text-align: left;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


</style>
