import { combineReducers } from 'redux'
import { userReducer, IUserState } from './userReducer'

export interface IRootState {
	user: IUserState
}

export default combineReducers<IRootState>({
	user: userReducer,
})
