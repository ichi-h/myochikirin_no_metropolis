<template>
  <div class="gallery" ref="gallery">
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
  </div>
</template>

<script>
import SaveData from '@/mixins/SaveData'
import Images from '@/mixins/Images'

export default {
  name: 'gallery',
  props: {
    isShow: Object,
    imageData: Object
  },
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

    this.$refs.gallery.classList.add('fadein')
  },
  methods: {
    clickedGrid: function(gridId) {
      let gridNum = Number(gridId.replace('grid-', '')) - 1

      if (!this.completeRateArray[gridNum]) {
        return
      }

      this.imageData.value = this.$refs[gridId][0].getAttribute('src')
      this.isShow.value = true

      window.__TAURI__.tauri.invoke({
        cmd: 'playSE',
        file_name: 'turnPage2',
        volume: SaveData.methods.getSEVol()
      })
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
</style>