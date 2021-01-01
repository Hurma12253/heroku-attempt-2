import { Action } from 'redux'

interface IUserStore {
	logged: boolean
	userInfo: {
		name: string
		role: 'default' | 'admin'
	} | null
}

const initialState: IUserStore = {
	logged: false,
	userInfo: null
}

export const userReducer = (
	store: IUserStore = initialState,
	action: Action
) => {
	switch (action.type) {
		default:
			return {
				...store,
			}
	}
}
