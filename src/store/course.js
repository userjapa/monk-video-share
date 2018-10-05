export default {
  namespaced: true,
  state: {
    course: null,
    courses: [{
      name: 'JavaScript',
      videos: [1, 2, 3, 4, 5]
    },
    {
      name: 'HTML',
      videos: [6, 7, 8, 9, 10]
    },
    {
      name: 'CSS',
      videos: [11, 12, 13, 14, 15]
    },
    {
      name: 'Vue',
      videos: [16, 17, 18, 19, 20]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    },
    {
      name: 'NodeJS',
      videos: [21, 22, 23, 24, 25]
    }],
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
  }
}
