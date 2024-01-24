import { Pet } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { PetsRepository } from "../repositories/pets-repository"
import { ORGsRepository } from "../repositories/orgs-repository"

interface GetPetDetailsUseCaseRequest {
    petId: string
}

interface GetPetDetailsUseCaseResponse {
    pet: Pet
    orgContact: string
}

export class GetPetDetailsUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: ORGsRepository
    ) {}
    
    async execute({petId}: GetPetDetailsUseCaseRequest) : Promise<GetPetDetailsUseCaseResponse> {
        const pet = await this.petsRepository.findById(petId)

        if(!pet) {
            throw new ResourceNotFoundError()
        }

        const org = await this.orgsRepository.findById(pet.org_id)

        if(!org) {
            throw new ResourceNotFoundError()
        }

        return {
            pet,
            orgContact: org.contact
        }
    }
}