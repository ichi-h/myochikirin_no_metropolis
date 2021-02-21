// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/style.css'

Vue.config.productionTip = false

window.saveData = {
  bgmVol: 0.7,
  seVol: 1,
  textSpeed: 91,
  complateRate: [false, false, false, false, false, false, false, false, false, false, false, false],
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
