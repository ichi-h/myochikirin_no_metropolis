<template>
  <div class="popup" ref="js-popup">
    <div class="popup-inner">
      <a><img @click="clickedImage()" src="" ref="popup-image"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    isShow: Object,
    imageData: Object
  },
  mounted: function() {
    this.$refs['popup-image'].src = this.imageData.value
    setTimeout(() => this.$refs['js-popup'].classList.add('is-show'), 10)
  },
  methods: {
    clickedImage: function() {
      this.$refs['js-popup'].classList.remove('is-show')
      setTimeout(() => this.isShow.value = false, 500)
    },
  }
}
</script>

<style>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0;
  transition: .5s;
}

.popup.is-show {
  opacity: 1;
}

.popup-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
}

.popup-inner img {
  width: 100vw;
  height: 100vh;
}
</style>