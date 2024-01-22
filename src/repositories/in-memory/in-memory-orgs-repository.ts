import { ORG, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ORGsRepository } from '../orgs-repository'


export class InMemoryORGsRepository implements ORGsRepository {

    public items: ORG[] = []

    async create(data: Prisma.ORGCreateInput) {

        const org = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            address: data.address,
            contact: data.contact,
        }

        this.items.push(org)
        return org
        
    }

    async findByEmail(email: string) {
        const org = this.items.find(item => item.email === email)

        if (!org) {
            return null
        }

        return org
    }

    async findById(id: string) {
        const org = this.items.find(item => item.id === id)

        if (!org) {
            return null
        }

        return org
    }
}
