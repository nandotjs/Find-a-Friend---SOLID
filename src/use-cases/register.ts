import { hash } from "bcryptjs"
import { ORGAlreadyExistsError } from "./errors/org-already-exists-error"
import { ORG } from "@prisma/client"
import { ORGsRepository } from './../repositories/orgs-repository'


interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string,
    address: string,
    contact: string,
}

interface RegisterUseCaseResponse {
    org: ORG
}

export class RegisterUseCase {
    constructor(private orgsRepository: ORGsRepository) {}

    async execute({name, email, password, address, contact}: RegisterUseCaseRequest) : Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)
    
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    
        if (orgWithSameEmail) {
            throw new ORGAlreadyExistsError()
        }
    
        const org = await this.orgsRepository.create({
            name,
            email,
            password_hash,
            address,
            contact,
        })

        return {
            org,
        }
    }
}