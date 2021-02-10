<template>
    <div class="menu">
        <h1>Menu</h1>
        <div class="titles">
            <div class="list">
                <ul>
                    <li v-for="shortStory in ShortStories" :key="shortStory.id">
                        <a @click="toContent(shortStory.index)">{{ shortStory.title }}</a>
                    </li>
                </ul>
            </div>
            <div class="content-image"></div>
        </div>
        <div class="nav">
            <router-link to="/menu"><span class="item">ホーム</span></router-link>
            <router-link to="/menu/gallery"><span class="item">ギャラリー</span></router-link>
            <router-link to="/menu/settings"><span class="item">設定</span></router-link>
            <router-link to="/"><span class="item">タイトル</span></router-link>
        </div>
    </div>
</template>

<script>
import ShortStories from '../mixins/ShortStories'

export default {
    name: 'menu',
    props: { index: Object },
    computed: {
        ShortStories() {
            return ShortStories
        },
    },
    methods: {
        toContent: function(idx) {
            this.index.i = Number(idx)
            this.$router.push('/menu/content')
        }
    }
}
</script>

<style>
.menu {
    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    text-align: center;

    width: 100%;
    height: 100%;
}
</style>