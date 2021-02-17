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
        init: function() {
            let jsonPromise = window.__TAURI__.fs.readTextFile('./savedata/savedata.json')
            
            jsonPromise.then((item) => {
                let jsonObj = JSON.parse(item)

                this.bgmVol = jsonObj.bgmVol
                this.seVol = jsonObj.seVol
                this.textSpeed = jsonObj.textSpeed
                this.complateRate = jsonObj.complateRate
            }).catch((e) => {
                this.bgmVol = 0.1
                this.seVol = 0.5
                this.textSpeed = 91
                this.complateRate = []
            })
        },

        save: function() {
            let jsonObj = {
                "bgmVol": this.bgmVol,
                "seVol": this.seVol,
                "textSpeed": this.textSpeed,
                "complateRate": this.complateRate
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