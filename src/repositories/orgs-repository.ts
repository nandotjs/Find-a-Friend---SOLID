import { Prisma, ORG } from "@prisma/client";

export interface ORGsRepository {
    create(data:Prisma.ORGCreateInput) : Promise<ORG>
    findByEmail(email: string) : Promise<ORG | null>
    findById(id: string) : Promise<ORG | null>
}