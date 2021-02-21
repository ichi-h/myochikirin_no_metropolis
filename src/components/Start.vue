<template>
  <div class="start" id="start" @click="startToHome()">
    <h1>タイトル</h1>
    <h2>画面をクリックしてください。</h2>
  </div>
</template>

<script>
import SaveData from '../mixins/SaveData'
import AudioFunc from '../mixins/AudioFunc'

export default {
  name: 'start',
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
      let bgmElm = AudioFunc.methods.playBGM(SaveData.methods.getBGMVol())

      bgmElm[0].addEventListener("canplaythrough", function() {
        let appClassList = document.getElementById('app').classList

        if (appClassList.contains('fadein-long')) {
          appClassList.remove('fadein-long')
        }
        if (appClassList.contains('fadeout-long')) {
          appClassList.remove('fadeout-long')
        }

        appClassList.add('fadein-long')
      }, false)
    }

    const processAll = async function() {
      await p1()
      await p2()
      await p3()
      await p4()
    }

    processAll()
  },
  methods: {
    startToHome: function() {
      AudioFunc.methods.playSE('./static/se/bell.mp3', SaveData.methods.getSEVol())
      document.getElementById('app').classList.add('fadeout-long')
      setTimeout(function() {
        this.$router.push('/home')
      }.bind(this), 3000)
    }
  }
}
</script>

<style>
.start {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>