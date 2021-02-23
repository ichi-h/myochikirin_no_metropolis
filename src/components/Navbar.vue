<template>
  <div class="nav">
    <a @click="movePage('/home')"><span class="item">ホーム</span></a>
    <a @click="movePage('/gallery')"><span class="item">ギャラリー</span></a>
    <a @click="movePage('/settings')"><span class="item">設定</span></a>
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
  bottom: 0;
  right: 0;
  transform: translateX(-2rem) translateY(-2rem);
}

  .item {
    margin: 0 1rem;
    cursor: pointer;
  }
</style>