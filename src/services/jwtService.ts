import jwt from 'jsonwebtoken'

const secret = 'chave-do-jwt'

export const jwtService = {
    signToken: (payload: string | object | Buffer, expirationDate: string) => {
        return jwt.sign(payload, secret, {
            expiresIn: expirationDate
        })
    }
}