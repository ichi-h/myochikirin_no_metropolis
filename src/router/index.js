import Vue from 'vue'
import Router from 'vue-router'

import Start from '@/components/Start'
import Menu from '@/components/Menu'
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
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/menu/content',
      name: 'content',
      component: Content
    },
    {
      path: '/menu/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/menu/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
