import {
	USER_LOGIN_FETCHING,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	LOGOUT,
	USER_REGISTER_FETCHING,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_ADDMEMBER_FETCHING,
	USER_ADDMEMBER_SUCCESS,
	USER_ADDMEMBER_FAILURE,
	USER_GETMEMBERS_FETCHING,
	USER_GETMEMBERS_SUCCESS,
	USER_GETMEMBERS_FAILURE,
	USER_LOGINMEMBER_FETCHING,
	USER_LOGINMEMBER_SUCCESS,
	USER_LOGINMEMBER_FAILURE,
	USER_EDITMEMBER_FETCHING,
	USER_EDITMEMBER_SUCCESS,
	USER_EDITMEMBER_FAILURE,
	USER_DELETE_FETCHING,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAILURE,
} from '../actions/actionTypes'
import { UserActionTypes } from '../actions/userActions'
import { IUser, IUserInfo } from '../../Services/Api'

export interface IUserState {
	logged: boolean
	loading: boolean
	error: string | null
	user: IUser | null
	users: IUserInfo[]
	addUserLoading: boolean
	addUserError: string | null
	userLoginLoading: boolean
	updatedPatch: number
}

const userFromLocalStorage = JSON.parse(
	localStorage.getItem('UserInfo') || 'null'
)

const usersFromLocalStorage = JSON.parse(
	localStorage.getItem('Users') || 'null'
)

const initialState: IUserState = {
	logged: !!userFromLocalStorage,
	user: userFromLocalStorage,
	users: usersFromLocalStorage
		? usersFromLocalStorage.filter(
				(user: IUserInfo) => user._id !== userFromLocalStorage._id
		  )
		: null,
	loading: false,
	error: null,
	addUserLoading: false,
	addUserError: null,
	userLoginLoading: false,
	updatedPatch: Math.random(),
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
				error: null,
			}
		case USER_LOGIN_SUCCESS:
			localStorage.setItem(
				'UserInfo',
				JSON.stringify({
					...action.payload.user,
				})
			)
			localStorage.setItem(
				'Users',
				JSON.stringify(action.payload.user.users)
			)
			return {
				...state,
				loading: false,
				logged: true,
				user: action.payload.user,
				users: action.payload.user.users.filter(
					(user) => user._id !== action.payload.user._id
				),
				error: null,
			}
		case USER_LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case LOGOUT:
			localStorage.clear()
			return {
				...state,
				loading: false,
				logged: false,
				error: null,
				user: null,
				users: [],
			}
		case USER_REGISTER_FETCHING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case USER_REGISTER_SUCCESS:
			localStorage.setItem(
				'UserInfo',
				JSON.stringify({
					...action.payload.user,
				})
			)
			localStorage.setItem(
				'Users',
				JSON.stringify(action.payload.user.users)
			)
			return {
				...state,
				loading: false,
				logged: true,
				user: action.payload.user,
				users: action.payload.user.users.filter(
					(user) => user._id !== action.payload.user._id
				),
				error: null,
			}
		case USER_REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case USER_ADDMEMBER_FETCHING:
			return {
				...state,
				addUserLoading: true,
				addUserError: null,
			}
		case USER_ADDMEMBER_SUCCESS:
			localStorage.setItem('Users', JSON.stringify(action.payload.users))
			return {
				...state,
				addUserLoading: false,
				users: action.payload.users.filter(
					(user) => user._id !== state.user?._id
				),
				addUserError: null,
			}
		case USER_ADDMEMBER_FAILURE:
			return {
				...state,
				addUserLoading: false,
				addUserError: action.payload.error,
			}
		case USER_GETMEMBERS_FETCHING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case USER_GETMEMBERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload.users.filter(
					(user) => user._id !== state.user?._id
				),
				error: null,
			}
		case USER_GETMEMBERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case USER_LOGINMEMBER_FETCHING:
			return {
				...state,
				userLoginLoading: true,
				error: null,
			}
		case USER_LOGINMEMBER_SUCCESS:
			localStorage.setItem(
				'UserInfo',
				JSON.stringify({
					...action.payload.user,
				})
			)
			localStorage.setItem(
				'Users',
				JSON.stringify(action.payload.user.users)
			)
			return {
				...state,
				userLoginLoading: false,
				user: action.payload.user,
				users: action.payload.user.users.filter(
					(user) => user._id !== action.payload.user._id
				),
				error: null,
				updatedPatch: Math.random(),
			}
		case USER_LOGINMEMBER_FAILURE:
			return {
				...state,
				userLoginLoading: false,
				error: action.payload.error,
			}
		case USER_EDITMEMBER_FETCHING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case USER_EDITMEMBER_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload.users.filter(
					(user) => user._id !== state.user?._id
				),
				error: null,
			}
		case USER_EDITMEMBER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case USER_DELETE_FETCHING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case USER_DELETE_SUCCESS:
			localStorage.setItem('Users', JSON.stringify(action.payload.users))
			return {
				...state,
				loading: false,
				error: null,
				users: action.payload.users.filter(
					(user) => user._id !== state.user?._id
				),
			}
		case USER_DELETE_FAILURE:
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
