import { Pet } from '@prisma/client'
import { FindManyPetsParams, PetsRepository } from '@/repositories/pets-repository'
import { InvalidPetCity } from './errors/invalid-pet-city'

export class SearchManyPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }
  async execute(data: FindManyPetsParams): Promise<Pet[]> {
    if (!data?.city) throw new InvalidPetCity()

    const pets = await this.petsRepository.findManyByParams(data)
    return pets
  }
}
