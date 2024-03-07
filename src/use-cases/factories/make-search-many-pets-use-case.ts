import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { SearchManyPetsUseCase } from '../search-many-pets';

export function makeSearchManyPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchManyPetsUseCase(petsRepository)
  return useCase;
}