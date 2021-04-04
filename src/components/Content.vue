<template>
  <div class="content" ref="content" @click="turnText()">
    <img class="top-image" :src="Images.img[index.i]" alt="" draggable="false">
    <h1>{{ ShortStories[index.i].title }}</h1>
    <p
      v-for="j in ShortStories[index.i].content.length + 1"
      :key="j"
      class="p-text"
      :ref="'p-text' + (j-1)"
      style="opacity: 0;"
    >
      {{ ShortStories[index.i].content[j-1] }}
    </p>
  </div>
</template>

<script>
import AppRef from '@/mixins/AppRef'
import SaveData from '@/mixins/SaveData'
import ShortStories from '@/mixins/ShortStories'
import Images from '@/mixins/Images'
import Text from '@/mixins/Text'

export default {
  name: 'content',
  props: { index: Object },
  computed: {
    AppRef() {
      return AppRef
    },
    SaveData() {
      return SaveData
    },
    ShortStories() {
      return ShortStories
    },
    Images() {
      return Images
    },
    Text() {
      return Text
    },
  },

  data() {
    return {
      textLineNum: 0,
      toggle: true, // 現在のセンテンスを表示完了: true, 文字送りの最中: false
      timeoutFunc: undefined, // 文字送り完了の予約
    }
  },

  mounted : function() {
    let appRef = AppRef.methods.getRef()
    let appClassList = appRef.classList

    if (appClassList.contains('fadein-long')) {
      appClassList.remove('fadein-long')
    }
    if (appClassList.contains('fadeout-long')) {
      appClassList.remove('fadeout-long')
    }

    appClassList.add('fadein-long')
    document.body.style.pointerEvents = 'auto'
  },

  methods: {
    turnText: function() {
      if (this.textLineNum == ShortStories[this.index.i].content.length &&
          this.toggle == true)
      // contentを全て表示し終えた場合
      {
        this.$refs.content.style.pointerEvents = 'none'

        let array = SaveData.methods.getCompleteRate()
        array[this.index.i] = true

        SaveData.methods.setCompleteRate(array)
        SaveData.methods.save()

        let appRef = AppRef.methods.getRef()
        appRef.classList.add('fadeout-long')
        setTimeout(function() {
          this.$router.push('/base')
        }.bind(this), 3000)

        return
      }

      if (this.toggle == true) {
      // 現在のセンテンスがすべて表示された状態でクリックされた場合
        this.toggle = false

        const speed = Text.methods.getTrueTextSpeed()

        let pText = this.$refs['p-text' + this.textLineNum][0]

        const txt_array = Text.methods.textToArray(pText.innerHTML)

        pText.innerHTML = ''
        pText.style.opacity = '1'

        for (let k = 0; k < txt_array.length; k++) {
          const char = Text.methods.wrapLetterInSpan(txt_array[k])

          pText.append(char)
          // 文字が加えられた段階で、transitionによって1文字ずつフェードインする

          if (k != txt_array.length - 1) {
            window.setTimeout(function() {
              char.style.opacity = 1
            }.bind(this), k*speed)
          }
          else {
            window.setTimeout(function() {
              char.style.opacity = 1
            }.bind(this), k*speed)

            this.timeoutFunc = window.setTimeout(function() {
              this.turnOnToggle() // 文字送り完了
            }.bind(this), (k+1)*speed)
          }
        }

        this.textLineNum++
      }
      else {
      // 文字送りの最中にクリックされた場合
        clearTimeout(this.timeoutFunc) // 文字送り完了の予約を破棄

        let pText = this.$refs['p-text' + (this.textLineNum - 1)][0]
        pText.innerHTML = ShortStories[this.index.i].content[this.textLineNum-1]

        this.turnOnToggle()
      }
    }, 

    turnOnToggle: function() {
      this.toggle = true
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
    transition: .1s;
  }
</style>