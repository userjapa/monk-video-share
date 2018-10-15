import { storageRef } from './../firebase'

const coursesRef = storageRef.child('courses')

export default {
  namespaced: true,
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
    upload ({ commit }, video) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          const courseRef = coursesRef.child(video.course)
          const vFileRef = courseRef.child(`video/${video.name}.${video.file.name.split('.').pop()}`)
          const tFileRef = courseRef.child(`thumbnail/${video.name}.jpg`)
          await vFileRef.put(video.file)
          await tFileRef.putString(video.thumbnail, 'data_url')
          resolve()
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    },
    getVideo ({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          const courseRef = coursesRef.child(payload.course)
          const video = await courseRef.child(`video/${payload.video}`).getDownloadURL()
          resolve(video)
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    },
    getThumbnail ({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          const courseRef = coursesRef.child(payload.course)
          const thumbnail = await courseRef.child(`thumbnail/${payload.thumbnail}`).getDownloadURL()
          resolve(thumbnail)
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    },
    remove ({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          const courseRef = coursesRef.child(payload.course)
          await courseRef.child(`video/${payload.video}`).delete()
          await courseRef.child(`thumbnail/${payload.thumbnail}`).delete()
          resolve()
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    }
  }
}
