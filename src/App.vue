<template>
  <div class="app" id="app">
    <router-view :index="idx"></router-view>
    <audio src="" preload="" id="bgm1"></audio>
    <audio src="" preload="" id="bgm2"></audio>
    <audio src="" preload="" id="se"></audio>
  </div>
</template>

<script>
export default {
  name: 'game_title',
  data() {
    return {
      idx: { i: Number },
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

      window.__TAURI__.tauri.invoke({ cmd: 'myCustomCommand', arg: htmlElm.style.fontSize })
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
