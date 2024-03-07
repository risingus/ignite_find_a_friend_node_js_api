import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreateOrgUseCase } from './create-org'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase
let sut_org: CreateOrgUseCase

describe('Create Org use case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
    sut_org = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to get pet by id', async () => {
    const { org } = await sut_org.execute({
      name: "teste gus",
      author_name: "gus",
      email: "gus.teste@gmail.com",
      whatsapp: "85981506878",
      password: '123456',
      cep: "60115191",
      state: "ce",
      city: "fortaleza",
      neighborhood: "aldeota",
      street: "Monsenhor Bruno, 1153",
      latitude: "-3.7330231869576007",
      longitude: "-38.509442061432715"
    })

    const newPet = await petsRepository.create({
      name: 'string',
      about: 'string',
      age: 'string',
      size: 'string',
      energy_level: 'string',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    const petSearch = await sut.execute(newPet.id)

    expect(petSearch?.id).toEqual(expect.any(String))
  })




})