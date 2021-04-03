<template>
  <div class="base" ref="base">
    <home v-if="selector.value === 'home'" :index="index"></home>
    <gallery v-if="selector.value === 'gallery'"></gallery>
    <afterword v-if="selector.value === 'afterword'"></afterword>
    <settings v-if="selector.value === 'settings'"></settings>

    <navbar :selector="selector"></navbar>
  </div>
</template>

<script>
import AppRef from '@/mixins/AppRef'
import Home from './Base/Home'
import Gallery from './Base/Gallery'
import Afterword from './Base/Afterword'
import Settings from './Base/Settings'
import Navbar from './Navbar'

export default {
  name: 'base',
  props: { index: Object },
  components: { Home, Gallery, Afterword, Settings, Navbar },
  computed: {
    AppRef() {
      return AppRef
    }
  },
  data() {
    return {
      selector: { value: 'home'},
    }
  },
  mounted: function() {
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