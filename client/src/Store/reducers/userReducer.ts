import { Action } from 'redux'

interface IUserStore {
	logged: boolean
}

const initialState: IUserStore = {
	logged: false,
}

export const userReducer = (store: IUserStore = initialState, action: Action) => {
	switch (action.type) {
		default:
			return {
				...store,
			}
	}
}
