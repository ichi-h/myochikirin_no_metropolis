<template>
  <div class="music">
    <ul>
      <li v-for="music in MusicList" :key="music.index">{{ music.title }}</li>
    </ul>
  </div>
</template>

<script>
import MusicList from '../../mixins/MusicList'

export default {
  name: 'music',
  computed: {
    MusicList() {
      return MusicList
    },
  },
}
</script>

<style>

</style>