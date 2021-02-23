<template>
  <div class="settings" id="settings">

    <div class="split">

      <div class="left">
        <div class="selector">
          <ul>
            <li>
              <input @click="updateSelectorValue()" id="radio-settings" type="radio" name="selector" value="system" checked>
              <label class="radio-label" for="radio-settings">設定</label>
            </li>
            <li>
              <input @click="updateSelectorValue()" id="radio-credit" type="radio" name="selector" value="credit">
              <label class="radio-label" for="radio-credit">クレジット</label>
            </li>
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
import SaveData from '../mixins/SaveData'
import AudioFunc from '../mixins/AudioFunc'
import Navbar from './Navbar'
import System from './Settings/System'
import Credit from './Settings/Credit'

export default {
  name: 'settings',
  computed: {
    SaveData() {
      return SaveData
    },
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
  mounted: function() {
    document.getElementById('settings').classList.add('fadein')
  },
  methods: {
    updateSelectorValue: function() {
      var elm = document.getElementsByName('selector')
      
      for (let i = 0; i < elm.length; i++) {
        if (elm[i].checked) {
          AudioFunc.methods.playSE('./static/se/page.mp3', SaveData.methods.getSEVol())
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

input[type=radio] {
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute !important;
}

.radio-label {
  display: inline-block;
  font-size: 2.8rem;
  padding-bottom: 0.2rem;
  cursor: pointer;
}

input[type=radio]:checked + .radio-label {
  border-bottom: 2px solid #fbfaf5;
}
</style>