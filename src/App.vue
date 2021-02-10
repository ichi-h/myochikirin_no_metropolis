<template>
  <div class="app" id="app">
    <router-view :index="idx"></router-view>
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
  color: white;
}

.app {
  width: 100vw;
  height: 100vh;

  background-color: #111117;
}
</style>
