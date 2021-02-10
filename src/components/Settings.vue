<template>
  <div class="settings">
    <h1>Settings</h1>

    <system v-if="selector === 'system'"></system>
    <credit v-else-if="selector === 'credit'"></credit>
    
    <div class="selector">
      <input @click="updateSelectorValue()" type="radio" name="selector" value="system" checked>System
      <input @click="updateSelectorValue()" type="radio" name="selector" value="credit">Credit
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
import System from './Settings/System'
import Credit from './Settings/Credit'

export default {
  name: 'settings',
  components: { System, Credit },
  data() {
    return {
      selector: 'system',
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
.settings {
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