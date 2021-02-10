import Vue from 'vue'
import Router from 'vue-router'

import Start from '@/components/Start'
import Home from '@/components/Home'
import Content from '@/components/Content'
import Gallery from '@/components/Gallery'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/content',
      name: 'content',
      component: Content
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
