import { combineReducers } from 'redux'
import { userReducer, IUserState } from './userReducer'
import {apiReducer, IApiState} from './apiReducer'

export interface IRootState {
	user: IUserState
	api: IApiState
}

export default combineReducers<IRootState>({
	user: userReducer,
	api: apiReducer
})
