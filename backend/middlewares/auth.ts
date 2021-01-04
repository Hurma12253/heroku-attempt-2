import jwt from 'jsonwebtoken'
import {Request, Response, Next} from '../types/express'

export function auth(req: Request, res: Response, next: Next) {
	if (req.path === '/user/signin' || req.path === '/user/signup') {
		return next()
	}
	const token = req.header('Token')
	if (token) {
		try {
			const decoded: any = jwt.verify(token, process.env.JWT_SECRET)

            req._id = decoded._id
            req.role = decoded.role

			return next()
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				res.status(401).send({ message: 'Token expired!' })
			} else if (error instanceof jwt.JsonWebTokenError) {
				res.status(401).send({ messahe: 'Invalid token!' })
			} else {
				res.status(400).send({ message: error.message })
			}
		}
	} else {
		res.status(401).send({ message: 'Not token' })
	}
}
