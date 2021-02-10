<template>
  <div class="gallery">
    <h1>Gallery</h1>

    <images v-if="selector === 'images'"></images>
    <music v-else-if="selector === 'music'"></music>
    
    <div class="selector">
      <input @click="updateSelectorValue()" type="radio" name="selector" value="images" checked>Images
      <input @click="updateSelectorValue()" type="radio" name="selector" value="music">Music
    </div>

    <div class="nav">
      <router-link to="/menu"><span class="item">ホーム</span></router-link>
      <router-link to="/menu/gallery"><span class="item">ギャラリー</span></router-link>
      <router-link to="/menu/settings"><span class="item">設定</span></router-link>
      <router-link to="/"><span class="item">タイトル</span></router-link>
    </div>
  </div>
</template>

<script>
import Images from './Gallery/Images'
import Music from './Gallery/Music'

export default {
  name: 'gallery',
  components: { Images, Music },
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
.gallery {
  position: relative;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  text-align: center;

  width: 100%;
  height: 100%;
}
</style>