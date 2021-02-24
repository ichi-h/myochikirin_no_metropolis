<template>
  <div
    class="start"
    id="start"
    @click="startGame()"
    :style="'background-image: url(' + Images.theme + ');'"
  >
    <h2 class="blinking">画面をクリックしてください。</h2>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'
import AudioFunc from '@/mixins/AudioFunc'
import Images from '@/mixins/Images'

export default {
  name: 'start',
  props: { loaded: Object },
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
    },
    Images() {
      return Images
    },
  },
  mounted : function() {
    let loaded = this.loaded

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
      loaded.bool = true
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
    startGame: function() {
      AudioFunc.methods.playSE('se-bell', SaveData.methods.getSEVol())
      document.getElementById('app').classList.add('fadeout-long')
      setTimeout(function() {
        this.$router.push('/base')
      }.bind(this), 3000)
    }
  }
}
</script>

<style>
.start {
  position: relative;

  background-size: 100vw 100vh;

  width: 100vw;
  height: 100vh;
}

  .start > h2 {
    position: absolute;
    bottom: calc(6vh - 2.4rem);
    left: 50%;
    transform: translateX(-50%);

    font-size: 2.4rem;
  }
</style>