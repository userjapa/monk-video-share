import Vue from 'vue'
import { databaseRef } from './../firebase'
import { cloneDeep } from 'lodash'

const coursesRef = databaseRef.child('courses')

export default {
  namespaced: true,
  state: {
    course: null,
    courses: [],
    toUpdate: null
  },
  getters: {
    getCourse ({ course }) {
      return !!course ? cloneDeep(course) : { name: 'Not Found', videos: [] }
    },
    getCourses ({ courses }) {
      return courses
    },
    getToUpdate ({ toUpdate }) {
      return !!toUpdate ? toUpdate : { name: 'Not Found', videos: [] }
    },
    isToUpdate ({ toUpdate }) {
      return !!toUpdate
    }
  },
  mutations: {
    setCourse (state, course) {
      Vue.set(state, 'course', course)
    },
    setCourses (state, courses) {
      Vue.set(state, 'courses', courses)
    },
    setToUpdate (state, course) {
      Vue.set(state, 'toUpdate', course)
    },
    add (state, course) {
      let value = course.val()
      value.videos = Object.values(value.videos)
      value.videos.map(v => {
        if (!!v.links) Vue.set(v, 'links', Object.values(v.links))
      })
      state.courses.push({ ...value, key: course.key })
    },
    edit (state, course) {
      const key = course.key
      const index = state.courses.findIndex(c => c.key === key)
      let value = course.val()
      value.videos = Object.values(value.videos)
      Vue.set(state.courses, index, { ...value, key: key })
    },
    remove (state, course) {
      const index = state.courses.findIndex(c => c.key === course.key)
      Vue.delete(state.courses, index)
    },
    addListener () {},
    removeListener () {}
  },
  actions: {
    save ({ commit, dispatch }, course) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          await Promise.all(course.videos.map(async v => {
            await dispatch('file/upload', {
              ...v,
              course: course.name
            }, { root: true })
            Vue.set(v, 'thumbnail', `${v.name}.jpg`)
            Vue.set(v, 'name', `${v.name}.${v.file.name.split('.').pop()}`)
            Vue.delete(v, 'file')
            return v
          }))
          await coursesRef.push(course)
          resolve()
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    },
    remove ({ commit, dispatch }, course) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          await Promise.all(course.videos.map(async v => {
            await dispatch('file/remove', {
              course: course.name,
              video: v.name,
              thumbnail: v.thumbnail
            }, { root: true })
          }))
          await coursesRef.child(course.key).remove()
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    },
    update ({ getters, commit, dispatch }, course) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          const course_old = getters['getToUpdate']
          const addedVideos = course.videos.filter(v => !v.thumbnail_src)
          const removedVideos = course_old.videos.filter(v => {
            const index = course.videos.findIndex(el => v.name === el.name)
            if (index < 0) return true
            return !course.videos[index].thumbnail_src ? true : false
          })
          await Promise.all(removedVideos.map(async v => {
            await dispatch('file/remove', {
              course: course.name,
              video: v.name,
              thumbnail: v.thumbnail
            }, { root: true })
          }))
          await Promise.all(addedVideos.map(async v => {
            await dispatch('file/upload', {
              ...v,
              course: course.name
            }, { root: true })
            Vue.set(v, 'thumbnail', `${v.name}.jpg`)
            Vue.set(v, 'name', `${v.name}.${v.file.name.split('.').pop()}`)
            Vue.delete(v, 'file')
            return v
          }))
          course.videos.map(v => (Vue.delete(v, 'thumbnail_src')))
          await coursesRef.child(course_old.key).set(course)
          resolve()
        } catch (error) {
          commit('setError', error, { root: true })
          reject(error)
        }
      })
    },
    reset ({ commit }) {
      commit('setCourse', null)
      commit('setCourses', [])
    }
  }
}
