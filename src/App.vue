<template>
  <div class="app" id="app">
    <router-view :index="idx"></router-view>
    <audio src="" preload="" id="bgm"></audio>
    <audio src="" preload="" id="se"></audio>
  </div>
</template>

<script>
import AudioFunc from './mixins/AudioFunc'

export default {
  name: 'game_title',
  computed: {
    AudioFunc() {
      return AudioFunc
    },
  },
  mounted : function() {
    AudioFunc.methods.init()
    AudioFunc.methods.playBGM('./static/bgm/test1.mp3')
  },
  data() {
    return {
      idx: { i: Number },
    }
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
  color: white;
}

.app {
  width: 100vw;
  height: 100vh;

  background-color: #111117;
}
</style>
