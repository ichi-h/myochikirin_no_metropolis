<template>
  <div>
    <h1>エラーが発生しました。</h1>
    <div v-html="inner"></div>
  </div>
</template>

<script>
export default {
  name: 'msg',
  props: {
    error: Object
  },
  computed: {
    inner: function() {
      if (this.error.msg === 'browser error') {
        return (`
          <p>HTMLレンダリングエンジンを認識できませんでした。</p>
          <p>このゲームは、下記のブラウザのレンダリングエンジンを使用します。</p>
          <br>
          <ul>
            <li><p>Windows: <u>Microsoft Edge</u></p></li>
            <li><p>macOS: <u>Safari</u></p></li>
          </ul>
          <br>
          <p>上記のブラウザを再インストールした上で、再度ゲームを起動してください。</p>
        `)
      }
      else {
        return (`
          <p>予期しないエラーが発生しました。</p>
          <br>
          <p>メッセージ内容</p>
          <p>${this.error.msg}</p>
        `)
      }
    }
  }
}
</script>

<style>
.msg {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 50vh;
  transform: translateY(-50%);

  text-align: center;

  width: 100vw;
}
</style>