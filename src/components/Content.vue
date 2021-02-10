<template>
  <div class="content">
    <h1>{{ ShortStories[index.i].title }}</h1>
    <p v-for="text in ShortStories[index.i].content" :key="text">{{ text }}</p>
    <router-link to="/home">戻る</router-link>
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
}
</script>

<style>
.content {
  position: relative;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  text-align: center;

  width: 100%;
  height: 100%;
}
</style>