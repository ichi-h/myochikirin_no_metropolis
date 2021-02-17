<template>
  <div class="gallery" id="gallery">

    <div class="split">

      <div class="left">
        <div class="selector">
          <ul>
            <li><input @click="updateSelectorValue()" type="radio" name="selector" value="images" checked>Images</li>
            <li><input @click="updateSelectorValue()" type="radio" name="selector" value="music">Music</li>
          </ul>
        </div>
      </div>

      <div class="right">
        <images v-if="selector === 'images'"></images>
        <music v-else-if="selector === 'music'"></music>
      </div>

    </div>

    <navbar></navbar>
  </div>
</template>

<script>
import SaveData from '../mixins/SaveData'
import AudioFunc from '../mixins/AudioFunc'
import Navbar from './Navbar'
import Images from './Gallery/Images'
import Music from './Gallery/Music'

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
  components: { Navbar, Images, Music },
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
.split {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;

  width: 80vw;
}

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>