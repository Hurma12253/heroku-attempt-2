import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Signin from '../Components/Signin'
import Signup from '../Components/Signup'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
		color: '#000000',
	},
	root: {},
	tabs: {
		display: 'flex',
		justifyContent: 'center',
	},
}))

const AuthScreen = () => {
	const styles = useStyles()
	const history = useHistory()
	const location = useLocation()

	const [tabValue, setTabValue] = useState<number>(
		location.pathname === '/signin' ? 0 : 1
	)

	const onChangeTab = (e: any, value: number) => {
		history.push(value === 0 ? '/signin' : '/signup')
	}

	useEffect(() => {
		setTabValue(location.pathname === '/signin' ? 0 : 1)
	}, [location])

	return (
		<>
			<Container maxWidth="xs" className={styles.root}>
				<Box className={styles.tabs}>
					<Tabs value={tabValue} onChange={onChangeTab}>
						<Tab label="Signin" />
						<Tab label="Signup" />
					</Tabs>
				</Box>

				{tabValue === 0 ? <Signin /> : <Signup />}
			</Container>
		</>
	)
}

export default AuthScreen
