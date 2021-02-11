<template>
  <div class="content" @click="turnText()">
    <img class="top-image" :src="'./static/img/' + (index.i + 1) + '.png'" alt="">
    <h1>{{ ShortStories[index.i].title }}</h1>
    <p
      v-for="j in ShortStories[index.i].content.length + 1"
      :key="j"
      class="p-text"
      :id="'p-text' + (j-1)"
    >
      {{ ShortStories[index.i].content[j-1] }}
    </p>
  </div>
</template>

<script>
import ShortStories from '../mixins/ShortStories'

export default {
  name: 'content',
  props: { index: Object },
  computed: {
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

  methods: {
    turnText: function() {
      if (this.textLineNum == ShortStories[this.index.i].content.length &&
          this.toggle == true)
      {
        this.$router.push('/home')
        return
      }

      if (this.toggle == true) {
        this.toggle = false

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
              char.classList.add('fade-in')
            }.bind(this), k*100)
          }
          else {
            window.setTimeout(function() {
              char.classList.add('fade-in')
            }.bind(this), k*100)

            this.timeoutFunc = window.setTimeout(function() {
              this.turnOnToggle()
            }.bind(this), (k+1)*100)
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
      console.log(true)
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
  background-color: #050505;
  color: #eaf4fc;
}

  .top-image {
    width: 50vw;
    margin-bottom: 2rem;
  }

  .p-text, .char {
    opacity: 0;
  }

.fade-in {
    opacity: 0;
    animation: fadein .1s ease forwards;
}

    @keyframes fadein {
        100% { opacity: 1; }
    }
</style>