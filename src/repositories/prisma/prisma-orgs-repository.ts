import { prisma } from "../../lib/prisma"
import { Prisma } from '@prisma/client'
import { ORGsRepository } from "../orgs-repository"

export class PrismaORGsRepository implements ORGsRepository {

    async create(data: Prisma.ORGCreateInput) {
        const org = await prisma.oRG.create({
            data,
        })

        return org
    }

    async findByEmail(email: string) {
        const org = await prisma.oRG.findUnique({
            where: {
                email,
            }
        })

        return org
    }

    async findById(id: string) {
        const org = await prisma.oRG.findUnique({
            where: {
                id,
            }
        })

        return org
    }
}