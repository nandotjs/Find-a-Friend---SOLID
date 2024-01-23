
export interface CepInfo {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    ibge: string
}

export interface ValidateCEPResult {
    cepInfo: CepInfo
}

export async function validateCEP(cep: string) {
    const cepDigitsOnly = cep.replace(/\D/g, '')

    if (cepDigitsOnly.length !== 8) {
        return null
    }

    const url = `https://viacep.com.br/ws/${cepDigitsOnly}/json/`

    try {
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            return {cepInfo: data as CepInfo}
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}