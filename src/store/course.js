import { databaseRef } from './../firebase'

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
      return course
    },
    getCourses ({ courses }) {
      return courses
    },
    getToUpdate ({ toUpdate }) {
      return toUpdate
    },
    isToUpdate ({ toUpdate }) {
      return !!toUpdate
    }
  },
  mutations: {
    setCourse (state, course) {
      state.course = course
    },
    setCourses (state, courses) {
      state.courses = courses
    },
    addCouse (state, course) {
      state.courses.push(course)
    },
    editCourse (state, course) {
      state.courses[state.toUpdate] = course
    },
    removeCourse (state, index) {
      state.courses.splice(index, 1)
    }
  },
  actions: {
    save ({ commit, dispatch }, course) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('setError', null, { root: true })
          await Promise.all(course.videos.map(async v => {
            await dispatch('video/upload', { ...v, course: course.name }, { root: true })
            v.thumbnail = `${v.name}.jpg`
            v.name = `${v.name}.${v.file.name.split('.').pop()}`
            delete v.file
            return v
          }))
          await coursesRef.push(course)
        } catch (error) {
          commit('setError', error, { root: true })
        } finally {

        }
      })
    }
  }
}
