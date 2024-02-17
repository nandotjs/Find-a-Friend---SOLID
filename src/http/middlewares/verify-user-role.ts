import { FastifyReply, FastifyRequest } from "fastify"

export function verifyUserRole(roleToVerify: 'ADM' | 'MEMBER') {
    return async ( req: FastifyRequest, rep: FastifyReply ) => {
        const { role } = req.user

        if (role !== roleToVerify) {
            return rep.status(401).send({message: 'Unauthorized.'})
        }
    }
}