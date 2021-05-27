<template>
  <div style="position: relative;">
    <div
      class="app"
      ref="app"
      :style="'background-image: url(' + Images.bg + ');'"
    >
      <router-view :index="index" :loaded="loaded" :error="error"></router-view>

      <div class="msg" ref="msg">
        <msg v-if="error.isShow" :error="error"></msg>
      </div>
    </div>

    <div v-if="loaded.bool !== true" class="loading blinking" ref="loading">
      <p>NOW LOADING...</p>
    </div>
  </div>
</template>

<script>
import AppRef from '@/mixins/AppRef'
import Images from '@/mixins/Images'
import Msg from '@/components/Msg'

export default {
  name: 'game_title',
  components: { Msg },
  computed: {
    Images() {
      return Images
    },
    AppRef() {
      return AppRef
    }
  },
  data() {
    return {
      index: { i: Number },
      loaded: { bool: false },
      error: {
        isShow: false,
        msg: String
      }
    }
  },
  mounted: function() {
    AppRef.methods.setRef(this.$refs.app)

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
</style>
