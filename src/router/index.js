import Vue from 'vue'
import Router from 'vue-router'

import Home from './Home'

Vue.use(Router)

const router = new Router({
  routes: [
    Home
  ],
  mode: 'history'
})

export default router
