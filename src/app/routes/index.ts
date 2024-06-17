import { Router } from 'express'
import { userRoutes } from '../modules/User/user.route'
import { authRoutes } from '../modules/Auth/auth.route'


const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
