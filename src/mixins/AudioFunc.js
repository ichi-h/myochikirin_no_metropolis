export default {
  data() {
    return {
      bgmVol: Number,
      seVol: Number,
    }
  },
  methods: {
    init: function() {
      this.bgmVol = 0.5
      this.seVol = 0.5
    },

    playBGM: function(url) {
      let bgmElm = document.getElementById('bgm')

      bgmElm.src = url
      bgmElm.volume = this.bgmVol
      bgmElm.play()

      bgmElm.addEventListener('ended', function() {
        bgmElm.currentTime = 0
        bgmElm.play()
      }, false)
    },

    fadeOutBGM: function(time) {
      let bgmElm = document.getElementById('bgm')
      let rate = this.bgmVol / (time / 0.1)

      let timer = setInterval(function() {
        if ((bgmElm.volume - rate) > 0) {
          bgmElm.volume -= rate
        }
        else {
          bgmElm.volume = 0
          bgmElm.pause()
          clearInterval(timer)
        }
      }, 100)
    },

    playSE: function(url) {
      let se = document.getElementById('se')
      
      se.src = url
      se.volume = this.seVol

      se.play()
    },
  },
}
