<template>
  <div class="system">
    <div class="bgm">
      <h2>BGM音量</h2>
      <input type="range" name="bgm-vol" min="0" max="1" step="0.05">
    </div>
    <div class="se">
      <h2>SE音量</h2>
      <input type="range" name="se-vol" min="0" max="1" step="0.05">
    </div>
    <div class="text">
      <h2>文字表示速度</h2>
      <input type="range" name="text-speed" min="0" max="1" step="0.05">
    </div>
    <div class="delete">
      <h2>セーブデータ削除</h2>
      <button type="button" name="data-delete">削除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'system',
}
</script>

<style>

</style>