<template>
  <div
    class="start"
    ref="start"
    @click="startGame()"
    :style="'background-image: url(' + Images.theme + ');'"
  >
    <h2 class="blinking">画面をクリックしてください。</h2>
  </div>
</template>

<script>
import AppRef from '@/mixins/AppRef'
import SaveData from '@/mixins/SaveData'
import Images from '@/mixins/Images'

export default {
  name: 'start',
  props: {
    loaded: Object
  },
  computed: {
    AppRef() {
      return AppRef
    },
    SaveData() {
      return SaveData
    },
    Images() {
      return Images
    },
  },
  mounted : function() {
    let loaded = this.loaded
    let startRef = this.$refs.start

    const checkBrowser = () => {
      return new Promise((resolve, reject) => {
        let browser = window.navigator.userAgent.toLowerCase()
        if (browser.indexOf('edge') != -1
        || browser.indexOf('safari') != -1
        || browser.indexOf('applewebkit') != -1) {
          resolve()
        }
        else {
          reject('browser error')
        }
      })
    }
    
    const getJson = () => {
      return new Promise((resolve) => {
        let jsonPromise = window.__TAURI__.fs.readTextFile('./savedata/savedata.json')
        window.__TAURI__.tauri.invoke({
          cmd: 'myCustomCommand',
          arg: String(jsonPromise),
        })
        resolve(jsonPromise)
      });
    }

    const loadSavedata = async (jsonStr) => {
      let jsonObj = JSON.parse(jsonStr)

      SaveData.methods.setBGMVol(jsonObj.bgmVol)
      SaveData.methods.setSEVol(jsonObj.seVol)
      SaveData.methods.setTextSpeed(jsonObj.textSpeed)
      SaveData.methods.setCompleteRate(jsonObj.complateRate)

      // let array = Array(9).fill(false)

      // SaveData.methods.setBGMVol("0.5")
      // SaveData.methods.setSEVol("1")
      // SaveData.methods.setTextSpeed("91")
      // SaveData.methods.setCompleteRate(array)

      // SaveData.methods.save()
    }

    const finishLoad = async () => {
      loaded.bool = true
    }

    const startBGM = async () => {
      window.__TAURI__.tauri.invoke({
        cmd: 'playBGM',
        volume: SaveData.methods.getBGMVol()
      })
    }

    const fadein = async () => {
      let appRef = AppRef.methods.getRef()
      let appClassList = appRef.classList

      if (appClassList.contains('fadein-long')) {
        appClassList.remove('fadein-long')
      }
      if (appClassList.contains('fadeout-long')) {
        appClassList.remove('fadeout-long')
      }

      appClassList.add('fadein-long')
      startRef.style.pointerEvents = 'auto'
    }

    const processAll = async () => {
      await checkBrowser()
      await getJson()
        .then(async (jsonPromise) => {
          await loadSavedata(jsonPromise)
        })
        .then(async () => {
          await finishLoad()
          await startBGM()
          await fadein()
        })
    }

    processAll()
      .catch((e) => {
        startRef.style.background = 'none'
        startRef.innerHTML = ''

        loaded.bool = true

        let appRef = AppRef.methods.getRef()
        appRef.style.background = "none"
        appRef.classList.add('fadein-long')
      })
  },
  methods: {
    startGame: function() {
      this.$refs.start.style.pointerEvents = 'none'

      window.__TAURI__.tauri.invoke({
        cmd: 'playSE',
        file_name: 'bell',
        volume: SaveData.methods.getSEVol()
      })

      let appRef = AppRef.methods.getRef()
      appRef.classList.add('fadeout-long')
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