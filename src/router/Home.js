import Courses from './Courses'

const Home = () => import(/* webpackChunkName: "HomePage" */ '@/pages/Home')

export default {
  path: '/',
  component: Home,
  children: [
    Courses
  ],
  meta: {
    requiresAuth: true
  }
}
