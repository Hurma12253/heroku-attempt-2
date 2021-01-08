const error = (error: any): string => {
	return error.response && error.response.data.message
		? error.response.data.message
		: error.message
}

export default error
