import { Request, Response } from '../types/express'
import User from '../models/UserModel'
import { createToken } from '../helpers/token'

class UserController {
	constructor() {}

	signup(req: Request, res: Response) {
		const { firstname, lastname, patronymic, email, password } = req.body

		User.findOne({ email })
			.then((user) => {
				if (user) {
					res.status(400).json({
						message: 'This user already exists!',
					})
				} else {
					User.create({
						firstname,
						lastname,
						patronymic,
						email,
						password,
					})
						.then((user) => {
							res.status(200).json({
								name: user.firstname,
								role: user.role,
								token: createToken({
									_id: user._id,
									role: user.role,
								}),
							})
						})
						.catch((error) => {
							res.status(400).json({ message: error })
						})
				}
			})
			.catch((err) => {
				res.status(400).json({ message: err })
			})
	}

	signin(req: Request, res: Response) {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({ message: 'Invalid credentials!' })
		}

		User.findOne({ email })
			.then((user) => {
				if (!user) {
					return res
						.status(400)
						.json({ message: 'This user doesnt exists!' })
				} else {
					if (!user.matchPassword(password)) {
						return res
							.status(400)
							.json({ message: 'Invalid password!' })
					} else {
						res.status(200).json({
							name: user.firstname,
							role: user.role,
							_id: user._id,
							token: createToken({
								_id: user._id,
								role: user.role,
							}),
						})
					}
				}
			})
			.catch((error) => {
				res.status(400).json({ message: error })
			})
	}

	async addMember(req: Request, res: Response) {
		try {
			const {
				email,
				password,
				firstname,
				lastname,
				patronymic,
			} = req.body

			if (!email || !firstname || !lastname || !patronymic) {
				return res.status(400).json({ message: 'Invalid credentials!' })
			}

			const userExists = await User.findOne({ email })

			if (userExists) {
				return res
					.status(400)
					.json({ message: 'This user already exists!' })
			}

			const currentUser = await User.findOne({ _id: req._id }, 'owner')

			const createdUser = await User.create({
				email,
				password,
				firstname,
				lastname,
				patronymic,
				owner: currentUser.owner ? currentUser.owner : req._id,
			})

			const users = currentUser.owner
				? await User.find(
						{
							$or: [
								{ _id: currentUser.owner },
								{ owner: currentUser.owner },
							],
						},
						'email firstname lastname patronymic role'
				  )
				: await User.find(
						{ $or: [{ owner: req._id }, { _id: req._id }] },
						'email firstname lastname patronymic role'
				  )

			res.status(200).json({ users })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}

	async getMembers(req: Request, res: Response) {
		try {
			const currentUser = await User.findOne({ _id: req._id })

			const users = currentUser.owner
				? await User.find(
						{
							$or: [
								{ _id: currentUser.owner },
								{ owner: currentUser.owner },
							],
						},
						'email firstname lastname patronymic role'
				  )
				: await User.find(
						{ $or: [{ owner: req._id }, { _id: req._id }] },
						'email firstname lastname patronymic role'
				  )

			res.status(200).json({ users })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}

	async editUser(req: Request, res: Response) {
		try {
			const { _id, email, firstname, lastname, patronymic } = req.body

			if (!_id || !email || !firstname || !lastname || !patronymic) {
				return res.status(400).json({ message: 'Invalid credentials!' })
			}

			const currentUser = await User.findOne({ _id: req._id })
			const editingUser = await User.findOne({ _id })

			if (
				!(
					currentUser.owner === editingUser._id ||
					currentUser.owner === editingUser.owner ||
					currentUser._id === editingUser.owner
				)
			) {
				return res.status(403).json({
					message: 'You dont have permissions to change this user!',
				})
			}

			const updatedUser = await User.updateOne(
				{ _id },
				{ $set: { email, firstname, lastname, patronymic } }
			)

			const users = currentUser.owner
				? await User.find(
						{
							$or: [
								{ _id: currentUser.owner },
								{ owner: currentUser.owner },
							],
						},
						'email firstname lastname patronymic role'
				  )
				: await User.find(
						{ $or: [{ owner: req._id }, { _id: req._id }] },
						'email firstname lastname patronymic role'
				  )

			res.status(200).json({ users })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}

	async loginMember(req: Request, res: Response) {
		try {
			const currentUser = await User.findOne({ _id: req._id })
			const {
				_id,
				firstname,
				lastname,
				patronymic,
				email,
				role,
				owner,
			} = await User.findOne({ _id: req.body._id })

			if (
				currentUser.owner === _id ||
				currentUser.owner === owner ||
				currentUser._id === owner
			) {
				return res.status(403).json({
					message: 'You dont have permissions to login this user!',
				})
			}

			res.status(200).json({
				_id,
				firstname,
				lastname,
				patronymic,
				email,
				role,
				token: createToken({ _id, role }),
			})
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { _id } = req.body

			const currentUser = await User.findOne({ _id: req._id })
			const deletingUser = await User.findOne({ _id })

			if (
				currentUser.owner === _id ||
				currentUser.owner === deletingUser.owner ||
				currentUser._id === deletingUser.owner
			) {
				return res.status(403).json({
					message: 'You dont have permissions to delete this user!',
				})
			}

			await User.deleteOne({ _id })

			const users = currentUser.owner
				? await User.find(
						{
							$or: [
								{ _id: currentUser.owner },
								{ owner: currentUser.owner },
							],
						},
						'email firstname lastname patronymic role'
				  )
				: await User.find(
						{ $or: [{ owner: req._id }, { _id: req._id }] },
						'email firstname lastname patronymic role'
				  )

			res.status(200).json({ users })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}
}

export default UserController
