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
    loadJson: function() {
      let jsonPromise
      
      const p1 = async function() {
        jsonPromise = window.__TAURI__.fs.readTextFile('./savedata/savedata.json')
      }

      const p2 = async function() {
        jsonPromise.then((item) => {
          const parseJson = new Promise((resolve) => {
            let jsonObj = JSON.parse(item)
            resolve(jsonObj)
          })

          parseJson.then((jsonObj) => {
            window.saveData.bgmVol = jsonObj.bgmVol
            window.saveData.seVol = jsonObj.seVol
            window.saveData.textSpeed = jsonObj.textSpeed
            window.saveData.complateRate = jsonObj.complateRate
          })
        }).catch((e) => { })
      }

      const pAll = async function() {
        await p1()
        await p2()
      }

      pAll()
    },

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
        './static/img/texture.png'
      ]

      for (let i = 0; i < imgPathes.length; i++) {
        let imgElem = document.createElement('img')
        imgElem.src = imgPathes[i]
      }
    },

    save: function() {
      let jsonObj = {
        'bgmVol': window.saveData.bgmVol,
        'seVol': window.saveData.seVol,
        'textSpeed': window.saveData.textSpeed,
        'complateRate': window.saveData.complateRate
      }

      let json = JSON.stringify(jsonObj, null, '  ')

      let file = {
        path: './savedata/savedata.json',
        contents: json,
      }

      window.__TAURI__.fs.writeFile(file)
    },

    getBGMVol: function() {
      return window.saveData.bgmVol
    },

    setBGMVol: function(bgmVolArg) {
      window.saveData.bgmVol = bgmVolArg
    },

    getSEVol: function() {
      return window.saveData.seVol
    },

    setSEVol: function(seVolArg) {
      window.saveData.seVol = seVolArg
    },

    getTextSpeed: function() {
      return window.saveData.textSpeed
    },

    setTextSpeed: function(textSpeedArg) {
      window.saveData.textSpeed = textSpeedArg
    },

    getCompleteRate: function() {
      return window.saveData.complateRate
    },

    setCompleteRate: function(complateRateArg) {
      window.saveData.complateRate = complateRateArg
    },
  }
}