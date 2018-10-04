const CourseForm = () => import(/* webpackChunkName: "CourseFormPage" */ '@/pages/CourseForm')
const navbar = () => import(/* webpackChunkName: "navbarComponent" */ '@/components/navbar')

export default {
  path: '/form',
  name: 'Course Form',
  components: {
    header: navbar,
    content: CourseForm
  },
  meta: {
    title: 'Course Form',
    requiresAuth: true
  }
}
