export default {
  methods: {
    playBGM: function(url, bgmVol) {
      let bgmElm = document.getElementById('bgm')

      bgmElm.src = url
      bgmElm.volume = bgmVol
      bgmElm.play()

      bgmElm.addEventListener('ended', function() {
        bgmElm.currentTime = 0
        bgmElm.play()
      }, false)
    },

    playSE: function(url, seVol) {
      let se = document.getElementById('se')

      se.src = url
      se.volume = seVol

      se.play()
    }
  },
}
