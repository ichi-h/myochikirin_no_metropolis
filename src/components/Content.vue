<template>
  <div class="content" @click="turnText()">
    <img class="top-image" :src="'./static/img/' + (index.i + 1) + '.png'" alt="">
    <h1>{{ ShortStories[index.i].title }}</h1>
    <p v-for="j in ShortStories[index.i].content.length + 1" :key="j" class="text" :id="'text' + (j-1)">{{ ShortStories[index.i].content[j-1] }}</p>
  </div>
</template>

<script>
import ShortStories from '../mixins/ShortStories'

export default {
  name: 'content',
  props: { index: Object },
  computed: {
    ShortStories() {
      return ShortStories
    },
  },
  data() {
    return {
      textLine: 0,
    }
  },
  methods: {
    turnText: function() {
      let elm = document.getElementById('text' + this.textLine)
      elm.style.opacity = '1'

      this.textLine++

      if (this.textLine == ShortStories[this.index.i].content.length + 1) {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style>
.content {
  background-color: #050505;
  color: #eaf4fc;
}

  .top-image {
    width: 50vw;
    margin-bottom: 2rem;
  }

  .text {
    opacity: 0;
    transition: .3s;
  }
</style>