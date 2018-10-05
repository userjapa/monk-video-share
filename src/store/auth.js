import { auth, Auth } from '@/firebase'

export default {
  namespaced: true,
  state: {
    user: null,
    info: null
  },
  getters: {
    hasUser ({ user }) {
      return !!user
    },
    getUser ({ user }) {
      return !user ? {} : user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async login ({ commit }, user) {
      try {
        commit('setError', null, { root: true })
        await auth.setPersistence(user.keepLogged ? Auth.Persistence.LOCAL : Auth.Persistence.SESSION)
        const response = await auth.signInWithEmailAndPassword(user.email, user.password)
      } catch (error) {
        commit('setError', error, { root: true })
      }
    },
    async logout ({ commit }) {
      try {
        commit('setError', null, { root: true })
        await auth.signOut()
      } catch (error) {
        commit('setError', error, { root: true })
      }
    }
  }
}
