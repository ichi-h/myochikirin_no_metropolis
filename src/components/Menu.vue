<template>
    <div class="menu">
        <h1>Menu</h1>
        <div class="titles">
            <div class="list">
                <ul>
                    <li v-for="shortStory in ShortStories" :key="shortStory.id">
                        <a @click="toContent(shortStory.index)" :idx="shortStory.index">{{ shortStory.title }}</a>
                    </li>
                </ul>
            </div>
            <div class="content-image"></div>
        </div>
        <div class="nav"></div>
        <router-link to="/menu/settings">設定</router-link>
        <router-link to="/menu/gallery">ギャラリー</router-link>
        <router-link to="/">戻る</router-link>
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

</style>