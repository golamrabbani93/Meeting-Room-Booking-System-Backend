import { z } from 'zod'

export const LoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be string',
        required_error: 'Email is required',
      })
      .email({ message: 'Email is required And Email must be string' }),
    password: z.string({
      invalid_type_error: 'Password must be String',
      required_error: 'Password is required',
    }),
  }),
})

export const authValidationSchemas = {
  LoginValidationSchema,
}
