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
    let appClassList = document.getElementById('app').classList

    if (appClassList.contains('fadein-long')) {
      appClassList.remove('fadein-long')
    }
    if (appClassList.contains('fadeout-long')) {
      appClassList.remove('fadeout-long')
    }

    appClassList.add('fadein-long')
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