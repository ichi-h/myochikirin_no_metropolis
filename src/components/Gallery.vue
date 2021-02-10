<template>
  <div class="gallery">
    <h1>Gallery</h1>

    <images v-if="selector === 'images'"></images>
    <music v-else-if="selector === 'music'"></music>
    
    <div class="selector">
      <input @click="updateSelectorValue()" type="radio" name="selector" value="images" checked>Images
      <input @click="updateSelectorValue()" type="radio" name="selector" value="music">Music
    </div>

    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Images from './Gallery/Images'
import Music from './Gallery/Music'

export default {
  name: 'gallery',
  components: { Navbar, Images, Music },
  data() {
    return {
      selector: 'images',
    }
  },
  methods: {
    updateSelectorValue: function() {
      var elm = document.getElementsByName('selector')
      
      for (let i = 0; i < elm.length; i++) {
        if (elm[i].checked) {
          this.selector = elm[i].value
        }
      }
    }
  }
}
</script>

<style>

</style>