<template>
  <div class="base" ref="base">
    <home ref="base-home" v-if="selector.value === 'base-home'" :index="index"></home>
    <gallery
      ref="base-gallery"
      v-if="selector.value === 'base-gallery'"
      :isShow="isShow"
      :imageData="imageData"
    ></gallery>
    <settings ref="base-settings" v-if="selector.value === 'base-settings'"></settings>

    <popup v-if="isShow.value" :isShow="isShow" :imageData="imageData"></popup>

    <navbar :selector="selector"></navbar>
  </div>
</template>

<script>
import AppRef from '@/mixins/AppRef'
import Home from './Base/Home'
import Gallery from './Base/Gallery'
import Settings from './Base/Settings'
import Popup from './Base/Popup'
import Navbar from './Navbar'

export default {
  name: 'base',
  props: { index: Object },
  components: { Home, Gallery, Settings, Popup, Navbar },
  computed: {
    AppRef() {
      return AppRef
    }
  },
  data() {
    return {
      selector: { value: 'base-home'},
      isShow: { value: false },
      imageData: { value: "" }
    }
  },
  watch: {
    selector: {
      handler: function(newVal, _) {
        setTimeout(function() {
          window.currentRef = this.$refs[newVal.value].$el
        }.bind(this), 100)
      },
      deep: true
    },
  },
  mounted: function() {
    window.currentRef = this.$refs[this.selector.value].$el

    let appRef = AppRef.methods.getRef()
    let appClassList = appRef.classList

    if (appClassList.contains('fadein-long')) {
      appClassList.remove('fadein-long')
    }
    if (appClassList.contains('fadeout-long')) {
      appClassList.remove('fadeout-long')
    }

    appClassList.add('fadein-long')
  },
}
</script>

<style>
.base {
  position: relative;
  width: 100vw;
  height: 100vh;

  background-color: rgba(12, 12, 12, 0.5);
}
</style>