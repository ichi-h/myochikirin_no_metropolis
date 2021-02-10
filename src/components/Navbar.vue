<template>
    <div class="nav">
        <router-link to="/menu"><span class="item">ホーム</span></router-link>
        <router-link to="/menu/gallery"><span class="item">ギャラリー</span></router-link>
        <router-link to="/menu/settings"><span class="item">設定</span></router-link>
        <router-link to="/"><span class="item">タイトル</span></router-link>
    </div>
</template>

<script>
export default {
    name: 'nav',
}
</script>

<style>
.nav {
    position: absolute;
    bottom: 1rem;
    right: 0;
}

    .item {
        margin: 0 1rem;
    }
</style>