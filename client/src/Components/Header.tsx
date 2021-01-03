import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
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
	nav: {
		display: 'flex',
		alignItems: 'center',
		'&>*': {
			marginLeft: '10px',
		},
	},
	avatar: {
		cursor: 'pointer',
	},
}))

const Header = () => {
	const styles = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const { logged, userInfo } = useSelector((state: IRootState) => state.user)

	//menu handlers
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	//redirect handlers

	const dashboardHandler = () => {
		handleClose()
		history.push('/dashboard')
	}

	return (
		<AppBar className={styles.root} position="static">
			<Container maxWidth="lg">
				<Toolbar className={styles.toolbar}>
					<Link to="/" className={styles.logo}>
						<Typography variant="h4">HurmaRC</Typography>
					</Link>
					{!logged ? (
						<Link style={{ textDecoration: 'none' }} to="/signin">
							<Button className={styles.signin}>sign in</Button>
						</Link>
					) : (
						<Box className={styles.nav}>
							<Typography>{userInfo?.name}</Typography>
							<Avatar
								className={styles.avatar}
								onClick={handleClick}
							>
								{userInfo?.name.charAt(0)}
							</Avatar>
							<Menu
								anchorEl={anchorEl}
								keepMounted
								open={!!anchorEl}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>
									Profile
								</MenuItem>
								<MenuItem onClick={dashboardHandler}>
									Dashboard
								</MenuItem>
								<MenuItem onClick={handleClose}>
									Logout
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
