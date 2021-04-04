import SaveData from './SaveData'

export default {
  computed: {
    SaveData() {
      return SaveData
    },
  },

  methods: {
    getMaxTextSpeed: function() {
      return 140
    },

    getTrueTextSpeed: function() {
      return 140 - SaveData.methods.getTextSpeed()
    },

    textToArray: function(text) {
      let array = text.split('')
      array = this.deleteSpace(array)

      return array
    },

    wrapLetterInSpan: function(letter) {
      let char = document.createElement('span')
      char.classList.add('char')
      char.innerHTML = letter

      return char
    },

    deleteSpace: function(array) {
      let space = [' ']

      return array.filter(function(v) {
        return ! space.includes(v)
      })
    },
  }
}