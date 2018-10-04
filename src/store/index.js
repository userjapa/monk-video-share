import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth
  },
  state: {
    loaded: false,
    error: null
  },
  getters: {
    isLoaded ({ loaded }) {
      return loaded
    },
    hasError ({ error }) {
      if (!error) return false
      return true
    },
    getError ({ error }) {
      return error
    }
  },
  mutations: {
    setLoaded (state, loaded) {
      state.loaded = loaded
    },
    setError (state, error) {
      state.error = error
      console.warn(error)
    }
  }
})

export default store
