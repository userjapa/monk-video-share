const Home = () => import(/* webpackChunkName: "HomePage" */ '@/pages/Home')

export default {
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: 'Home Page',
    requiresAuth: false
  }
}
