<template>
  <div class="gallery" id="gallery">
    <images></images>
  </div>
</template>

<script>
import Images from './Gallery/Images'

export default {
  name: 'gallery',
  components: { Images },
  mounted: function() {
    document.getElementById('gallery').classList.add('fadein')
  },
}
</script>

<style>

</style>