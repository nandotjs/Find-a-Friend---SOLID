import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetPetDetailsUseCase } from '../../../use-cases/factories/make-get-pet-details-use-case'

export async function details(req: FastifyRequest, rep: FastifyReply) {
    const createPetParamsSchema = z.object({
        petId: z.string().uuid()
    })

    const { petId } = createPetParamsSchema.parse(req.params)

    const petDetailsUseCase = makeGetPetDetailsUseCase() 

    const pet = await petDetailsUseCase.execute({ 
        petId,
    })
    
    return rep.status(200).send({
        ...pet
    })
}