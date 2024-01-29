import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { GetPetDetailsUseCase } from "../get-pet-details"
import { PrismaORGsRepository } from "../../repositories/prisma/prisma-orgs-repository"

export function makeGetPetDetailsUseCase() {
    const prismaPetsRepository = new PrismaPetsRepository()
    const prismaORGsRepository = new PrismaORGsRepository()
    const useCase = new GetPetDetailsUseCase(prismaPetsRepository, prismaORGsRepository)
    return useCase
}