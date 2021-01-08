import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from './Store/reducers/rootReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { useProtectedRoutes } from './Helpers/routes'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {
	const { logged } = useSelector(
		(state: IRootState) => state.user
	)

	return (
		<div
			className="App"
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				background: ' #ecf1f5',
			}}
		>
			<CssBaseline />
			<Router>{useProtectedRoutes(logged)}</Router>
		</div>
	)
}

export default App
