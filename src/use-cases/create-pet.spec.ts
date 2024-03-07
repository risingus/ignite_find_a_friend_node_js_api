import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { CreateOrgUseCase } from './create-org'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase
let sut_org: CreateOrgUseCase

describe('Create Pet use case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
    sut_org = new CreateOrgUseCase(orgsRepository)
  })


  it('should be able to create pet', async () => {
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

    const pet = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet without org id', async () => {
    expect(async () => {
      await sut.execute({
        name: 'string',
        about: 'string',
        age: 'string',
        size: 'string',
        energy_level: 'string',
        independency_level: 'string',
        enviroment: 'string',
        pictures: null,
        requirements_for_adoption: '',
        org_id: '',
      })
    }).rejects.toBeInstanceOf(OrgNotFoundError)
  })


  it('should not be able to create a pet without a valid org id', async () => {
    expect(async () => {
      await sut_org.execute({
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

      await sut.execute({
        name: 'string',
        about: 'string',
        age: 'string',
        size: 'string',
        energy_level: 'string',
        independency_level: 'string',
        enviroment: 'string',
        pictures: null,
        requirements_for_adoption: '',
        org_id: 'xxxx',
      })
    }).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})