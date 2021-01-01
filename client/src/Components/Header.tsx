import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#2B3245',
	},
	logo: {
		textDecoration: 'none',
		color: '#FFFFFF',
		transition: '.2s',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
}))

const Header = () => {
	const styles = useStyles()

	return (
		<AppBar className={styles.root} position="static">
			<Container maxWidth="lg">
				<Toolbar>
					<Link to="/" className={styles.logo}>
						<Typography variant="h4">HurmaRC</Typography>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
