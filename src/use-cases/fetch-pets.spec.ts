import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let imPetsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
    beforeEach(async () => {
        imPetsRepository = new InMemoryPetsRepository()
        sut = new FetchPetsUseCase(imPetsRepository)
    })

    it('should be able to fetch pets', async () => {
        await imPetsRepository.create({
            breed: 'cat',
            color: 'black',
            puppy: false,
            city: 'São Paulo',
            org_id: '1234',
        })

        await imPetsRepository.create({
            breed: 'dog',
            color: 'black',
            puppy: false,
            city: 'São Paulo',
            org_id: '4321',
        })

        const { pets } = await sut.execute({
            city: 'São Paulo',
            breed: 'cat'
        })
        
        expect(pets).toHaveLength(1)
        pets.forEach(pet => {
            expect(pet.city).toEqual('São Paulo')
        })
    })

    it('should not be able to fetch pets without city', async () => {
        await imPetsRepository.create({
            breed: 'cat',
            color: 'black',
            puppy: false,
            city: 'São Paulo',
            org_id: '1234',
        })

        await imPetsRepository.create({
            breed: 'dog',
            color: 'black',
            puppy: false,
            city: 'São Paulo',
            org_id: '4321',
        })
        
        await expect (() => 
        sut.execute({
            city: ' '
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})