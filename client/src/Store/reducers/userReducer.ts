import {
	USER_LOGIN_FETCHING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
} from '../actions/actionTypes'
import { UserActionTypes } from '../actions/userActions'

interface ISavedUser {
	name: string
	token: string
	role: 'admin' | 'default'
}

export interface IUserState {
	logged: boolean
	loading: boolean
	error: string | null
	userInfo: {
		name: string
		token: string
		role: 'default' | 'admin'
	} | null
	users: ISavedUser[]
}

const userInfoFromLocalStorage = JSON.parse(localStorage.getItem('UserInfo') || 'null')
const usersFromLocalStorage = JSON.parse(localStorage.getItem('users') || '[]')

const initialState: IUserState = {
	logged: !!userInfoFromLocalStorage,
	userInfo: userInfoFromLocalStorage,
	users: usersFromLocalStorage,
	loading: false,
	error: null,
}

export const userReducer = (
	state: IUserState = initialState,
	action: UserActionTypes
) => {
	switch (action.type) {
		case USER_LOGIN_FETCHING:
			return {
				...state,
				loading: true,
				error: null
			}
		case USER_LOGIN_SUCCESS:
			localStorage.setItem(
				'UserInfo',
				JSON.stringify({
					token: action.payload.token,
					name: action.payload.name,
					role: action.payload.role,
				})
			)
			return {
				...state,
				loading: false,
				logged: true,
				userInfo: action.payload,
				error: null
			}
		case USER_LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		default:
			return {
				...state,
			}
	}
}
