import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error';
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),

    independency_level: z.string(),
    enviroment: z.string(),
    pictures: z.string().nullable().optional(),
    requirements_for_adoption: z.string().nullable().optional(),
    org_id: z.string().uuid(),
  })

  const data = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()
    const pet = await createPetUseCase.execute({ ...data, pictures: data?.pictures ? Buffer.from(data.pictures) : null })

    return reply.status(201).send({ pet })

  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }


}