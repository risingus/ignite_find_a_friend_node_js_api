import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { InvalidOrgWhatsapp } from './errors/invalid-org-whatsapp'
import { InvalidOrgAddress } from './errors/invalid-org-address'

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
    if (!whatsapp) throw new InvalidOrgWhatsapp()
    if (!city) throw new InvalidOrgAddress()
    if (!state) throw new InvalidOrgAddress()
    if (!street) throw new InvalidOrgAddress()
    if (!cep) throw new InvalidOrgAddress()
    if (!neighborhood) throw new InvalidOrgAddress()
    if (!latitude) throw new InvalidOrgAddress()
    if (!longitude) throw new InvalidOrgAddress()

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
