import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const childRoutes = [
  { path: 'students', component: () => import('@/views/Students/students') },
]
console.log(childRoutes)

const routes = [
  { path: '/login', component: () => import('@/views/Login'), meta: { requiresAuth: false } },
  { path: '/register', component: () => import('@/views/Register'), meta: { requiresAuth: false } },
  { path: '/', component: () => import('@/views/Home'), children: childRoutes, meta: { requiresAuth: false } },
]

export default new Router({
  mode: 'history',
  routes,
})
