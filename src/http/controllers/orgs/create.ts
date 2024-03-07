import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),

    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),

    latitude: z.string(),
    longitude: z.string(),
  })

  const data = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()
    const { org } = await createOrgUseCase.execute(data)

    return reply.status(201).send({ org })

  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }


}