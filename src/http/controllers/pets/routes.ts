import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { register } from "./register"


export async function petsRoutes(app: FastifyInstance) {
    app.post('/pet', {onRequest: [verifyJWT]}, register)

    // app.get('/pet/details', details)
    // app.get('/pet/search', search)
} 