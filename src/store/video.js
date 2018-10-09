import { storageRef } from './../firebase'

const coursesRef = storageRef.child('courses')

export default {
  namespaced: true,
  state: {
    video: null
  },
  getters: {
    hasVideo ({ video }) {
      return !!video
    },
    getVideo ({ video }) {
      return video
    }
  },
  mutations: {
    setVideo (state, video) {
      state.video = video
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
    async getVideo ({ commit }, video) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          // const url = await storageRef.child(video).getDownloadURL()
          commit('setVideo', video)
        } catch (error) {
          commit('setError', error, { root: true })
        }
      })
    }
  }
}
