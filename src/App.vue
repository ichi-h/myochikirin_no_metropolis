<template>
  <div style="position: relative;">
    <div
      class="app"
      id="app"
      :style="'background-image: url(' + Images.bg + ');'"
    >
      <router-view :index="index" :loaded="loaded" :message="message"></router-view>

      <div class="msg" id="msg">
        <msg></msg>
      </div>
    </div>

    <div v-if="loaded.bool !== true" class="loading blinking" id="loading">
      <p>NOW LOADING...</p>
    </div>
  </div>
</template>

<script>
import Images from '@/mixins/Images'
import Msg from '@/components/Msg'

export default {
  name: 'game_title',
  components: { Msg },
  computed: {
    Images() {
      return Images
    },
  },
  data() {
    return {
      index: { i: Number },
      loaded: { bool: false },
      message: { elm: undefined },
    }
  },
  mounted: function() {
    this.message.elm = document.getElementById('msg')

    this.changeFontSize()
    window.addEventListener('resize', this.changeFontSize, false)
  },

  methods: {
    changeFontSize: function() {
      let htmlElm = document.documentElement
      let currentHeight = htmlElm.clientHeight

      let w = (0.2 / 294) * currentHeight + 0.31

      htmlElm.style.fontSize = `${62.5 * w}%`
    }
  },

  destroyed: function() {
    window.removeEventListener('resize', this.changeFontSize, false)
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

  -webkit-user-drag:none;

  cursor: default;
  overflow: hidden;

  color: #fbfaf5;

  font-family: 'togoshi' !important;
}

.app {
  width: 100vw;
  height: 100vh;

  background-size: 100vw 100vh;

  opacity: 0;
}

.loading {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(-2rem) translateY(-2rem);
  
  transition: 1s;
}

.msg {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 50vh;
  transform: translateY(-50%);

  text-align: center;

  width: 100vw;

  visibility: hidden;
}
</style>
