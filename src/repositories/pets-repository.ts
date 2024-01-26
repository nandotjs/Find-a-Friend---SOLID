import { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
    create(data:Prisma.PetUncheckedCreateInput) : Promise<Pet>
    findById(id: string) : Promise<Pet | null>
    findManyByCityAndFilters(city: string, breed?: string, color?: string, puppy?: boolean) : Promise<Pet[]>
}