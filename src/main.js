import Vue from 'vue'
import App from './App.vue'

import bus from './globalBus'

// Router
import router from './router'

// Vuex Store
import store from './store'

// Import Firebase auth
import { auth } from '@/firebase'

// SCSS

// FontAwesome
// Start
import {
  faArrowCircleLeft,
  faEdit,
  faInfoCircle,
  faPlusCircle,
  faSignOutAlt,
  faTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faArrowCircleLeft,
  faEdit,
  faInfoCircle,
  faPlusCircle,
  faSignOutAlt,
  faTimes,
  faTimesCircle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// End

const doc = !!document ? document : window.document

// Start SetTitle event
bus.$on('set_title', title => {
  doc.title = title
})
// End SetTitle

router.beforeEach((to, from, next) => {
  if (!!to.meta.title) doc.title = to.meta.title
  if (!!to.meta.requiresAuth) {
    bus.$emit('route_changed', to.name)
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
