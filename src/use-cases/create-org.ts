import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string

  cep: string
  state: string
  city: string
  neighborhood: string
  street: string

  latitude: string
  longitude: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) { }
  async execute({
    name,
    author_name,
    cep,
    city,
    email,
    latitude,
    longitude,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) throw new OrgAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      author_name,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password_hash,
      state,
      street,
      whatsapp,
    })

    return { org }
  }
}
