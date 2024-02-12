import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsUseCase } from '../../../use-cases/factories/make-fetch-pets-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function search(req: FastifyRequest, rep: FastifyReply) {
    const searchParamsSchema = z.object({
        breed: z.string().optional(),
        color: z.string().optional(),
        puppy: z.string().optional(),
    })

    const cityParamsSchema = z.object({
        city: z.string()
    })

    const { breed, color, puppy } = searchParamsSchema.parse(req.query)

    const { city } = cityParamsSchema.parse(req.params)

    const puppyBoolean = puppy !== undefined ? puppy.toLowerCase() === 'true' : undefined

    try {
        const fetchPetsUseCase = makeFetchPetsUseCase()

        const { pets } = await fetchPetsUseCase.execute({
            city,
            breed,
            color,
            puppy: puppyBoolean,
        })

        return rep.status(200).send({
            pets,
        })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: error.message })
        }
        throw error
    }
}
