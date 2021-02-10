<template>
    <div class="images">
        <h2>画廊</h2>
        <img v-for="i in 12" :key="i" src="" :alt="i-1">
    </div>
</template>

<script>
export default {
  name: 'images',
}
</script>

<style>

</style>