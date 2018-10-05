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

// FontAwesome
// Start
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faPlusCircle, faTimesCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSignOutAlt, faPlusCircle, faTimesCircle, faArrowCircleLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// End

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
      router.replace({ name: 'Courses' })
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
