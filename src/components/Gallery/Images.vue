<template>
  <div class="images">
    <div class="container">
      <div v-for="i in 12" :key="i" class="image-button">
        <img 
          @click="clickedGrid('grid-' + i)"
          :id="'grid-' + i"
          :src="'./static/img/' + i + '.png'"
          :alt="i"
        >
      </div>
    </div>

    <div class="popup" id="js-popup">
      <div class="popup-inner">
        <a><img @click="clickedImage()" src="" id="popup-image"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'images',
  methods: {
    clickedImage: function() {
      var popup = document.getElementById('js-popup')
      popup.classList.toggle('is-show')
    },
    clickedGrid: function(gridNum) {
      var image = document.getElementById(gridNum).getAttribute('src');

      var popupImage = document.getElementById('popup-image');
      popupImage.setAttribute('src', image);
      
      document.getElementById('js-popup').classList.add('is-show');
    }
  }
}
</script>

<style>
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

  .container > .image-button {
    border-radius: 3px;
  }

    .image-button > img {
      width: 250px;
      object-fit: cover;
    }

.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: .5s;
}

.popup.is-show {
  opacity: 1;
  visibility: visible;
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
}
</style>