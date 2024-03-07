import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InvalidOrgWhatsapp } from './errors/invalid-org-whatsapp'
import { InvalidOrgAddress } from './errors/invalid-org-address'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org use case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create org without whatsapp', async () => {
    expect(async () => {
      await sut.execute({
        name: "teste gus",
        author_name: "gus",
        email: "gus.teste@gmail.com",
        whatsapp: "",
        password: '123456',
        cep: "60115191",
        state: "ce",
        city: "fortaleza",
        neighborhood: "aldeota",
        street: "Monsenhor Bruno, 1153",
        latitude: "-3.7330231869576007",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgWhatsapp)
  })

  it('should not be able to create org without cep', async () => {
    expect(async () => {
      await sut.execute({
        name: "teste gus",
        author_name: "gus",
        email: "gus.teste@gmail.com",
        whatsapp: "85981506878",
        password: '123456',
        cep: "",
        state: "ce",
        city: "fortaleza",
        neighborhood: "aldeota",
        street: "Monsenhor Bruno, 1153",
        latitude: "-3.7330231869576007",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })


  it('should not be able to create org without state', async () => {
    expect(async () => {
      await sut.execute({
        name: "teste gus",
        author_name: "gus",
        email: "gus.teste@gmail.com",
        whatsapp: "85981506878",
        password: '123456',
        cep: "60115191",
        state: "",
        city: "fortaleza",
        neighborhood: "aldeota",
        street: "Monsenhor Bruno, 1153",
        latitude: "-3.7330231869576007",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })

  it('should not be able to create org without city', async () => {
    expect(async () => {
      await sut.execute({
        name: "teste gus",
        author_name: "gus",
        email: "gus.teste@gmail.com",
        whatsapp: "85981506878",
        password: '123456',
        cep: "60115191",
        state: "ce",
        city: "",
        neighborhood: "aldeota",
        street: "Monsenhor Bruno, 1153",
        latitude: "-3.7330231869576007",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })


  it('should not be able to create org without neighborhood', async () => {
    expect(async () => {
      await sut.execute({
        name: "teste gus",
        author_name: "gus",
        email: "gus.teste@gmail.com",
        whatsapp: "85981506878",
        password: '123456',
        cep: "60115191",
        state: "ce",
        city: "fortaleza",
        neighborhood: "",
        street: "Monsenhor Bruno, 1153",
        latitude: "-3.7330231869576007",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })

  it('should not be able to create org without street', async () => {
    expect(async () => {
      await sut.execute({
        name: "teste gus",
        author_name: "gus",
        email: "gus.teste@gmail.com",
        whatsapp: "85981506878",
        password: '123456',
        cep: "60115191",
        state: "ce",
        city: "fortaleza",
        neighborhood: "aldeota",
        street: "",
        latitude: "-3.7330231869576007",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })

  it('should not be able to create org without latitude', async () => {
    expect(async () => {
      await sut.execute({
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
        latitude: "",
        longitude: "-38.509442061432715"
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })


  it('should not be able to create org without longitude', async () => {
    expect(async () => {
      await sut.execute({
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
        longitude: ""
      })
    }).rejects.toBeInstanceOf(InvalidOrgAddress)
  })
})