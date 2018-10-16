const Course = () => import(/* webpackChunkName: "CoursePage" */ '@/pages/Course')
const navbar = () => import(/* webpackChunkName: "navbarComponent" */ '@/components/navbar')

export default {
  path: '/course/:name',
  name: 'Course',
  components: {
    header: navbar,
    content: Course
  },
  meta: {
    requiresAuth: true
  }
}
