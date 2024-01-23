import { hash } from "bcryptjs"
import { ORGAlreadyExistsError } from "./errors/org-already-exists-error"
import { ORG } from "@prisma/client"
import { ORGsRepository } from './../repositories/orgs-repository'
import { validateCEP } from "../utils/cep-validation"
import { InvalidAddressError } from "./errors/invalid-address-error"


interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string,
    address: string,
    city: string
    contact: string,
}

interface RegisterUseCaseResponse {
    org: ORG
}

export class RegisterUseCase {
    constructor(private orgsRepository: ORGsRepository) {}

    async execute({name, email, password, address, city, contact}: RegisterUseCaseRequest) : Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)
    
        // email validation
        const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
        if (orgWithSameEmail) {
            throw new ORGAlreadyExistsError()
        }

        // addresss validation
        const validCEP = await validateCEP(address)
        if(!validCEP) {
            throw new InvalidAddressError()
        }

        const addressCEP = validCEP.cepInfo.cep
        const addressCity = validCEP.cepInfo.localidade
    
        const org = await this.orgsRepository.create({
            name,
            email,
            password_hash,
            address: addressCEP,
            city: addressCity,
            contact,
        })
        console.log(org.city)
        return {
            org,
        }
    }
}