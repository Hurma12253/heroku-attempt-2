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

const usersFromLocalStorage = JSON.parse(localStorage.getItem('users') || '[]')

const initialState: IUserState = {
	logged: false,
	userInfo: null,
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
			}
		case USER_LOGIN_SUCCESS:
			localStorage.setItem('Token', action.payload.token)
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			}
		case USER_LOGIN_FAILURE:
			return{
				...state,
				loading: false,
				error: action.payload.error
			}
		default:
			return {
				...state
			}
	}
}
