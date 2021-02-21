<template>
  <div class="app" id="app">
    <router-view :index="idx"></router-view>
    <audio src="" preload="" id="bgm1"></audio>
    <audio src="" preload="" id="bgm2"></audio>
    <audio src="" preload="" id="se"></audio>
  </div>
</template>

<script>
export default {
  name: 'game_title',
  data() {
    return {
      idx: { i: Number },
    }
  },
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;

  user-select:none;
  -webkit-user-select:none;
  -ms-user-select: none;
  -moz-user-select:none;
  -khtml-user-select:none;
  -webkit-user-drag:none;
  -khtml-user-drag:none;

  cursor: default;
  overflow: hidden;

  pointer-events: all;

  font-family: 'Satuki' !important;
}

.app {
  width: 100vw;
  height: 100vh;

  background-image: url('/static/img/texture.png');

  opacity: 0;
}
</style>
