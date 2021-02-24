<template>
  <div class="home" id="home">
    <h1>ホーム</h1>

    <div class="titles">
      <ul>
        <li class="title" v-for="shortStory in ShortStories" :key="shortStory.title">
          <a @click="toContent(shortStory.index)">{{ shortStory.title }}</a>
        </li>
      </ul>
    </div>

    <navbar></navbar>
  </div>
</template>

<script>
import SaveData from '../mixins/SaveData'
import AudioFunc from '../mixins/AudioFunc'
import ShortStories from '../mixins/ShortStories'
import Navbar from './Navbar'

export default {
  name: 'home',
  props: { index: Object },
  components: { Navbar },
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
    let appClassList = document.getElementById('app').classList

    if (appClassList.contains('fadeout-long')) {
      appClassList.remove('fadeout-long')
      appClassList.add('fadein-long')
    }
    else {
      document.getElementById('home').classList.add('fadein')
    }
  },
  methods: {
    toContent: function(idx) {
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