<template>
  <div class="images">
    <h1>ギャラリー</h1>
    <div class="container">
      <div v-for="i in 9" :key="i" class="image-button">
        <img 
          @click="clickedGrid('grid-' + i)"
          :id="'grid-' + i"
          src=""
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
import SaveData from '../../mixins/SaveData'
import AudioFunc from '../../mixins/AudioFunc'

export default {
  name: 'images',
  computed: {
    SaveData() {
      return SaveData
    },
    AudioFunc() {
      return AudioFunc
    },
  },
  data() {
    return {
      completeRateArray: Array
    }
  },
  mounted: function() {
    this.completeRateArray = SaveData.methods.getCompleteRate()

    for (let i = 0; i < this.completeRateArray.length; i++) {
      let imgElm = document.getElementById('grid-' + (i+1))
      
      if (this.completeRateArray[i]) {
        imgElm.src = './static/img/' + (i+1) + '.jpg'
      }
      else {
        imgElm.src = './static/img/secret.jpg'
      }
    }
  },
  methods: {
    clickedImage: function() {
      let popup = document.getElementById('js-popup')
      popup.classList.toggle('is-show')
    },
    clickedGrid: function(gridId) {
      let gridNum = Number(gridId.replace('grid-', '')) - 1

      if (!this.completeRateArray[gridNum]) {
        return
      }

      let image = document.getElementById(gridId).getAttribute('src');

      let popupImage = document.getElementById('popup-image');
      popupImage.setAttribute('src', image);

      AudioFunc.methods.playSE('./static/se/turnPage2.mp3', SaveData.methods.getSEVol())
      document.getElementById('js-popup').classList.add('is-show');
    }
  }
}
</script>

<style>
.container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

  .container > .image-button {
    border-radius: 3px;
  }

    .image-button > img {
      width: 18vw;
      object-fit: cover;
      cursor: pointer;
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
  width: 100.2vw;
}
</style>