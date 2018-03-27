const childRoutes = [
  { path: '/', component: () => import('@/views/Dashboard'), meta: { requiresAuth: true } },
  { path: '/students', component: () => import('@/views/Students/Students'), meta: { requiresAuth: true } },
  { path: '/homework', component: () => import('@/views/Students/Homework'), meta: { requiresAuth: true } },
  { path: '/students/:id', component: () => import('@/views/Students/StudentDetails'), meta: { requiresAuth: true } },
  { path: '/shares', component: () => import('@/views/Material/Shares'), meta: { requiresAuth: true } },
  { path: '/videos', component: () => import('@/views/Material/Videos'), meta: { requiresAuth: true } },
  { path: '/videos/:id', component: () => import('@/views/Material/VideoDtails'), meta: { requiresAuth: true } },
  { path: '/docs', component: () => import('@/views/Material/Docs'), meta: { requiresAuth: true } },
  { path: '/docs/:id', component: () => import('@/views/Material/DocsDetails'), meta: { requiresAuth: true } },
  { path: '/ppt', component: () => import('@/views/Material/PPT'), meta: { requiresAuth: true } },
  { path: '/ppt/:id', component: () => import('@/views/Material/PPTDetails'), meta: { requiresAuth: true } },
  { path: '/departments', component: () => import('@/views/Departments/Departments'), meta: { requiresAuth: true } },
  { path: '/professions', component: () => import('@/views/Departments/Professions'), meta: { requiresAuth: true } },
  { path: '/classes', component: () => import('@/views/Departments/Classes'), meta: { requiresAuth: true } },
]

const routes = [
  { path: '*', component: () => import('@/components/NotFound'), meta: { requiresAuth: false } },
  { path: '/login', component: () => import('@/views/Login'), meta: { requiresAuth: false } },
  { path: '/register', component: () => import('@/views/Register'), meta: { requiresAuth: false } },
  { path: '/', component: () => import('@/views/Home'), children: childRoutes, meta: { requiresAuth: true } },
]

export default routes
