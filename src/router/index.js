import Vue from 'vue'
import Router from 'vue-router'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'


import Start from '@/components/Start'
import Base from '@/components/Base'
import Content from '@/components/Content'

Vue.use(Router)
Vue.use(PerfectScrollbar)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/base',
      name: 'base',
      component: Base
    },
    {
      path: '/content',
      name: 'content',
      component: Content
    },
  ]
})
