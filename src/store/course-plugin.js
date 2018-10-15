import { databaseRef } from './../firebase'

const coursesRef = databaseRef.child('courses')

export default store => {
  const addCourse = snapshot => store.commit('course/add', snapshot)
  const editCourse = snapshot => store.commit('course/edit', snapshot)
  const removeCourse = snapshot => store.commit('course/remove', snapshot)

  store.subscribe(mutation => {
    switch (mutation.type) {
      case 'course/addListener':
        coursesRef.on('child_added', addCourse)
        coursesRef.on('child_changed', editCourse)
        coursesRef.on('child_removed', removeCourse)
        console.log('Added Listeners')
        break
      case 'course/removeListener':
        coursesRef.off('child_added', addCourse)
        coursesRef.off('child_changed', editCourse)
        coursesRef.off('child_removed', removeCourse)
        console.log('Removed Listeners')
        break
    }
  })
}
