export default {
  data() {
    return {
      bgmVol: Number,
      seVol: Number,
      textSpeed: Number,
      complateRate: Array,
    }
  },
  methods: {
    loadFiles: function() {
      let imgPathes = [
        './static/img/1.png',
        './static/img/2.png',
        './static/img/3.png',
        './static/img/4.png',
        './static/img/5.png',
        './static/img/6.png',
        './static/img/7.png',
        './static/img/secret.png',
        './static/img/bg.png'
      ]

      for (let i = 0; i < imgPathes.length; i++) {
        let imgElem = document.createElement('img')
        imgElem.src = imgPathes[i]
      }
    },

    save: function() {
      let jsonObj = {
        'bgmVol': this.bgmVol,
        'seVol': this.seVol,
        'textSpeed': this.textSpeed,
        'complateRate': this.complateRate
      }

      let json = JSON.stringify(jsonObj, null, '  ')

      let file = {
        path: './savedata/savedata.json',
        contents: json,
      }

      window.__TAURI__.fs.writeFile(file)
    },

    getBGMVol: function() {
      return this.bgmVol
    },

    setBGMVol: function(bgmVolArg) {
      this.bgmVol = bgmVolArg
    },

    getSEVol: function() {
      return this.seVol
    },

    setSEVol: function(seVolArg) {
      this.seVol = seVolArg
    },

    getTextSpeed: function() {
      return this.textSpeed
    },

    setTextSpeed: function(textSpeedArg) {
      this.textSpeed = textSpeedArg
    },

    getCompleteRate: function() {
      return this.complateRate
    },

    setCompleteRate: function(complateRateArg) {
      this.complateRate = complateRateArg
    },
  }
}