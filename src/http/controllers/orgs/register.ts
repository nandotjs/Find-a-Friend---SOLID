import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'
import { ORGAlreadyExistsError } from '../../../use-cases/errors/org-already-exists-error'

export async function register(req: FastifyRequest, rep: FastifyReply) {

    const RegisterBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string(),
        contact: z.string()
    })

    const { name, email, password, address, contact } = RegisterBodySchema.parse(req.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            password,
            address,
            contact,
        })
    } catch (error) {
        if (error instanceof ORGAlreadyExistsError) {
            return rep.status(409).send({ message: error.message})
        }
        throw error
    }

    return rep.status(201).send()
}