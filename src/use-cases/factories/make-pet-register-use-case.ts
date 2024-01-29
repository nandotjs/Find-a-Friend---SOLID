import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { PrismaORGsRepository } from "../../repositories/prisma/prisma-orgs-repository"
import { PetRegisterUseCase } from "../pet-register"

export function makePetRegisterUseCase() {
    const prismaPetsRepository = new PrismaPetsRepository()
    const prismaORGsRepository = new PrismaORGsRepository()
    const useCase = new PetRegisterUseCase(prismaPetsRepository, prismaORGsRepository)
    return useCase
}