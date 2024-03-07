import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindManyPetsParams, PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  constructor(private orgsRepository: InMemoryOrgsRepository) { }

  async findById(id: string) {
    const pet = this.pets.find((p) => p.id === id)
    if (!pet) return null
    return pet
  }

  async findManyByParams(params: FindManyPetsParams) {
    const orgsByCity = this.orgsRepository.orgs.filter(
      (org) => org.city === params.city,
    )
    const petList = this.pets
      .filter((p) => orgsByCity.some((org) => org.id === p.org_id))
      .filter((p) => (params.age ? p.age === params.age : true))
      .filter((p) => (params.energy_level ? p.energy_level === params.energy_level : true))
      .filter((p) => (params.independency_level ? p.independency_level === params.independency_level : true))
      .filter((p) => (params.size ? p.size === params.size : true))

    return petList
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      ...data,
      id: randomUUID(),
      pictures: data?.pictures
        ? Buffer.from(data.pictures)
        : null,
      requirements_for_adoption: data?.requirements_for_adoption
        ? data.requirements_for_adoption
        : ''
    }

    this.pets.push(pet)
    return pet
  }
}