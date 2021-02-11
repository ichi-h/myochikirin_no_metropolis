<template>
  <div class="home">
    <h1>Home</h1>

    <div class="titles">
      <ul>
        <li v-for="shortStory in ShortStories" :key="shortStory.id">
          <a @click="toContent(shortStory.index)">{{ shortStory.title }}</a>
        </li>
      </ul>
    </div>

    <navbar></navbar>
  </div>
</template>

<script>
import ShortStories from '../mixins/ShortStories'
import AudioFunc from '../mixins/AudioFunc'
import Navbar from './Navbar'

export default {
  name: 'home',
  props: { index: Object },
  components: { Navbar },
  computed: {
    ShortStories() {
      return ShortStories
    },
    AudioFunc() {
      return AudioFunc
    },
  },
  methods: {
    toContent: function(idx) {
      this.index.i = Number(idx)
      AudioFunc.methods.playSE('./static/se/bell.mp3')
      this.$router.push('/content')
    }
  }
}
</script>

<style>

</style>