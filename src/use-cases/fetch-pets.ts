import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


interface FetchPetsUseCaseRequest {
    city: string
    breed?: string
    color?: string
    puppy?: boolean
}

interface FetchPetsUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ) {}

    async execute({city, breed, color, puppy} : FetchPetsUseCaseRequest) : Promise<FetchPetsUseCaseResponse> {
    
        const pets = await this.petsRepository.findManyByCityAndFilters(city, breed, color, puppy)

        if(!city.trim()) {
            throw new ResourceNotFoundError()
        }

        return {
            pets,
        }
    }
}