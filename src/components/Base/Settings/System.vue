<template>
  <div class="system">
    <h1>設定</h1>
    <div class="system-item">
      <h2>BGM音量</h2>
      <input type="range" name="bgm-vol" ref="bgm-vol" min="0" max="1" step="0.05">
    </div>
    <div class="system-item">
      <h2>SE音量</h2>
      <input type="range" name="se-vol" ref="se-vol" min="0" max="1" step="0.05">
    </div>
    <div class="system-item">
      <h2>文字表示速度</h2>
      <input type="range" name="text-speed" ref="text-speed" min="0" max="140" step="7">
      <div class="preview">
        <p class="demo-text" ref="demo-text">メッセージ表示テストメッセージ表示テスト</p>
      </div>
    </div>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'

export default {
  name: 'system',
  computed: {
    SaveData() {
      return SaveData
    },
  },
  data() {
    return {
      bgmFader: Element,
      seFader: Element,
      textFader: Element,
      repeatTextTimer: undefined,
    }
  },

  methods: {
    updateBGMVol: function() {
      SaveData.methods.setBGMVol(this.bgmFader.value)

      window.__TAURI__.tauri.invoke({
        cmd: 'changeBGMVolme',
        volume: SaveData.methods.getBGMVol()
      })

      SaveData.methods.save()
    },

    updateSEVol: function() {
      SaveData.methods.setSEVol(this.seFader.value)

      window.__TAURI__.tauri.invoke({
        cmd: 'playSE',
        file_name: 'bell',
        volume: SaveData.methods.getSEVol()
      })

      SaveData.methods.save()
    },

    updateTextSpeed: function() {
      clearInterval(this.repeatTextTimer)
      SaveData.methods.setTextSpeed(this.textFader.value)
      this.previewDemoText()
      this.repeatTextTimer = setInterval(this.previewDemoText, 25*(140 - this.textFader.value))
      SaveData.methods.save()
    },

    previewDemoText: function() {
      let pText = this.$refs.demo-text

      if (this.textFader.value == 140) {
        clearInterval(this.repeatTextTimer)
        pText.innerHTML = 'メッセージ表示テストメッセージ表示テスト'
        return
      }

      pText.innerHTML = ''
      let speed = 140 - this.textFader.value

      let txt_str = 'メッセージ表示テストメッセージ表示テスト'
      let txt_array = txt_str.split('')
      txt_array = this.deleteSpace(txt_array)

      for (let k = 0; k < txt_array.length; k++) {
        let char = document.createElement('span')
        char.classList.add('char')
        char.innerHTML = txt_array[k]

        pText.appendChild(char)
        
        window.setTimeout(function() {
          char.style.opacity = 1
        }.bind(this), k*speed)
      }
    },

    deleteSpace: function(array) {
      let space = [' ']

      array = array.filter(function(v) {
        return ! space.includes(v)
      })

      return array
    },
  },

  mounted: function() {
    this.bgmFader = this.$refs.bgm-vol
    this.seFader = this.$refs.se-vol
    this.textFader = this.$refs.text-speed

    this.bgmFader.value = SaveData.methods.getBGMVol()
    this.seFader.value = SaveData.methods.getSEVol()
    this.textFader.value = SaveData.methods.getTextSpeed()

    this.bgmFader.addEventListener('change', this.updateBGMVol, false)
    this.seFader.addEventListener('change', this.updateSEVol, false)
    this.textFader.addEventListener('change', this.updateTextSpeed, false)

    this.previewDemoText()
    this.repeatTextTimer = setInterval(this.previewDemoText, 25*(140 - this.textFader.value))
  },

  destroyed: function() {
    this.bgmFader.removeEventListener('change', this.updateBGMVol, false)
    this.seFader.removeEventListener('change', this.updateSEVol, false)
    this.textFader.removeEventListener('change', this.updateTextSpeed, false)
    clearInterval(this.repeatTextTimer)
  }
}
</script>

<style>
.char {
  opacity: 0;
  transition: .1s;
}

.system-item {
  margin-bottom: 4.8rem;
}

  .preview {
    margin-top: 2.8rem;
  }

input[type=range] {
  box-sizing: border-box;
  line-height: 1;
  height: 5rem;
  background-color: transparent;
  cursor: pointer;
  -webkit-appearance: none;
  width: 50%;
}

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-thumb,
  input[type=range]::-ms-thumb {
    width: 2.8rem;
    height: 2.8rem;
    background-color: #fbfaf5;
    border-radius: 50%;
    cursor: pointer;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    ::-webkit-full-page-media, _:future, :root input[type=range]::-webkit-slider-thumb {
      -webkit-appearance:none;
      margin-top: 1.3rem;
    }
  }

  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: #fbfaf5;
    border: none;
    height: 1px;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    cursor: pointer;
    height: 2em;
    border-bottom: 2px solid #fbfaf5;
    background-color: transparent;
  }
</style>