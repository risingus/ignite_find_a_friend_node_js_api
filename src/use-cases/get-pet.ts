import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) { }
  async execute(id: string): Promise<Pet | null> {
    const pet = await this.petsRepository.findById(id)
    if (!pet) return null
    return pet
  }
}
