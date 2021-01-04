import { Request, Response } from 'express'
import User from '../models/UserModel'
import { createToken } from '../helpers/token'

class AdminController {
	constructor() {}

	getAllUsers(req: Request, res: Response) {
		User.find({}).select('firstname lastname patronymic login role').then(users=>{
            res.status(200).json({users})
        })
	}
}

export default AdminController
