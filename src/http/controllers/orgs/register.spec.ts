import  request  from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Register e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to register', async () => {
        const response = await request(app.server)
        .post('/org')
        .send({
            name: "Test",
            email: "test@example.com",
            password: "123456",
            address: "80020-200",
            contact: "12341234"
        })

        expect(response.statusCode).toEqual(201)
    })
})