import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IRootState } from '../reducers/rootReducer'
import {
	USER_LOGIN_FETCHING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_SAVE,
	USER_CHANGE,
} from './actionTypes'
import errorHandler from '../../Helpers/error'
import api from '../../Services/Api'

export const userLogin = (body: {
	login: string
	password: string
}): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(loginFetching())

			const { data } = await api.userLogin(body)

			if (data) {
				dispatch(loginSuccess(data))
			}
		} catch (error) {
			console.log(error)
			dispatch(loginFailure(error))
		}
	}
}

export const addUser = (body: {
	login: string
	password: string
}): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(saveCurrentUser())

			dispatch(loginFetching())

			const { data } = await api.userLogin(body)

			if (data) {
				dispatch(saveCurrentUser())

				dispatch(loginSuccess(data))
			}
		} catch (error) {
			console.log(error)
			loginFailure(errorHandler(error))
		}
	}
}

type ChangeUser = {
	type: typeof USER_CHANGE
	payload: {
		_id: string
	}
}

export const changeUser = (_id: string): ChangeUser => ({
	type: USER_CHANGE,
	payload: {
		_id,
	},
})

type SaveCurrentUser = {
	type: typeof USER_SAVE
}

const saveCurrentUser = (): SaveCurrentUser => ({
	type: USER_SAVE,
})

type LoginFetching = {
	type: typeof USER_LOGIN_FETCHING
}

const loginFetching = (): LoginFetching => ({
	type: USER_LOGIN_FETCHING,
})

type LoginSuccess = {
	type: typeof USER_LOGIN_SUCCESS
	payload: {
		name: string
		role: 'admin' | 'default'
		token: string
	}
}

const loginSuccess = (data: {
	name: string
	role: 'admin' | 'default'
	token: string
}): LoginSuccess => ({
	type: USER_LOGIN_SUCCESS,
	payload: {
		name: data.name,
		role: data.role,
		token: data.token,
	},
})

type LoginFailure = {
	type: typeof USER_LOGIN_FAILURE
	payload: {
		error: string
	}
}

const loginFailure = (error: any): LoginFailure => ({
	type: USER_LOGIN_FAILURE,
	payload: {
		error: errorHandler(error),
	},
})

export type UserActionTypes =
	| LoginFetching
	| LoginSuccess
	| LoginFailure
	| SaveCurrentUser
	| ChangeUser
