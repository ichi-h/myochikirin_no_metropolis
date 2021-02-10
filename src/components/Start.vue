<template>
    <router-link to="/menu">
        <div class="start">
            <h1>タイトル</h1>
            <h2>画面をクリックしてください。</h2>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'start'
}
</script>

<style>
.start {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}
</style>