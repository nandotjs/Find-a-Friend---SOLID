import { PrismaORGsRepository } from "../../repositories/prisma/prisma-orgs-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
    const prismaORGsRepository = new PrismaORGsRepository()
    const useCase = new RegisterUseCase(prismaORGsRepository)
    return useCase
}