import { AuthenticateUseCase } from "../authenticate"
import { PrismaORGsRepository } from "../../repositories/prisma/prisma-orgs-repository"

export function makeAuthenticateUseCase() {
    const prismaORGsRepository = new PrismaORGsRepository()
    const useCase = new AuthenticateUseCase(prismaORGsRepository)
    return useCase
}