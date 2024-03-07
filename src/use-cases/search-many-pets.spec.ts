import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchManyPetsUseCase } from './search-many-pets'
import { CreateOrgUseCase } from './create-org'
import { InvalidPetCity } from './errors/invalid-pet-city'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchManyPetsUseCase
let sut_org: CreateOrgUseCase

describe('Create Org use case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchManyPetsUseCase(petsRepository)
    sut_org = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to search pets by city', async () => {
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

    await petsRepository.create({
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

    await petsRepository.create({
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

    const { org: org2 } = await sut_org.execute({
      name: "teste gus",
      author_name: "gus",
      email: "gus.nd@gmail.com",
      whatsapp: "85981506878",
      password: '123456',
      cep: "60115191",
      state: "ce",
      city: "rio de janeiro",
      neighborhood: "aldeota",
      street: "Monsenhor Bruno, 1153",
      latitude: "-3.7330231869576007",
      longitude: "-38.509442061432715"
    })


    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: 'string',
      size: 'string',
      energy_level: 'string',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org2.id,
    })

    const pets = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const pets2 = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })


  it('should not be able to search pets without city', async () => {
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

    await petsRepository.create({
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

    expect(async () => {
      await sut.execute({ city: '' })
    }).rejects.toBeInstanceOf(InvalidPetCity)
  })


  it('should be able to search pets by independency level', async () => {
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

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'big',
      energy_level: '10',
      independency_level: '45',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '5',
      size: 'big',
      energy_level: '5',
      independency_level: '45',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'small',
      energy_level: '3',
      independency_level: '90',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    const pets = await sut.execute({ city: org.city, independency_level: '45' })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets by size', async () => {
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

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'big',
      energy_level: '10',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '5',
      size: 'big',
      energy_level: '5',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'small',
      energy_level: '3',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    const pets = await sut.execute({ city: org.city, size: 'big' })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets by energy level', async () => {
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

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'string',
      energy_level: '10',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '5',
      size: 'string',
      energy_level: '5',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'string',
      energy_level: '3',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    const pets = await sut.execute({ city: org.city, energy_level: '10' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by age', async () => {
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

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'string',
      energy_level: 'string',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '5',
      size: 'string',
      energy_level: 'string',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'string',
      about: 'string',
      age: '15',
      size: 'string',
      energy_level: 'string',
      independency_level: 'string',
      enviroment: 'string',
      pictures: null,
      requirements_for_adoption: '',
      org_id: org.id,
    })

    const pets = await sut.execute({ city: org.city, age: '15' })

    expect(pets).toHaveLength(2)
  })
})