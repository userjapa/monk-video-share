import { storageRef } from './../firebase'

export default {
  state: {
    file: null
  },
  getters: {
    hasFile ({ file }) {
      return !!file
    },
    getFile ({ file }) {
      return file
    }
  },
  mutations: {
    setFile (state, file) {
      state.file = file
    }
  },
  actions: {
    upload ({ commit }, file) {
      videos
    },
    async getFile ({ commit }, file) {
      try {
        commit('setError', null, { root: true })
        commit('setImage', '')
        const url = await storageRef.child(file.type).getDownloadURL()
        commit('setFile', url)
      } catch (error) {
        commit('setError', error, { root: true })
      }
    }
  }
}
