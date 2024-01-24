import { describe, it, expect, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { InMemoryORGsRepository } from '../repositories/in-memory/in-memory-orgs-repository'

let imPetsRepository: InMemoryPetsRepository
let imORGsRepository: InMemoryORGsRepository

let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {

    beforeEach(async () => {
        imPetsRepository = new InMemoryPetsRepository()
        imORGsRepository = new InMemoryORGsRepository()
        sut = new GetPetDetailsUseCase(imPetsRepository, imORGsRepository)
    })

    it('should be able to get pet details', async () => {
        const org = await imORGsRepository.create({
            name: 'Test ORG',
            email: 'test@example.com',
            password_hash: await hash('123456', 6),
            address: '80020-200',
            city: 'Curitiba',
            contact: '1234-1234',
        })
        
        const createdPet = await imPetsRepository.create({
            breed: 'cat',
            color: 'black',
            puppy: false,
            org_id: `${org.id}`,
            city: 'Curitiba',
        })
        
        const { pet, orgContact } = await sut.execute({
            petId: createdPet.id
        })
        
        expect(pet.id).toEqual(expect.any(String))
        expect(pet.breed).toEqual('cat')
        expect(orgContact).toEqual('1234-1234')
    })

    it('should not be able to get pet details with wrong id', async () => {
        await expect(() => 
            sut.execute({
                petId: 'non-exintng-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})