import  request  from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { prisma } from '../../../lib/prisma'

describe('Authenticate e2e', () => {
    let tokenJWT: any

    beforeAll(async () => {
        await app.ready()

        await request(app.server)
        .post('/org')
        .send({
            name: "Test",
            email: "test@example.com",
            password: "123456",
            address: "80020-200",
            contact: "12341234"
        })

        const auth = await request(app.server)
        .post('/session')
        .send({
            email: "test@example.com",
            password: "123456",
        })

        tokenJWT = auth.body.tokenJWT
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able get pet details', async () => {
        await request(app.server)
        .post('/pet')
        .set('Authorization', `Bearer ${tokenJWT}`)
        .send({
            breed: "cat",
            color: "black",
            puppy: false,
        })

        const pet = await prisma.pet.findFirstOrThrow()

        const response = await request(app.server)
        .get(`/pet/${pet.id}/details`)
        .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.pet).toEqual(expect.objectContaining({
            breed: 'cat'
        }))
    })
})