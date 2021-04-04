<template>
  <div class="gallery" ref="gallery">
    <images></images>
  </div>
</template>

<script>
import Images from './Gallery/Images'

export default {
  name: 'gallery',
  components: { Images },
  mounted: function() {
    this.$refs.gallery.classList.add('fadein')
  },
}
</script>

<style>

</style>