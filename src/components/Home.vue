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
import Navbar from './Navbar'

export default {
  name: 'home',
  props: { index: Object },
  components: { Navbar },
  computed: {
    ShortStories() {
      return ShortStories
    },
  },
  methods: {
    toContent: function(idx) {
      this.index.i = Number(idx)
      this.$router.push('/content')
    }
  }
}
</script>

<style>

</style>