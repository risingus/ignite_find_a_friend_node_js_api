import { makeSearchManyPetsUseCase } from '@/use-cases/factories/make-search-many-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchMany(request: FastifyRequest, reply: FastifyReply) {
  const searchManyPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional().default(''),
    energy_level: z.string().optional().default(''),
    size: z.string().optional().default(''),
    independency_level: z.string().optional().default('')

  })

  const { city, age, energy_level, independency_level, size } = searchManyPetsQuerySchema.parse(request.query)

  const searchManyPetsUseCase = makeSearchManyPetsUseCase()
  const pets = await searchManyPetsUseCase.execute({ city, age, energy_level, independency_level, size })

  return reply.status(200).send({ pets })
}