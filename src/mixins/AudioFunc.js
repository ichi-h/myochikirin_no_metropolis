export default {
  methods: {
    playBGM: function(bgmVol) {
      let bgmElm = [
        document.getElementById('bgm1'),
        document.getElementById('bgm2')
      ]

      bgmElm[0].src = './static/bgm/start.wav'
      bgmElm[1].src = './static/bgm/loop.wav'

      bgmElm[0].preload = 'auto'
      bgmElm[1].preload = 'auto'

      bgmElm[0].volume = bgmVol
      bgmElm[1].volume = bgmVol

      let loopPlay = function() {
        bgmElm[1].currentTime = 0
        bgmElm[1].play()
        setTimeout(loopPlay.bind(this), 39998.684807256235827664399092971)
      }

      let start = function() {
        bgmElm[0].currentTime = 0
        bgmElm[0].play()
        setTimeout(loopPlay.bind(this), 45506.031746031746031746031746032)
      }

      bgmElm[0].addEventListener("canplaythrough", start, false)
    },

    playSE: function(url, seVol) {
      let se = document.getElementById('se')

      se.src = url
      se.volume = seVol

      se.play()
    }
  },
}
