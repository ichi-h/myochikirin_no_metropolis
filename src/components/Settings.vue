<template>
  <div class="settings">
    <h1>Settings</h1>

    <system v-if="selector === 'system'"></system>
    <credit v-else-if="selector === 'credit'"></credit>
    
    <div class="selector">
      <input @click="updateSelectorValue()" type="radio" name="selector" value="system" checked>System
      <input @click="updateSelectorValue()" type="radio" name="selector" value="credit">Credit
    </div>

    <router-link to="/menu">戻る</router-link>
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

</style>