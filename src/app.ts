import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(orgsRoutes)
app.register(petsRoutes)


// app.setErrorHandler((error, _, reply) => {
//   // if (error instanceof ZodError) {
//   //   return reply
//   //     .status(400)
//   //     .send({ message: 'Validaton error.', issues: error.format() })
//   // }

//   // if (env.NODE_ENV !== 'production') {
//   //   console.error(error)
//   //   return
//   // } else {
//   //   // TODO: should log to an external tool like datadog/sentry/newrelic
//   // }

//   return reply.status(500).send({ message: 'Internal server error' })
// })
