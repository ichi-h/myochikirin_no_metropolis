<template>
  <div class="app" id="app">
    <router-view :index="idx"></router-view>
    <audio src="" preload="" id="bgm1"></audio>
    <audio src="" preload="" id="bgm2"></audio>
    <audio src="" preload="" id="se"></audio>
  </div>
</template>

<script>
import SaveData from './mixins/SaveData'
import AudioFunc from './mixins/AudioFunc'

export default {
  name: 'game_title',
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
    },
  },
  mounted : function() {
    const process1 = async function() {
      SaveData.methods.loadJson()
      SaveData.methods.loadFiles()
    }

    const process2 = async function() {
      AudioFunc.methods.playBGM(SaveData.methods.getBGMVol())
    }

    const processAll = async function() {
      await process1()
      await process2()
    }

    processAll()
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

  pointer-events: all;

  font-family: 'Satuki' !important;
}

.app {
  width: 100vw;
  height: 100vh;

  background-image: url('/static/img/texture.png');

  opacity: 0;
}
</style>
