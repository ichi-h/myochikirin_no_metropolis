<template>
  <div class="gallery" id="gallery">
        <images v-if="selector === 'images'"></images>
    <navbar></navbar>
  </div>
</template>

<script>
import SaveData from '../mixins/SaveData'
import AudioFunc from '../mixins/AudioFunc'
import Navbar from './Navbar'
import Images from './Gallery/Images'

export default {
  name: 'gallery',
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
    },
  },
  components: { Navbar, Images },
  data() {
    return {
      selector: 'images',
    }
  },
  mounted: function() {
    document.getElementById('gallery').classList.add('fadein')
  },
  methods: {
    updateSelectorValue: function() {
      var elm = document.getElementsByName('selector')
      
      for (let i = 0; i < elm.length; i++) {
        if (elm[i].checked) {
          AudioFunc.methods.playSE('./static/se/page.mp3', SaveData.methods.getSEVol())
          this.selector = elm[i].value
        }
      }
    }
  }
}
</script>

<style>

</style>