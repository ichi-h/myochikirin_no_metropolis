<template>
  <div class="start" @click="startToHome()">
    <h1>タイトル</h1>
    <h2>画面をクリックしてください。</h2>
  </div>
</template>

<script>
import AudioFunc from '../mixins/AudioFunc'

export default {
  name: 'start',
  computed: {
    AudioFunc() {
      return AudioFunc
    },
  },
  methods: {
    startToHome: function() {
      AudioFunc.methods.playSE('./static/se/bell.mp3')
      this.$router.push('/home')
    }
  }
}
</script>

<style>
.start {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>