import Vue from 'vue'
import App from './App.vue'

// Router
import router from './router'

// SCSS
import '@/assets/scss/main.scss'

const doc = !!document ? document : window.document

router.beforeEach((to, from, next) => {
  if (!!to.meta.title) doc.title = to.meta.title
  if (!!to.meta.requiresAuth) {
    next('Login')
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
