import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) { }

  async execute(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) throw new OrgNotFoundError

    const pet = await this.petsRepository.create(data)
    return pet
  }
}
