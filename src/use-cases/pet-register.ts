import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"
import { ORGsRepository } from "../repositories/orgs-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


interface PetRegisterUseCaseRequest {
    breed: string
    color: string
    puppy: boolean
    orgId: string
}

interface PetRegisterUseCaseResponse {
    pet: Pet
}

export class PetRegisterUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: ORGsRepository
    ) {}

    async execute({breed, color, puppy, orgId}: PetRegisterUseCaseRequest) : Promise<PetRegisterUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId)

        if (!org) {
            throw new ResourceNotFoundError()
        }

        const pet = await this.petsRepository.create({
            breed,
            color,
            puppy,
            org_id: orgId,
            city: org.city,
        })
        
        return {
            pet,
        }
    }
}