import { Pet, Prisma } from '@prisma/client'


export interface FindManyPetsParams {
  city: string
  age?: string
  energy_level?: string
  size?: string
  independency_level?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByParams(data: FindManyPetsParams): Promise<Pet[] | []>
}
