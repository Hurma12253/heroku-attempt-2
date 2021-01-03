import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const axiosConfig: AxiosRequestConfig = {
	baseURL: 'http://localhost:8080',
}

class Api {
	axios: AxiosInstance

	constructor() {
		this.axios = axios.create(axiosConfig)
		this.axios.interceptors.request.use(function (config) {
			const userInfo = JSON.parse(localStorage.getItem('UserInfo') || 'null')

			if (userInfo) {
				config.headers.Token = userInfo.token
			}

			return config
		})
	}

	userLogin(body: { login: string; password: string }) {
		return this.axios.post('/user/signin', body)
	}
}

export default new Api()
