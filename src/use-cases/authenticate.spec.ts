import { describe, it, expect, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryORGsRepository } from '../repositories/in-memory/in-memory-orgs-repository'

let imORGsRepository: InMemoryORGsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(async () => {
        imORGsRepository = new InMemoryORGsRepository()
        sut = new AuthenticateUseCase(imORGsRepository)
    })

    it('should be able to authenticate', async () => {
        await imORGsRepository.create({
            name: 'Test ORG',
            email: 'test@example.com',
            password_hash: await hash('123456', 6),
            address: '80020-200',
            city: 'Curitiba',
            contact: '1234-1234',
        })

        const { existingORG } = await sut.execute({
            email: 'test@example.com',
            password: '123456'
        })

        expect(existingORG.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email: 'test@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await imORGsRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password_hash: await hash('123456', 6),
            address: '80020-200',
            city: 'Curitiba',
            contact: '1234-1234',
        })

        await expect(() => sut.execute({
            email: 'test@example.com',
            password: '654321'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})