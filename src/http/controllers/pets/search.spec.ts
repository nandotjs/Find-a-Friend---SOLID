import  request  from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Search pets e2e', () => {
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


    it('should be able to search for pets', async () => {
        await request(app.server)
        .post('/pet')
        .set('Authorization', `Bearer ${tokenJWT}`)
        .send({
            breed: "cat",
            color: "black",
            puppy: false,
        })

        await request(app.server)
        .post('/pet')
        .set('Authorization', `Bearer ${tokenJWT}`)
        .send({
            breed: "dog",
            color: "black",
            puppy: true,
        })

        const city = 'Curitiba'
        const response = await request(app.server)
        .get(`/pet/${city}/search`)
        .query({
            color: 'black',
            puppy: false,
        })
        .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.pets).toEqual([
            expect.objectContaining({
                breed: 'cat',
                puppy: false,
            })
        ])
    })
})