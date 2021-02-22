<template>
  <div class="start" id="start" @click="startToHome()">
    <div class="top-cover"></div>
    <div class="bottom-cover"></div>
    <h1>めうちきりんの<br>メトロポリス</h1>
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
  position: relative;

  background-image: url('/static/img/theme.png');
  background-size: cover;

  width: 100vw;
  height: 100vh;
}

  .start > h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    font-size: 7rem;
    text-align: center;

    text-shadow: 0 10px 25px 0 rgba(2, 2, 2, .2);
    box-shadow: 0 10px 25px 0 rgba(2, 2, 2, .2);
    
    border: 10px double #fbfaf5;
    padding: 1rem;
  }

  .start > h2 {
    position: absolute;
    bottom: calc(3.5vh - 1rem);
    left: 50%;
    transform: translateX(-50%);

    font-size: 1.5rem;

    animation: blinking 3s linear infinite;
  }
    @keyframes blinking {
      0% { opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }

.top-cover, .bottom-cover {
  position: absolute;

  background-color: #050505;

  height: 7vh;
  width: 100vw;
}

.top-cover {
  top: 0;
}

.bottom-cover {
  bottom: 0;
}
</style>