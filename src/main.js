import Vue from 'vue'
import App from './App.vue'

// Router
import router from './router'

// Vuex Store
import store from './store'

// Import Firebase auth
import { auth } from '@/firebase'

// SCSS
import '@/assets/scss/main.scss'

const doc = !!document ? document : window.document

router.beforeEach((to, from, next) => {
  if (!!to.meta.title) doc.title = to.meta.title
  if (!!to.meta.requiresAuth) {
    if (store.getters['auth/hasUser']) next()
    else next('login')
  } else {
    next()
  }
})

auth.onAuthStateChanged(user => {
  store.commit('auth/setUser', user)
  if (!store.getters['auth/hasUser']) {
    router.replace({ name: 'Login' })
  } else {
    if (router.currentRoute.name === 'Login')
      router.replace({ name: 'Home' })
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
