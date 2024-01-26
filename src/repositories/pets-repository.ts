import { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
    create(data:Prisma.PetUncheckedCreateInput) : Promise<Pet>
    findById(id: string) : Promise<Pet | null>
    findManyByCity(city: string, breed?: string, color?: string, puppy?: boolean) : Promise<Pet[]>
}