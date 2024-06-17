import express from 'express'
import { authControllers } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../User/user.validation'
import { authValidationSchemas } from './auth.validation'

const router = express.Router()

// *Register User Route

router.post(
  '/signup',
  validateRequest(userValidation.RegisterValidatioonSchema),
  authControllers.RegisterUser,
)

// * Login User Route

router.post(
  '/login',
  validateRequest(authValidationSchemas.LoginValidationSchema),
  authControllers.loginUser,
)

export const authRoutes = router
