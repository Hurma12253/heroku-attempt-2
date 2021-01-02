import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#2B3245',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	logo: {
		textDecoration: 'none',
		color: '#FFFFFF',
		transition: '.2s',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
	signin: {
		color: '#FFFFFF',
		textDecoration: 'none',
	},
}))

const Header = () => {
	const styles = useStyles()
	const dispatch = useDispatch()
	const { logged, userInfo } = useSelector((state: IRootState) => state.user)

	return (
		<AppBar className={styles.root} position="static">
			<Container maxWidth="lg">
				<Toolbar className={styles.toolbar}>
					<Link to="/" className={styles.logo}>
						<Typography variant="h4">HurmaRC</Typography>
					</Link>
					{!logged ? (
						<Link style={{textDecoration: 'none'}} to="/signin">
							<Button className={styles.signin}>sign in</Button>
						</Link>
					) : (
						<Avatar>{userInfo?.name.charAt(0)}</Avatar>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
