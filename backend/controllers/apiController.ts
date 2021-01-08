import { Request, Response } from '../types/express'
import axios from 'axios'
import User from '../models/UserModel'
import Api from '../models/ApiModel'

const getRandomProp = (obj: any) => {
	const keys = Object.keys(obj)
	return obj[keys[(keys.length * Math.random()) << 0]]
}

class ApiController {
	constructor() {}

	async getApiList(req: Request, res: Response) {
		try {
			const listExists = await Api.findOne({ user: req._id })

			if (listExists) {
				return res.status(200).json({ apis: listExists.apis })
			}

			const { data } = await axios.get(
				'https://api.publicapis.org/entries'
			)

			if (data) {
				const apis = new Array(10)
					.fill('')
					.map(() => getRandomProp(data.entries))

				const result = await Api.create({ user: req._id, apis })

				if (result) {
					res.status(200).json({ apis })
				} else {
					res.status(400).json({ message: 'Some error' })
				}
			}
		} catch (error) {}
	}
}

export default ApiController
