import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './auth'
import course from './course'
import video from './video'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    course,
    video
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
      return !!error
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
      if (!!error) console.warn(error)
    }
  }
})

export default store
