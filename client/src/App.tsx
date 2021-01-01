import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useProtectedRoutes } from './Helpers/routes'

function App() {
	return (
		<div className="App">
			<Router>{useProtectedRoutes(false)}</Router>
		</div>
	)
}

export default App
