<template>
  <div class="system">
    <div class="bgm">
      <h2>BGM音量</h2>
      <input type="range" name="bgm-vol" id="bgm-vol" min="0" max="1" step="0.05">
    </div>
    <div class="se">
      <h2>SE音量</h2>
      <input type="range" name="se-vol" id="se-vol" min="0" max="1" step="0.05">
    </div>
    <div class="text-speed">
      <h2>文字表示速度</h2>
      <input type="range" name="text-speed" id="text-speed" min="0" max="140" step="7">
      <div class="preview">
        <p class="demo-text" id="demo-text">色は匂へど　散りぬるを　我が世誰そ　常ならむ</p>
      </div>
    </div>
  </div>
</template>

<script>
import SaveData from '../../mixins/SaveData'
import AudioFunc from '../../mixins/AudioFunc'

export default {
  name: 'system',
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
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
      document.getElementById('bgm1').volume = Number(this.bgmFader.value)
      document.getElementById('bgm2').volume = Number(this.bgmFader.value)
      SaveData.methods.save()
    },

    updateSEVol: function() {
      SaveData.methods.setSEVol(this.seFader.value)
      AudioFunc.methods.playSE('./static/se/bell.mp3', SaveData.methods.getSEVol())
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
      let pText = document.getElementById('demo-text')

      if (this.textFader.value == 140) {
        clearInterval(this.repeatTextTimer)
        pText.innerHTML = '色は匂へど　散りぬるを　我が世誰そ　常ならむ'
        return
      }

      pText.innerHTML = ''

      let txt_str = '色は匂へど　散りぬるを　我が世誰そ　常ならむ'
      let txt_array = txt_str.split('')
      txt_array = this.deleteSpace(txt_array)

      for (let k = 0; k < txt_array.length; k++) {
        let char = document.createElement('span')
        char.classList.add('char')
        char.innerHTML = txt_array[k]

        pText.appendChild(char)

        let speed = 140 - this.textFader.value
        
        window.setTimeout(function() {
          char.classList.add('fadein-text')
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
    this.bgmFader = document.getElementById('bgm-vol')
    this.seFader = document.getElementById('se-vol')
    this.textFader = document.getElementById('text-speed')

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
}
</style>