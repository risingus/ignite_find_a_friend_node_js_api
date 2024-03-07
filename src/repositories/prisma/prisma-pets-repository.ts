import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FindManyPetsParams, PetsRepository } from '../pets-repository'


export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    if (!pet) return null;
    return pet
  }

  async findManyByParams(params: FindManyPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive'
          }
        },
        age: {
          contains: params.age,
          mode: 'insensitive'
        },
        size: {
          contains: params.size,
          mode: 'insensitive'
        },
        energy_level: {
          contains: params.energy_level,
          mode: 'insensitive'
        },
        independency_level: {
          contains: params.independency_level,
          mode: 'insensitive'
        },
      },
    })
    return pets
  }
}
