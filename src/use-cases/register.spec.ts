import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase} from './register'
import { compare } from 'bcryptjs'
import { InMemoryORGsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { ORGAlreadyExistsError } from './errors/org-already-exists-error'

let imORGsRepository: InMemoryORGsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {

    beforeEach(async () => {
        imORGsRepository = new InMemoryORGsRepository()
        sut = new RegisterUseCase(imORGsRepository)
    })

    it('should be able to register', async () => {
        const { org } = await sut.execute({
            name: 'Test ORG',
            email: 'test@example.com',
            password: '123456',
            address: '80020-200',
            contact: '1234-1234',
        })
        
        expect(org.id).toEqual(expect.any(String))
    })
    
    it('should not be able to register with same email twice', async () => {
        await sut.execute({
            name: 'Test ORG',
            email: 'test@example.com',
            password: '123456',
            address: '80020-200',
            contact: '1234-1234',
        })

        await expect(() => 
            sut.execute({
                name: 'Test ORG 2',
                email: 'test@example.com',
                password: '123456',
                address: '80020-200',
                contact: '1234-1234',
            })
        ).rejects.toBeInstanceOf(ORGAlreadyExistsError)
    })

    it('should hash ORG password', async () => {
        const { org } = await sut.execute({
            name: 'Test ORG',
            email: 'test@example.com',
            password: '123456',
            address: '80020-200',
            contact: '1234-1234',
        })

        const isPasswordHashed = await compare(
            '123456',
            org.password_hash
        )

        expect(isPasswordHashed).toBe(true)
    })
})