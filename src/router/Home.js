import Courses from './Courses'
import CourseForm from './CourseForm'

const Home = () => import(/* webpackChunkName: "HomePage" */ '@/pages/Home')

export default {
  path: '/',
  component: Home,
  children: [
    Courses,
    CourseForm
  ],
  meta: {
    requiresAuth: true
  }
}
