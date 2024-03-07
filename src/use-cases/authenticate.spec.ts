import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate use case', () => {

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: "teste gus",
      author_name: "gus",
      email: "gus.teste@gmail.com",
      whatsapp: "85981506878",
      password_hash: await hash("123456", 6),
      cep: "60115191",
      state: "ce",
      city: "fortaleza",
      neighborhood: "aldeota",
      street: "Monsenhor Bruno, 1153",
      latitude: "-3.7330231869576007",
      longitude: "-38.509442061432715"
    })

    const { org } = await sut.execute({
      email: 'gus.teste@gmail.com',
      password: '123456'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      name: "teste gus",
      author_name: "gus",
      email: "gus.teste@gmail.com",
      whatsapp: "85981506878",
      password_hash: await hash("123456", 6),
      cep: "60115191",
      state: "ce",
      city: "fortaleza",
      neighborhood: "aldeota",
      street: "Monsenhor Bruno, 1153",
      latitude: "-3.7330231869576007",
      longitude: "-38.509442061432715"
    })

    await expect(async () => {
      await sut.execute({
        email: 'gus.lima@nd.com.br',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: "teste gus",
      author_name: "gus",
      email: "gus.teste@gmail.com",
      whatsapp: "85981506878",
      password_hash: await hash("123456", 6),
      cep: "60115191",
      state: "ce",
      city: "fortaleza",
      neighborhood: "aldeota",
      street: "Monsenhor Bruno, 1153",
      latitude: "-3.7330231869576007",
      longitude: "-38.509442061432715"
    })

    await expect(async () => {
      await sut.execute({
        email: 'gus.teste@gmail.com',
        password: '258456'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})