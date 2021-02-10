<template>
  <div>
    <h1>{{ ShortStories[index.i].title }}</h1>
    <p v-for="text in ShortStories[index.i].content" :key="text">{{ text }}</p>
    <router-link to="/menu">戻る</router-link>
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

</style>