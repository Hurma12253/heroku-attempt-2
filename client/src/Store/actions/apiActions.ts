import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IRootState } from '../reducers/rootReducer'
import {
	APIS_GET_FETCHING,
	APIS_GET_SUCCESS,
	APIS_GET_FAILURE,
	APIS_CLEAR,
} from './actionTypes'
import api, { IApi } from '../../Services/Api'
import errorHandler from '../../Helpers/error'

export const getApis = (): ThunkAction<void, IRootState, unknown, Action> => {
	return async (dispatch) => {
		try {
			dispatch(getApisFetching())

			const { data } = await api.getRandomApiList()

			if (data) {
				dispatch(getApisSuccess(data))
			}
		} catch (error) {
			getApisFailure(error)
		}
	}
}

type GetApisFetching = {
	type: typeof APIS_GET_FETCHING
}

const getApisFetching = (): GetApisFetching => ({
	type: APIS_GET_FETCHING,
})

type GetApisSuccess = {
	type: typeof APIS_GET_SUCCESS
	payload: {
		apis: IApi[]
	}
}

const getApisSuccess = (data: { apis: IApi[] }): GetApisSuccess => ({
	type: APIS_GET_SUCCESS,
	payload: data,
})

type GetApisFailure = {
	type: typeof APIS_GET_FAILURE
	payload: {
		error: string
	}
}

const getApisFailure = (error: any): GetApisFailure => ({
	type: APIS_GET_FAILURE,
	payload: {
		error: errorHandler(error),
	},
})

type ApisClear = {
	type: typeof APIS_CLEAR
}

export const clearApis = (): ApisClear => ({
	type: APIS_CLEAR,
})

export type ApiActionTypes = GetApisFetching | GetApisSuccess | GetApisFailure | ApisClear
