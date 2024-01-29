import { prisma } from "../../lib/prisma"
import { Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"

export class PrismaPetsRepository implements PetsRepository {

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            },
        })

        return pet
    }

    async findManyByCityAndFilters(city: string, breed?: string, color?: string, puppy?: boolean) {
        const pets = await prisma.pet.findMany({
            where: {
                city,
                breed,
                color,
                puppy,
            },
        })

        return pets
    }
}
