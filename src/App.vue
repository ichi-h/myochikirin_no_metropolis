<template>
  <div class="app" id="app">
    <router-view :index="idx"></router-view>
    <audio :src="bgmStart" preload="auto" id="bgm1"></audio>
    <audio :src="bgmLoop" preload="auto" id="bgm2"></audio>
    <audio :src="seBell" preload="auto" id="se-bell"></audio>
    <audio :src="seTurnPage1" preload="auto" id="se-turn-page1"></audio>
    <audio :src="seTurnPage2" preload="auto" id="se-turn-page2"></audio>
  </div>
</template>

<script>
import BGMStart from '@/assets/bgm/start.mp3'
import BGMLoop from '@/assets/bgm/loop.mp3'
import SEBell from '@/assets/se/bell.mp3'
import SETurnPage1 from '@/assets/se/turnPage1.mp3'
import SETurnPage2 from '@/assets/se/turnPage2.mp3'

export default {
  name: 'game_title',
  data() {
    return {
      idx: { i: Number },
      bgmStart: BGMStart,
      bgmLoop: BGMLoop,
      seBell: SEBell,
      seTurnPage1: SETurnPage1,
      seTurnPage2: SETurnPage2,
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.changeFontSize, false)
  },

  methods: {
    changeFontSize: function() {
      let htmlElm = document.documentElement
      let currentHeight = htmlElm.clientHeight

      let w = (0.2 / 294) * currentHeight + 0.31

      htmlElm.style.fontSize = `${62.5 * w}%`
    }
  },

  destroyed: function() {
    window.removeEventListener('resize', this.changeFontSize, false)
  },
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;

  user-select:none;
  -webkit-user-select:none;
  -ms-user-select: none;
  -moz-user-select:none;
  -khtml-user-select:none;
  -webkit-user-drag:none;
  -khtml-user-drag:none;

  cursor: default;
  overflow: hidden;

  pointer-events: all;

  color: #fbfaf5;

  font-family: 'togoshi' !important;
}

.app {
  width: 100vw;
  height: 100vh;

  background-image: url('/static/img/bg.jpg');
  background-size: 100vw 100vh;

  opacity: 0;
}
</style>
