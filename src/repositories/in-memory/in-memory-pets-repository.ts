import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'


export class InMemoryPetsRepository implements PetsRepository {

    public items: Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            breed: data.breed,
            color: data.color,
            puppy: data.puppy,
            city: data.city,
            org_id: data.org_id,
        }

        this.items.push(pet)
        return pet
    }

    async findById(id: string) {
        const pet = this.items.find(item => item.id === id)

        if (!pet) {
            return null
        }

        return pet
    }

    async findManyByCity(
            city: string,
            breed?: string,
            color?: string,
            puppy?: boolean
        ) {
        let filteredPets: Pet[] = this.items.filter(pet => pet.city === city)

        if (breed) {
            filteredPets = filteredPets.filter(pet => pet.breed === breed)
        }

        if (color) {
            filteredPets = filteredPets.filter(pet => pet.color === color)
        }

        if (puppy !== undefined) {
            filteredPets = filteredPets.filter(pet => pet.puppy === puppy)
        }

        return filteredPets
    }
}