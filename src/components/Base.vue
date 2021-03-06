<template>
  <div class="base" id="base">
    <home v-if="selector.value === 'home'" :index="index"></home>
    <gallery v-if="selector.value === 'gallery'"></gallery>
    <afterword v-if="selector.value === 'afterword'"></afterword>
    <settings v-if="selector.value === 'settings'"></settings>

    <navbar :selector="selector"></navbar>
  </div>
</template>

<script>
import Home from './Base/Home'
import Gallery from './Base/Gallery'
import Afterword from './Base/Afterword'
import Settings from './Base/Settings'
import Navbar from './Navbar'

export default {
  name: 'base',
  props: { index: Object },
  components: { Home, Gallery, Afterword, Settings, Navbar },
  data() {
    return {
      selector: { value: 'home'},
    }
  },
  mounted: function() {
    let appClassList = document.getElementById('app').classList

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