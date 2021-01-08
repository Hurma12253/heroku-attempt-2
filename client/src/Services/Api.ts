import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import store from '../Store/store'

const axiosConfig: AxiosRequestConfig = {
	baseURL: 'http://localhost:8080',
}

class Api {
	axios: AxiosInstance

	constructor() {
		this.axios = axios.create(axiosConfig)
		this.axios.interceptors.request.use(function (config) {
			const userInfo = JSON.parse(
				localStorage.getItem('UserInfo') || 'null'
			)

			if (userInfo) {
				config.headers.Token = userInfo.token
			}

			return config
		})

		this.axios.interceptors.response.use(
			function (response) {
				return response
			},
			function (error) {
				if (error.response.status === 401) {
					store.dispatch({ type: 'LOGOUT' })
				}

				return Promise.reject(error)
			}
		)
	}

	userSignup(body: {
		email: string
		password: string
		firstname: string
		lastname: string
		patronymic: string
	}) {
		return this.axios.post('/user/signup', body)
	}

	userSignin(body: { email: string; password: string }) {
		return this.axios.post('/user/signin', body)
	}

	editUser(body: {
		email: string
		firstname: string
		lastname: string
		patronymic: string
	}) {
		return this.axios.put('/user/edituser', body)
	}

	getMembers() {
		return this.axios.get('/user/getmembers')
	}

	addMember(body: IUserRegistration) {
		return this.axios.post('/user/addmember', body)
	}

	loginMember(body: { _id: string }) {
		return this.axios.post('/user/loginmember', body)
	}

	deleteUser(body: { _id: string }) {
		return this.axios.post('/user/delete', body)
	}

	getRandomApiList() {
		return this.axios.get('/randomApiList')
	}
}

export interface IUserInfo {
	_id: string
	email: string
	firstname: string
	lastname: string
	patronymic: string
	role: string
}

export interface IUser extends IUserInfo {
	token: string
}

export interface IUserRegistration {
	email: string
	password: string
	firstname: string
	lastname: string
	patronymic: string
}

export interface IApi {
	API: string
	Auth: string
	Category: string
	Cors: string
	Description: string
	HTTPS: boolean
	Link: string
}

export default new Api()
