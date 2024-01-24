import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase} from './register'
import { compare, hash } from 'bcryptjs'
import { InMemoryORGsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { ORGAlreadyExistsError } from './errors/org-already-exists-error'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { PetRegisterUseCase } from './pet-register'

let imPetsRepository: InMemoryPetsRepository
let imORGsRepository: InMemoryORGsRepository
let sut: PetRegisterUseCase

describe('Register Use Case', () => {

    beforeEach(async () => {
        imPetsRepository = new InMemoryPetsRepository()
        imORGsRepository = new InMemoryORGsRepository()
        sut = new PetRegisterUseCase(imPetsRepository, imORGsRepository)
    })

    it('should be able to register a pet', async () => {
        const org = await imORGsRepository.create({
            name: 'Test ORG',
            email: 'test@example.com',
            password_hash: await hash('123456', 6),
            address: '80020-200',
            city: 'Curitiba',
            contact: '1234-1234',
        })

        const { pet } = await sut.execute({
            breed: 'cat',
            color: 'black',
            puppy: false,
            orgId: org.id,
        })

        expect(pet.id).toEqual(expect.any(String))
        expect(pet.org_id).toEqual(org.id)
        expect(pet.city).toEqual(org.city)
    })
})