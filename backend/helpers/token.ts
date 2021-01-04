import jwt from 'jsonwebtoken'

interface IToken {
    _id: string
    role: 'default' | 'admin'
}

export function createToken(payload: IToken):string {
    return jwt.sign(payload, process.env.JWT_SECRET)
}