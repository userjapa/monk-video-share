import Vue from 'vue'
import Router from 'vue-router'

import Home from './Home'
import Login from './Login'

Vue.use(Router)

const router = new Router({
  routes: [
    Home,
    Login
  ],
  mode: 'history'
})

export default router
