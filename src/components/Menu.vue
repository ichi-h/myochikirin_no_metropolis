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
        <navbar></navbar>
    </div>
</template>

<script>
import ShortStories from '../mixins/ShortStories'
import Navbar from './Navbar'

export default {
    name: 'menu',
    props: { index: Object },
    components: { Navbar },
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