import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { register } from "./register"
import { details } from "./details"
import { search } from "./search"


export async function petsRoutes(app: FastifyInstance) {
    app.post('/pet', {onRequest: [verifyJWT]}, register)

    app.get('/pet/:petId/details', details)
    app.get('/pet/:city/search', search)
} 