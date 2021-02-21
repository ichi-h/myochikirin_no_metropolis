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
    let jsonPromise
    let jsonObj
    
    const p1 = async function() {
      jsonPromise = window.__TAURI__.fs.readTextFile('./savedata/savedata.json')
    }

    const p2 = async function() {
      await jsonPromise.then(function(item) {
        jsonObj = JSON.parse(item)

        SaveData.methods.setBGMVol(jsonObj.bgmVol)
        SaveData.methods.setSEVol(jsonObj.seVol)
        SaveData.methods.setTextSpeed(jsonObj.textSpeed)
        SaveData.methods.setCompleteRate(jsonObj.complateRate)
      }).catch((e) => { })
    }
    
    const p3 = async function() {
      SaveData.methods.loadFiles()
    }

    const p4 = async function() {
      AudioFunc.methods.playBGM(SaveData.methods.getBGMVol())
    }

    const processAll = async function() {
      await p1()
      await p2()
      await p3()
      await p4()
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
