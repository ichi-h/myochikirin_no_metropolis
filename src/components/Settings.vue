<template>
  <div class="settings">

    <div class="split">

      <div class="left">
        <div class="selector">
          <ul>
            <li><input @click="updateSelectorValue()" type="radio" name="selector" value="system" checked>System</li>
            <li><input @click="updateSelectorValue()" type="radio" name="selector" value="credit">Credit</li>
          </ul>
        </div>
      </div>

      <div class="right">
        <system v-if="selector === 'system'"></system>
        <credit v-else-if="selector === 'credit'"></credit>
      </div>

    </div>

    <navbar></navbar>
  </div>
</template>

<script>
import AudioFunc from '../mixins/AudioFunc'
import Navbar from './Navbar'
import System from './Settings/System'
import Credit from './Settings/Credit'

export default {
  name: 'settings',
  computed: {
    AudioFunc() {
      return AudioFunc
    },
  },
  components: { Navbar, System, Credit },
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
          AudioFunc.methods.playSE('./static/se/page.mp3')
          this.selector = elm[i].value
        }
      }
    }
  }
}
</script>

<style>
.split {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;

  width: 80vw;
}

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>