<template>
  <div class="home" id="home">
    <h1>ホーム</h1>

    <div class="titles" id="titles">
      <ul>
        <li class="title" v-for="shortStory in ShortStories" :key="shortStory.title">
          <a @click="toContent(shortStory.index)">{{ shortStory.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'
import AudioFunc from '@/mixins/AudioFunc'
import ShortStories from '@/mixins/ShortStories'

export default {
  name: 'home',
  props: { index: Object },
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
    },
    ShortStories() {
      return ShortStories
    },
  },
  mounted: function() {
    document.getElementById('home').classList.add('fadein')
  },
  methods: {
    toContent: function(idx) {
      document.getElementById('titles').style.pointerEvents = 'none'

      this.index.i = Number(idx)
      AudioFunc.methods.playSE('se-bell', SaveData.methods.getSEVol())
      
      document.getElementById('app').classList.add('fadeout-long')
      setTimeout(function() {
        this.$router.push('/content')
      }.bind(this), 3000)
    }
  }
}
</script>

<style>
.title {
  margin-bottom: 1.2rem;
}
</style>