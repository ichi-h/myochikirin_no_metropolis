<template>
  <div class="nav">
    <div @click="movePage('/home')"><span class="item">ホーム</span></div>
    <div @click="movePage('/gallery')"><span class="item">ギャラリー</span></div>
    <div @click="movePage('/settings')"><span class="item">設定</span></div>
    <div @click="movePage('/')"><span class="item">タイトル</span></div>
  </div>
</template>

<script>
import SaveData from '../mixins/SaveData'
import AudioFunc from '../mixins/AudioFunc'

export default {
  name: 'nav',
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
    },
  },
  methods: {
    movePage: function(url) {
      let currentURL = this.$route.path

      if (currentURL == url) return

      currentURL = currentURL.replace('/', '')

      let elm = document.getElementById(currentURL)
      
      if (url == '/') {
        let appClassList = document.getElementById('app').classList

        if (appClassList.contains('fadeout-long')) {
          appClassList.remove('fadeout-long')
        }
        else if (appClassList.contains('fadein-long')) {
          appClassList.remove('fadein-long')
        }
        
        AudioFunc.methods.playSE('./static/se/bell.mp3', SaveData.methods.getSEVol())
        appClassList.add('fadeout-long')

        setTimeout(function() {
          this.$router.push('/')
        }.bind(this), 3000)
        return
      }

      AudioFunc.methods.playSE('./static/se/page.mp3', SaveData.methods.getSEVol())
      elm.classList.add('fadeout')

      setTimeout(function() {
        this.$router.push(url)
      }.bind(this), 500)
    }
  }
}
</script>

<style>
.nav {
  position: absolute;
  bottom: 1rem;
  right: 0;
}

  .item {
    margin: 0 1rem;
  }
</style>