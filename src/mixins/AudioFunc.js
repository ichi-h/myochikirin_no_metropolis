export default {
  methods: {
    playBGM: function(bgmVol) {
      let bgmElm = [
        document.getElementById('bgm1'),
        document.getElementById('bgm2')
      ]

      bgmElm[0].src = './static/bgm/start.mp3'
      bgmElm[1].src = './static/bgm/loop.mp3'

      bgmElm[0].preload = 'auto'
      bgmElm[1].preload = 'auto'

      bgmElm[0].volume = bgmVol
      bgmElm[1].volume = bgmVol

      const fs = 44100
      const startEndTiming = 2009170
      const loopEndTiming = 1766296
      const delay = 2350

      let time = [((startEndTiming - delay) / fs) * 1000, ((loopEndTiming - delay) / fs) * 1000]

      let loopPlay = function() {
        bgmElm[1].currentTime = 0
        bgmElm[1].play()
        setTimeout(loopPlay.bind(this), time[1])
      }

      let start = function() {
        bgmElm[0].currentTime = 0
        bgmElm[0].play()
        setTimeout(loopPlay.bind(this), time[0])
      }

      bgmElm[0].addEventListener("canplaythrough", start, false)

      return bgmElm
    },

    playSE: function(url, seVol) {
      let se = document.getElementById('se')

      se.src = url
      se.volume = seVol

      se.play()
    }
  },
}
