<template>
  <div class="gallery" id="gallery">
    <images></images>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Images from './Gallery/Images'

export default {
  name: 'gallery',
  components: { Navbar, Images },
  mounted: function() {
    document.getElementById('gallery').classList.add('fadein')
  },
}
</script>

<style>

</style>