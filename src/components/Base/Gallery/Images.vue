<template>
  <div class="images">
    <h1>ギャラリー</h1>
    <div class="container">
      <div v-for="i in 9" :key="i" class="image-button">
        <img 
          @click="clickedGrid('grid-' + i)"
          :ref="'grid-' + i"
          src=""
          :alt="i"
          draggable="false"
        >
      </div>
    </div>

    <div class="popup" ref="js-popup">
      <div class="popup-inner">
        <a><img @click="clickedImage()" src="" ref="popup-image"></a>
      </div>
    </div>
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'
import Images from '@/mixins/Images'

export default {
  name: 'images',
  computed: {
    SaveData() {
      return SaveData
    },
    Images() {
      return Images
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
      let imgElm = this.$refs['grid-' + (i+1)][0]

      if (this.completeRateArray[i]) {
        imgElm.src = Images.img[i]
      }
      else {
        imgElm.src = Images.secret
      }
    }
  },
  methods: {
    clickedImage: function() {
      let popup = this.$refs["js-popup"]
      popup.classList.remove('is-show')
    },
    clickedGrid: function(gridId) {
      let gridNum = Number(gridId.replace('grid-', '')) - 1

      if (!this.completeRateArray[gridNum]) {
        return
      }

      let image = this.$refs[gridId][0].getAttribute('src');

      let popupImage = this.$refs["popup-image"];
      popupImage.setAttribute('src', image);


      window.__TAURI__.tauri.invoke({
        cmd: 'playSE',
        file_name: 'turnPage2',
        volume: SaveData.methods.getSEVol()
      })
      
      this.$refs["js-popup"].classList.add('is-show');
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
  width: 100vw;
  height: 100vh;
}
</style>