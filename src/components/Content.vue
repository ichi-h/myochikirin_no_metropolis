<template>
  <div class="content" @click="turnText()">
    <img class="top-image" :src="'./static/img/' + (index.i + 1) + '.jpg'" alt="">
    <h1>{{ ShortStories[index.i].title }}</h1>
    <p
      v-for="j in ShortStories[index.i].content.length + 1"
      :key="j"
      class="p-text"
      :id="'p-text' + (j-1)"
      style="opacity: 0;"
    >
      {{ ShortStories[index.i].content[j-1] }}
    </p>
  </div>
</template>

<script>
import SaveData from '../mixins/SaveData'
import ShortStories from '../mixins/ShortStories'

export default {
  name: 'content',
  props: { index: Object },
  computed: {
    SaveData() {
      return SaveData
    },
    ShortStories() {
      return ShortStories
    },
  },

  data() {
    return {
      textLineNum: 0,
      toggle: true,
      timeoutFunc: undefined,
    }
  },

  mounted : function() {
    let appClassList = document.getElementById('app').classList

    if (appClassList.contains('fadein-long')) {
      appClassList.remove('fadein-long')
    }
    if (appClassList.contains('fadeout-long')) {
      appClassList.remove('fadeout-long')
    }

    appClassList.add('fadein-long')
  },

  methods: {
    turnText: function() {
      if (this.textLineNum == ShortStories[this.index.i].content.length &&
          this.toggle == true)
      {
        let array = SaveData.methods.getCompleteRate()
        array[this.index.i] = true

        SaveData.methods.setCompleteRate(array)
        SaveData.methods.save()

        document.getElementById('app').classList.add('fadeout-long')
        setTimeout(function() {
          this.$router.push('/home')
        }.bind(this), 3000)

        return
      }

      if (this.toggle == true) {
        this.toggle = false

        let speed = 140 - SaveData.methods.getTextSpeed()

        let pText = document.getElementById('p-text' + this.textLineNum)

        let txt_str = pText.innerHTML
        let txt_array = txt_str.split('')
        txt_array = this.deleteSpace(txt_array)

        pText.innerHTML = ''
        pText.style.opacity = '1'

        for (let k = 0; k < txt_array.length; k++) {
          let char = document.createElement('span')
          char.classList.add('char')
          char.innerHTML = txt_array[k]

          pText.append(char)

          if (k != txt_array.length - 1) {
            window.setTimeout(function() {
              char.classList.add('fadein-text')
            }.bind(this), k*speed)
          }
          else {
            window.setTimeout(function() {
              char.classList.add('fadein-text')
            }.bind(this), k*speed)

            this.timeoutFunc = window.setTimeout(function() {
              this.turnOnToggle()
            }.bind(this), (k+1)*speed)
          }
        }

        this.textLineNum++
      }
      else {
        clearTimeout(this.timeoutFunc)

        let pText = document.getElementById('p-text' + (this.textLineNum - 1))
        pText.innerHTML = ShortStories[this.index.i].content[this.textLineNum-1]

        this.turnOnToggle()
      }
    }, 

    turnOnToggle: function() {
      this.toggle = true
    },

    deleteSpace: function(array) {
      let space = [' ']

      array = array.filter(function(v) {
        return ! space.includes(v)
      })

      return array
    },
  }
}
</script>

<style>
.content {
  background-color: #0c0c0c;
  color: #eaf4fc;
}

  .content h1 {
    margin: 1rem 0;
  }

  .top-image {
    width: 50vw;
    margin-bottom: 2rem;
  }

  .char {
    opacity: 0;
  }
</style>