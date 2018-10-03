const Login = () => import(/* webpackChunkName: "LoginPage" */ '@/pages/Login')

export default {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: 'Monk Video Share',
    requiresAuth: false
  }
}
