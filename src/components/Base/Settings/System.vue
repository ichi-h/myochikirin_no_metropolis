<template>
  <div class="system">
    <h1>設定</h1>
    <div class="system-item">
      <h2>BGM音量</h2>
      <input v-on:change="updateBGMVol" type="range" name="bgm-vol" ref="bgm-vol" min="0" max="1" step="0.05">
    </div>
    <div class="system-item">
      <h2>SE音量</h2>
      <input v-on:change="updateSEVol" type="range" name="se-vol" ref="se-vol" min="0" max="1" step="0.05">
    </div>
    <div class="system-item">
      <h2>文字表示速度</h2>
      <input v-on:change="updateTextSpeed" type="range" name="text-speed" ref="text-speed" min="0" :max="MAX_TEXT_SPEED" step="7">
      <div class="preview">
        <p class="demo-text" ref="demo-text">メッセージ表示テストメッセージ表示テスト</p>
      </div>
    </div>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'
import Text from '@/mixins/Text'

export default {
  name: 'system',
  computed: {
    SaveData() {
      return SaveData
    },
    Text() {
      return Text
    },
  },
  data() {
    return {
      MAX_TEXT_SPEED: Text.methods.getMaxTextSpeed(),
      bgmFader: Object,
      seFader: Object,
      textFader: Object,
      repeatTextTimer: undefined, // 文字送りをループするためのsetIntervalを格納する変数
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

      const speed = Text.methods.getTrueTextSpeed()
      this.repeatTextTimer = setInterval(this.previewDemoText, 25*(speed))
      SaveData.methods.save()
    },

    previewDemoText: function() {
      let pText = this.$refs["demo-text"]

      if (this.textFader.value == this.MAX_TEXT_SPEED) {
        clearInterval(this.repeatTextTimer)
        pText.innerHTML = 'メッセージ表示テストメッセージ表示テスト'
        return
      }

      const speed = Text.methods.getTrueTextSpeed()

      const txt_array = Text.methods.textToArray('メッセージ表示テストメッセージ表示テスト')

      pText.innerHTML = ''

      for (let k = 0; k < txt_array.length; k++) {
        const char = Text.methods.wrapLetterInSpan(txt_array[k])

        pText.appendChild(char)

        window.setTimeout(function() {
          char.style.opacity = 1
        }.bind(this), k*speed)
      }
    },
  },

  mounted: function() {
    this.bgmFader = this.$refs["bgm-vol"]
    this.seFader = this.$refs["se-vol"]
    this.textFader = this.$refs["text-speed"]

    this.bgmFader.value = SaveData.methods.getBGMVol()
    this.seFader.value = SaveData.methods.getSEVol()
    this.textFader.value = SaveData.methods.getTextSpeed()

    const speed = Text.methods.getTrueTextSpeed()
    this.previewDemoText()
    this.repeatTextTimer = setInterval(this.previewDemoText, 25*(speed))
  },

  destroyed: function() {
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

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2.8rem;
    height: 2.8rem;
    margin-top: -1.4rem;
    background-color: #fbfaf5;
    border-radius: 50%;
    cursor: pointer;
  }

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

      width: 2.4rem;
      height: 2.4rem;
      background-color: #fbfaf5;
      border-radius: 50%;
      cursor: pointer;
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
    height: 0;
    border: 1px solid #fbfaf5;
    background-color: #fbfaf5;
  }
</style>