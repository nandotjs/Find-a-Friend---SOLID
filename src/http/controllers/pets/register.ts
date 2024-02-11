import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makePetRegisterUseCase } from '../../../use-cases/factories/make-pet-register-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function register(req: FastifyRequest, rep: FastifyReply) {

    const RegisterBodySchema = z.object({
        breed: z.string(),
        color: z.string(),
        puppy: z.boolean(),
    })

    const { breed, color, puppy } = RegisterBodySchema.parse(req.body)

    try {
        const registerUseCase = makePetRegisterUseCase()

        await registerUseCase.execute({
            breed,
            color,
            puppy,
            orgId: req.user.sub,
        })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: error.message})
        }
        throw error
    }

    return rep.status(201).send()
}