const error = (error: any) => {
	return error.response && error.response.data.message
		? error.response.data.message
		: error.message
}

export default error
