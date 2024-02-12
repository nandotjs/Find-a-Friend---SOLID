import fastify from "fastify"
import { petsRoutes } from "./http/controllers/pets/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"
import { orgsRoutes } from "./http/controllers/orgs/routes"
import fastifyCookie from "@fastify/cookie"

export const app = fastify()

// JWT
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, req, rep) => {

    if (error instanceof ZodError) {
        return rep.status(400).send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV === 'production') {
        console.error(error)
    } else {
        // Log to external tool like DataDog/NewRelic/Sentry
    }

    return rep.status(500).send({ message: 'Internal server error.'})
})