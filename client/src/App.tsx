import React from 'react'
import { useSelector } from 'react-redux'
import {IRootState} from './Store/reducers/rootReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { useProtectedRoutes } from './Helpers/routes'

function App() {
	const {logged} = useSelector((state: IRootState)=> state.user)
	return (
		<div className="App">
			<Router>{useProtectedRoutes(logged)}</Router>
		</div>
	)
}

export default App
