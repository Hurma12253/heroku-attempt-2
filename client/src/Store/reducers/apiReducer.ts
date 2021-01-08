import {
	APIS_GET_FETCHING,
	APIS_GET_SUCCESS,
	APIS_GET_FAILURE,
	APIS_CLEAR,
} from '../actions/actionTypes'
import { ApiActionTypes } from '../actions/apiActions'
import { IApi } from '../../Services/Api'

const apisFromLocalStorage = JSON.parse(localStorage.getItem('Apis') || '[]')

export interface IApiState {
	loading: boolean
	apis: IApi[]
	error: string | null
}

const initialState: IApiState = {
	loading: false,
	apis: apisFromLocalStorage,
	error: null,
}

export const apiReducer = (
	state: IApiState = initialState,
	action: ApiActionTypes
) => {
	switch (action.type) {
		case APIS_GET_FETCHING:
			return {
				...state,
				loading: true,
			}
		case APIS_GET_SUCCESS:
			localStorage.setItem('Apis', JSON.stringify(action.payload.apis))
			return {
				...state,
				loading: false,
				apis: action.payload.apis,
			}
		case APIS_GET_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case APIS_CLEAR:
			return {
				...state,
				apis: [],
				loading: false,
				error: null,
			}
		default:
			return {
				...state,
			}
	}
}
