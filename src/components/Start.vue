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
  props: {
    loaded: Object,
    message: Object,
  },
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
    let message = this.message

    let jsonPromise
    let jsonObj

    const checkBrowser = function() {
      return new Promise((resolve, reject) => {
        let browser = window.navigator.userAgent.toLowerCase()
        if (browser.indexOf('edge') != -1
        || browser.indexOf('safari') != -1
        || browser.indexOf('applewebkit') != -1)
        {
          resolve()
        }
        else {
          throw 'browser error'
        }
      })
    }
    
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
      }).catch((e) => {
        let array = Array(9).fill(false)

        SaveData.methods.setBGMVol("0.5")
        SaveData.methods.setSEVol("1")
        SaveData.methods.setTextSpeed("91")
        SaveData.methods.setCompleteRate(array)

        SaveData.methods.save()
      })
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
        document.getElementById('start').style.pointerEvents = 'auto'
      }, false)
    }

    const processAll = async function() {
      await p1()
      await p2()
      await p3()
      await p4()
    }

    checkBrowser()
      .then(processAll)
      .catch((e) => {
        let startElm = document.getElementById('start')
        startElm.style.background = 'none'
        startElm.innerHTML = ''
        
        loaded.bool = true

        message.elm.style.visibility = 'visible'

        let appElm = document.getElementById('app')
        appElm.style.background = "none"
        appElm.classList.add('fadein-long')
      })
  },
  methods: {
    startGame: function() {
      document.getElementById('start').style.pointerEvents = 'none'

      window.__TAURI__.tauri.invoke({ cmd: 'playSE', file_name: 'bell', volume: 1.0 }) // test code
      window.__TAURI__.tauri.invoke({ cmd: 'changeBGMVolme', volume: 0.1 }) // test code

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

  pointer-events: none;

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