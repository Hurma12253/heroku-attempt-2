import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import { logout, loginMember } from '../Store/actions/userActions'

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
		height: '100%',
		'&>*': {
			marginLeft: '10px',
		},
	},
	user: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		minHeight: '100%',
		padding: '8px 12px',
		'&:hover': {
			background: 'rgba(255,255,255,.1)',
		},
		'&>div': {
			marginLeft: '10px',
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	users: {
		minHeight: '100%',
		padding: '12px 12px',
		'&:hover': {
			background: 'rgba(255,255,255,.1)',
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	burger: {
		minHeight: '100%',
		// padding: '12px 12px',
		'&>img': {
			width: '30px',
		},
		'&:hover': {
			background: 'rgba(255,255,255,.1)',
		},
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	drawerList: {
		width: '200px',
	},
	nested: {
		paddingLeft: '30px',
	},
	drawerAvatar: {
		marginRight: '8px',
	},
}))

const Header = () => {
	const styles = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const { logged, user, users } = useSelector(
		(state: IRootState) => state.user
	)

	//menu handlers

	//drawer
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
	const [isUserOpen, setIsUserOpen] = useState<boolean>(false)

	const onDrawerHandler = (kek: boolean) => {
		setIsDrawerOpen(kek)
	}

	//user
	const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null)

	const handleUserClick = (event: any) => {
		setUserAnchorEl(event.currentTarget.children[1])
	}

	const handleUserClose = () => {
		setUserAnchorEl(null)
	}

	//users

	const [
		usersAnchorEl,
		setUsersAnchorEl,
	] = React.useState<null | HTMLElement>(null)

	const handleUsersClick = (event: any) => {
		setUsersAnchorEl(event.currentTarget)
	}

	const handleUsersClose = () => {
		setUsersAnchorEl(null)
		onDrawerHandler(false)
		setIsUserOpen(false)
	}

	//redirect handlers

	const dashboardHandler = () => {
		handleUserClose()
		onDrawerHandler(false)
		history.push('/dashboard')
	}

	const logoutHandler = () => {
		handleUserClose()
		dispatch(logout())
	}

	const onUserClick = (_id: string) => {
		dispatch(loginMember({ _id }, handleUsersClose))
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
							<ButtonBase
								onClick={() => onDrawerHandler(true)}
								className={styles.burger}
							>
								<img
									src="/assets/svg/burger.svg"
									alt="burger"
								/>
							</ButtonBase>
							<SwipeableDrawer
								className={styles.drawer}
								onClose={() => onDrawerHandler(false)}
								onOpen={() => onDrawerHandler(true)}
								open={isDrawerOpen}
								anchor="right"
							>
								<List className={styles.drawerList}>
									<ListItem>
										<Avatar className={styles.drawerAvatar}>
											{user?.firstname.charAt(0)}
										</Avatar>
										<Typography>
											{user?.firstname}
										</Typography>
									</ListItem>
									<Divider />
									<ListItem>Profile</ListItem>
									<ListItem onClick={dashboardHandler}>
										Dashboard
									</ListItem>
									<ListItem
										onClick={() =>
											setIsUserOpen((prev) => !prev)
										}
									>
										Users
									</ListItem>
									<Collapse
										in={isUserOpen}
										timeout="auto"
										unmountOnExit
									>
										{users.map((user) => {
											return (
												<ListItem
													className={styles.nested}
													key={`header ${user._id}`}
													onClick={() =>
														onUserClick(user._id)
													}
												>
													{user.email}
												</ListItem>
											)
										})}
									</Collapse>
								</List>
							</SwipeableDrawer>
							{users.length > 0 ? (
								<ButtonBase
									onClick={handleUsersClick}
									className={styles.users}
								>
									<img
										style={{ width: '30px' }}
										src="/assets/svg/users.svg"
										alt="users"
									/>
								</ButtonBase>
							) : null}

							<Menu
								anchorEl={usersAnchorEl}
								keepMounted
								open={!!usersAnchorEl}
								onClose={handleUsersClose}
							>
								{users.map((user) => {
									return (
										<MenuItem
											key={`header ${user._id}`}
											onClick={() =>
												onUserClick(user._id)
											}
										>
											{user.email}
										</MenuItem>
									)
								})}
							</Menu>
							<ButtonBase
								className={styles.user}
								onClick={handleUserClick}
							>
								<Typography>{user?.firstname}</Typography>
								<Avatar>{user?.firstname.charAt(0)}</Avatar>
							</ButtonBase>
							<Menu
								anchorEl={userAnchorEl}
								keepMounted
								open={!!userAnchorEl}
								onClose={handleUserClose}
							>
								<MenuItem onClick={handleUserClose}>
									Profile
								</MenuItem>
								<MenuItem onClick={dashboardHandler}>
									Dashboard
								</MenuItem>
								<MenuItem onClick={logoutHandler}>
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
