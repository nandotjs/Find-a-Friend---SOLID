import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"


interface FetchPetsUseCaseRequest {
    city: string
}

interface FetchPetsUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ) {}

    async execute({city}: FetchPetsUseCaseRequest) : Promise<FetchPetsUseCaseResponse> {
    
        const pets = await this.petsRepository.findManyByCity(city)

        return {
            pets,
        }
    }
}