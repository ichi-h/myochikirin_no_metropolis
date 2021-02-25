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

      const p1 = async function() {
        window.__TAURI__.fs.createDir('./savedata/')
      }
      const p2 = async function() {
        window.__TAURI__.fs.writeFile(file)
      }
      const pAll = async function() {
        await p1()
        await p2()
      }

      pAll()
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