<template>
  <div class="nav">
    <a @click="movePage('home')"><span class="item">ホーム</span></a>
    <a @click="movePage('gallery')"><span class="item">ギャラリー</span></a>
    <a @click="movePage('afterword')" v-if="this.afterwordBool === true"><span class="item">あとがき</span></a>
    <a @click="movePage('settings')"><span class="item">設定</span></a>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'

export default {
  name: 'nav',
  props: { selector: Object },
  computed: {
    SaveData() {
      return SaveData
    },
  },
  data() {
    return {
      afterwordBool: Boolean,
    }
  },
  mounted: function() {
    let array = SaveData.methods.getCompleteRate().slice(0, 7)
    const test = (value) => value === true
    this.afterwordBool = array.every(test)
  },
  methods: {
    movePage: function(id) {
      if (this.selector.value === id) return

      let currentElm = document.getElementById(this.selector.value)
      currentElm.classList.add('fadeout')

      window.__TAURI__.tauri.invoke({
        cmd: 'playSE',
        file_name: 'turnPage1',
        volume: SaveData.methods.getSEVol()
      })

      setTimeout(function() {
        this.selector.value = id // change components
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