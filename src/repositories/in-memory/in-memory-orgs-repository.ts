import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'
import { InvalidOrgWhatsapp } from '@/use-cases/errors/invalid-org-whatsapp'
import { InvalidOrgAddress } from '@/use-cases/errors/invalid-org-address'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    if (!data?.whatsapp) throw new InvalidOrgWhatsapp()
    if (!data?.city) throw new InvalidOrgAddress()
    if (!data?.state) throw new InvalidOrgAddress()
    if (!data?.street) throw new InvalidOrgAddress()
    if (!data?.cep) throw new InvalidOrgAddress()
    if (!data?.neighborhood) throw new InvalidOrgAddress()
    if (!data?.latitude) throw new InvalidOrgAddress()
    if (!data?.longitude) throw new InvalidOrgAddress()
    const org = {
      id: randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,

      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,

      latitude: data.latitude,
      longitude: data.longitude,
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((item) => item.email === email)
    if (!org) return null
    return org
  }

  async findById(id: string) {
    const org = this.orgs.find((item) => item.id === id)
    if (!org) return null
    return org
  }
}