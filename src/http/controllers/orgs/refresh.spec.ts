import { app } from '../../../app'
import  request  from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able to refresh a token', async () => {
        await request(app.server)
        .post('/org')
        .send({
            name: "Test",
            email: "test@example.com",
            password: "123456",
            address: "80020-200",
            contact: "12341234"
        })

        const authResponse = await request(app.server)
        .post('/session')
        .send({
            email: "test@example.com",
            password: "123456",
        })

        const cookies = authResponse.get('Set-Cookie')

        const  response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            tokenJWT: expect.any(String),
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})