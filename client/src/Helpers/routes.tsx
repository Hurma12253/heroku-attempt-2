import { Switch, Route, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Header from '../Components/Header'
import HomeScreen from '../Screens/HomeScreen'
import AuthScreen from '../Screens/AuthScreen'
import DashboardScreen from '../Screens/DashboardScreen'
import ApiCardScreen from '../Screens/ApiCardScreen'

export const useProtectedRoutes = (logged: boolean, admin?: boolean) => {
	if (!logged) {
		return (
			<>
				<Header />
				<Container maxWidth="lg">
					<Switch>
						<Route exact path="/" component={HomeScreen} />
						<Route exact path="/signin" component={AuthScreen} />
						<Route exact path="/signup" component={AuthScreen} />
						<Redirect to="/" />
					</Switch>
				</Container>
			</>
		)
	} else {
		return (
			<>
				<Header />
				<Switch>
					<Redirect
						exact
						from="/dashboard"
						to="/dashboard/apicards"
					/>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/dashboard/:page" component={DashboardScreen} />
					<Route exact path='/dashboard/apicards/:name' component={ApiCardScreen} />

					<Redirect to="/" />
				</Switch>
			</>
		)
	}
}
