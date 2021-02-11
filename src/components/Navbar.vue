<template>
  <div class="nav">
    <div @click="movePage('/home')"><span class="item">ホーム</span></div>
    <div @click="movePage('/gallery')"><span class="item">ギャラリー</span></div>
    <div @click="movePage('/settings')"><span class="item">設定</span></div>
    <div @click="movePage('/')"><span class="item">タイトル</span></div>
  </div>
</template>

<script>
import AudioFunc from '../mixins/AudioFunc'

export default {
  name: 'nav',
  computed: {
    AudioFunc() {
      return AudioFunc
    },
  },
  methods: {
    movePage: function(url) {
      AudioFunc.methods.playSE('./static/se/page.mp3')
      this.$router.push(url)
    }
  }
}
</script>

<style>
.nav {
  position: absolute;
  bottom: 1rem;
  right: 0;
}

  .item {
    margin: 0 1rem;
  }
</style>