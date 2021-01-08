import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IRootState } from '../reducers/rootReducer'
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
} from './actionTypes'
import errorHandler from '../../Helpers/error'
import api, { IUser, IUserInfo } from '../../Services/Api'

export const userSignin = (body: {
	email: string
	password: string
}): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(loginFetching())

			const { data } = await api.userSignin(body)

			if (data) {
				dispatch(logout())
				dispatch(loginSuccess(data))
			}
		} catch (error) {
			console.log(error)
			dispatch(loginFailure(error))
		}
	}
}

//LOGIN ACTION-CREATORS

interface IUserLogin extends IUser {
	users: IUserInfo[]
}

type LoginFetching = {
	type: typeof USER_LOGIN_FETCHING
}

const loginFetching = (): LoginFetching => ({
	type: USER_LOGIN_FETCHING,
})

type LoginSuccess = {
	type: typeof USER_LOGIN_SUCCESS
	payload: {
		user: IUserLogin
	}
}

const loginSuccess = (data: IUserLogin): LoginSuccess => ({
	type: USER_LOGIN_SUCCESS,
	payload: {
		user: data,
	},
})

type LoginFailure = {
	type: typeof USER_LOGIN_FAILURE
	payload: {
		error: string
	}
}

export const loginFailure = (error: any): LoginFailure => ({
	type: USER_LOGIN_FAILURE,
	payload: {
		error: errorHandler(error),
	},
})

type Logout = {
	type: typeof LOGOUT
}

export const logout = () => ({
	type: LOGOUT,
})

//REGISTER ACTION-CREATORS
export const userSignup = (body: {
	email: string
	password: string
	firstname: string
	lastname: string
	patronymic: string
}): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(registerFetching())

			const { data } = await api.userSignup(body)

			if (data) {
				dispatch(logout())
				dispatch(registerSuccess(data))
			}
		} catch (error) {
			dispatch(registerFailure(error))
		}
	}
}

type RegisterFetching = {
	type: typeof USER_REGISTER_FETCHING
}

const registerFetching = (): RegisterFetching => ({
	type: USER_REGISTER_FETCHING,
})

type RegisterSuccess = {
	type: typeof USER_REGISTER_SUCCESS
	payload: {
		user: IUserLogin
	}
}

const registerSuccess = (data: IUserLogin): RegisterSuccess => ({
	type: USER_REGISTER_SUCCESS,
	payload: {
		user: data,
	},
})

type RegisterFailure = {
	type: typeof USER_REGISTER_FAILURE
	payload: {
		error: string
	}
}

export const registerFailure = (error: any): RegisterFailure => ({
	type: USER_REGISTER_FAILURE,
	payload: {
		error: errorHandler(error),
	},
})

// ADD MEMBER ACTIONS-CREATORS

export const addMember = (
	body: {
		email: string
		password: string
		firstname: string
		lastname: string
		patronymic: string
	},
	cb?: () => void
): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(addMemberFetching())

			const { data } = await api.addMember(body)

			if (data) {
				if (cb) {
					cb()
				}
				dispatch(addMemberSuccess(data))
			}
		} catch (error) {
			console.log(error)
			dispatch(addMemberFailure(errorHandler(error)))
		}
	}
}

type AddMemberFetching = {
	type: typeof USER_ADDMEMBER_FETCHING
}

const addMemberFetching = (): AddMemberFetching => ({
	type: USER_ADDMEMBER_FETCHING,
})

type AddMemberSuccess = {
	type: typeof USER_ADDMEMBER_SUCCESS
	payload: {
		users: IUserInfo[]
	}
}

const addMemberSuccess = (data: { users: IUser[] }): AddMemberSuccess => ({
	type: USER_ADDMEMBER_SUCCESS,
	payload: data,
})

type AddMemberFailure = {
	type: typeof USER_ADDMEMBER_FAILURE
	payload: {
		error: string
	}
}

const addMemberFailure = (error: string): AddMemberFailure => ({
	type: USER_ADDMEMBER_FAILURE,
	payload: {
		error,
	},
})

//GET MEMBERS ACTION-CREATORS

export const getMembers = (): ThunkAction<
	void,
	IRootState,
	unknown,
	Action
> => {
	return async (dispatch) => {
		try {
			dispatch(getMembersFetching())

			const { data } = await api.getMembers()

			if (data) {
				dispatch(getMembersSuccess(data))
			}
		} catch (error) {
			dispatch(getMembersFailure(errorHandler(error)))
		}
	}
}

type GetMembersFetching = {
	type: typeof USER_GETMEMBERS_FETCHING
}

const getMembersFetching = (): GetMembersFetching => ({
	type: USER_GETMEMBERS_FETCHING,
})

type GetMembersSuccess = {
	type: typeof USER_GETMEMBERS_SUCCESS
	payload: {
		users: IUserInfo[]
	}
}

