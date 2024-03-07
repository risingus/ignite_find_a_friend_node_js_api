import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateOrgBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateOrgBodySchema.parse(request.body)

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()
    const { org } = await authenticateOrgUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
      },
      {
        sign: {
          sub: org.id
        }
      }
    )

    const refreshToken = await reply.jwtSign(
      {
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie(
        'refreshToken',
        refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      }
      )
      .status(200)
      .send({ token })

  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}