<template>
  <div class="nav" ref="nav">
    <a @click="movePage('base-home')"><span class="item">ホーム</span></a>
    <a @click="movePage('base-gallery')"><span class="item">ギャラリー</span></a>
    <a @click="movePage('base-settings')"><span class="item">設定</span></a>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'

export default {
  name: 'nav',
  props: {
    selector: Object
  },
  computed: {
    SaveData() {
      return SaveData
    },
  },
  methods: {
    movePage: function(id) {
      if (this.selector.value === id) return

      this.$refs.nav.style.pointerEvents = 'none'

      let refClassList = window.currentRef.classList

      if (refClassList.contains('fadeout')) {
        refClassList.remove('fadeout')
      }
      refClassList.add('fadeout')

      window.__TAURI__.tauri.invoke({
        cmd: 'playSE',
        file_name: 'turnPage1',
        volume: SaveData.methods.getSEVol()
      })

      setTimeout(function() {
        this.selector.value = id // コンポーネントの切り替え
      }.bind(this), 500)
      setTimeout(function() {
        this.$refs.nav.style.pointerEvents = 'auto'
      }.bind(this), 800)
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