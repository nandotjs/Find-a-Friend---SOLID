import { ORG } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { compare } from "bcryptjs"
import { ORGsRepository } from "../repositories/orgs-repository"

interface AuthenticateUseCaseRequest {
    email: string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    existingORG: ORG
}

export class AuthenticateUseCase {
    constructor(private orgsRepository: ORGsRepository) {}
    
    async execute({email, password}: AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse> {
        const existingORG = await this.orgsRepository.findByEmail(email)

        if(!existingORG) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(
            password,
            existingORG.password_hash
        )

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {existingORG}
    }
}