const getMembersSuccess = (data: { users: IUser[] }): GetMembersSuccess => ({
	type: USER_GETMEMBERS_SUCCESS,
	payload: data,
})

type GetMembersFailure = {
	type: typeof USER_GETMEMBERS_FAILURE
	payload: {
		error: string
	}
}

const getMembersFailure = (error: string): GetMembersFailure => ({
	type: 'USER_GETMEMBERS_FAILURE',
	payload: {
		error,
	},
})

//MEMBER LOGIN ACTION-CREATORS

export const loginMember = (
	body: {
		_id: string
	},
	cb?: () => void
): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(loginMemberFetching())

			const { data } = await api.loginMember(body)

			if (data) {
				if (cb) {
					cb()
				}
				dispatch(loginMemberSuccess(data))
			}
		} catch (error) {
			dispatch(loginMemberFailure(errorHandler(error)))
		}
	}
}

type LoginMemberFetching = {
	type: typeof USER_LOGINMEMBER_FETCHING
}

const loginMemberFetching = (): LoginMemberFetching => ({
	type: USER_LOGINMEMBER_FETCHING,
})

type LoginMemberSuccess = {
	type: typeof USER_LOGINMEMBER_SUCCESS
	payload: {
		user: IUserLogin
	}
}

const loginMemberSuccess = (data: IUserLogin): LoginMemberSuccess => ({
	type: USER_LOGINMEMBER_SUCCESS,
	payload: {
		user: data,
	},
})

type LoginMemberFailure = {
	type: typeof USER_LOGINMEMBER_FAILURE
	payload: {
		error: string
	}
}

const loginMemberFailure = (error: string): LoginMemberFailure => ({
	type: USER_LOGINMEMBER_FAILURE,
	payload: {
		error,
	},
})

//EDIT MEMBER ACTION-CREATORS

export const editMember = (body: {
	_id: string
	firstname: string
	lastname: string
	patronymic: string
	email: string
}): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(editMemberFetching())

			const { data } = await api.editUser(body)

			if (data) {
				dispatch(editMemberSuccess(data))
			}
		} catch (error) {
			dispatch(editMemberFailure(errorHandler(error)))
		}
	}
}

type EditMemberFetching = {
	type: typeof USER_EDITMEMBER_FETCHING
}

const editMemberFetching = (): EditMemberFetching => ({
	type: USER_EDITMEMBER_FETCHING,
})

type EditMemberSuccess = {
	type: typeof USER_EDITMEMBER_SUCCESS
	payload: {
		users: IUserInfo[]
	}
}

const editMemberSuccess = (data: {
	users: IUserInfo[]
}): EditMemberSuccess => ({
	type: USER_EDITMEMBER_SUCCESS,
	payload: data,
})

type EditMemberFailure = {
	type: typeof USER_EDITMEMBER_FAILURE
	payload: {
		error: string
	}
}

const editMemberFailure = (error: string): EditMemberFailure => ({
	type: USER_EDITMEMBER_FAILURE,
	payload: {
		error,
	},
})

//DELETE USER ACTION-CREATORS

export const deleteUser = (body: {
	_id: string
}): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(deleteUserFetching())

			const { data } = await api.deleteUser(body)

			if (data) {
				dispatch(deleteUserSuccess(data))
			}
		} catch (error) {
			dispatch(deleteUserFailure(errorHandler(error)))
		}
	}
}

type DeleteUserFetching = {
	type: typeof USER_DELETE_FETCHING
}

const deleteUserFetching = (): DeleteUserFetching => ({
	type: USER_DELETE_FETCHING,
})

type DeleteUserSuccess = {
	type: typeof USER_DELETE_SUCCESS
	payload: {
		users: IUserInfo[]
	}
}

const deleteUserSuccess = (data: {
	users: IUserInfo[]
}): DeleteUserSuccess => ({
	type: USER_DELETE_SUCCESS,
	payload: data,
})

type DeleteUserFailure = {
	type: typeof USER_DELETE_FAILURE
	payload: {
		error: string
	}
}

const deleteUserFailure = (error: string): DeleteUserFailure => ({
	type: USER_DELETE_FAILURE,
	payload: {
		error,
	},
})

export type UserActionTypes =
	| LoginFetching
	| LoginSuccess
	| LoginFailure
	| Logout
	| RegisterFetching
	| RegisterSuccess
	| RegisterFailure
	| AddMemberFetching
	| AddMemberSuccess
	| AddMemberFailure
	| GetMembersFetching
	| GetMembersSuccess
	| GetMembersFailure
	| LoginMemberFetching
	| LoginMemberSuccess
	| LoginMemberFailure
	| EditMemberFetching
	| EditMemberSuccess
	| EditMemberFailure
	| DeleteUserFetching
	| DeleteUserSuccess
	| DeleteUserFailure
