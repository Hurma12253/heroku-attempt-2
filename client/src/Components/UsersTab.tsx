import React, { useState, useEffect } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import AddUser from '../Components/AddUser'
import { IRootState } from '../Store/reducers/rootReducer'
import { IUserInfo } from '../Services/Api'
import {
	getMembers,
	editMember,
	deleteUser,
} from '../Store/actions/userActions'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

const editUserSchema = Yup.object().shape({
	email: Yup.string().required().email('Invalid email!'),
	firstname: Yup.string().required().min(1, 'Too short').max(20, 'Too long!'),
	lastname: Yup.string().required().min(1, 'Too short').max(20, 'Too long!'),
	patronymic: Yup.string()
		.required()
		.min(1, 'Too short')
		.max(20, 'Too long!'),
})

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#FFFFFF',
		borderBottom: 'none',
		fontWeight: 600,
	},
	body: {
		borderBottom: 'none',
		position: 'relative',
		maxWidth: '165px',
		wordWrap: 'break-word',
	},
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
	root: {
		cursor: 'pointer',
		'&:nth-of-type(even)': {
			backgroundColor: '#F5F8FD',
		},
		opacity: 1,
		transform: 'translateX(-1000px)',
	},
}))(TableRow)

const useStyles = makeStyles((theme) => ({
	paper: {
		flex: '1 1',
	},
	table: {},
	tableHeader: {
		background: '#FFFFFF',
		boxShadow: '0px 1px 8px -3px rgba(0,0,0,.25)',
	},
	actionIcon: {
		width: '20px',
	},
	progress: {
		position: 'absolute',
		width: '100%',
	},
	entering: { opacity: 1, transform: 'translateX(0px)', transition: '.4s' },
	entered: { opacity: 1, transform: 'translateX(0px)', transition: '.4s' },
	exiting: { opacity: 0, transform: 'translateX(1000px)', transition: '.4s' },
	exited: { opacity: 0, transition: '.4s' },
	unmounted: {},
}))

const UsersTab: React.FC = () => {
	const styles = useStyles()
	const dispatch = useDispatch()

	const { loading, error, users, updatedPatch } = useSelector(
		(state: IRootState) => state.user
	)

	const [activeRowId, setActiveRowId] = useState<string>('')

	const [email, setEmail] = useState<string>('')
	const [firstname, setFirstname] = useState<string>('')
	const [lastname, setLastname] = useState<string>('')
	const [patronymic, setPatronymic] = useState<string>('')

	const onEditClickHandler = (row: IUserInfo) => {
		if (activeRowId) {
			let res = window.confirm(
				'Your changes will not save, do you agree?'
			)

			if (!res) {
				return
			}
		}

		setEmail(row.email)
		setFirstname(row.firstname)
		setLastname(row.lastname)
		setPatronymic(row.patronymic)

		setActiveRowId(row._id)
	}

	const onDeleteClickHandler = (row: IUserInfo) => {
		if (activeRowId) {
			const res = window.confirm(
				'Your changes will not save, do you agree?'
			)

			if (!res) {
				return
			}
		}

		const res = window.confirm('Do you realy want to delete this user?')

		if (res) {
			dispatch(deleteUser({ _id: row._id }))
		}
	}

	const submitHandler = (
		{ email, firstname, lastname, patronymic },
		{ setSubmitting }
	) => {
		let res = window.confirm('Are you realy to accept?')

		if (res) {
			dispatch(
				editMember(
					{
						_id: activeRowId,
						email,
						firstname,
						lastname,
						patronymic,
					},
					setActiveRowId,
					setSubmitting
				)
			)
		}
	}

	const onCancelClickHandler = () => {
		setActiveRowId('')
	}

	useEffect(() => {
		dispatch(getMembers())
	}, [dispatch, updatedPatch])

	return (
		<>
			<AddUser />
			<Paper className={styles.paper}>
				{loading && <LinearProgress className={styles.progress} />}
				<Container maxWidth="lg">
					{error && <Alert severity="error">{error}</Alert>}
					<TableContainer className={styles.table}>
						{activeRowId ? (
							<Formik
								initialValues={{
									email,
									firstname,
									lastname,
									patronymic,
								}}
								validationSchema={editUserSchema}
								onSubmit={submitHandler}
								enableReinitialize
							>
								<Form>
									<Table>
										<TableHead>
											<TableRow
												className={styles.tableHeader}
											>
												<StyledTableCell>
													Email
												</StyledTableCell>
												<StyledTableCell>
													Firstname
												</StyledTableCell>
												<StyledTableCell>
													Lastname
												</StyledTableCell>
												<StyledTableCell>
													Patronymic
												</StyledTableCell>
												<StyledTableCell>
													Actions
												</StyledTableCell>
											</TableRow>
										</TableHead>
										<TransitionGroup component={TableBody}>
											{users.map((row) => {
												return (
													<Transition
														timeout={400}
														unmountOnExit
														key={row._id}
													>
														{(state) => (
															<StyledTableRow
																className={
																	styles[
																		state
																	]
																}
																key={row._id}
															>
																<StyledTableCell>
																	{row._id ===
																	activeRowId ? (
																		<Field
																			component={
																				TextField
																			}
																			name="email"
																			label="Email"
																			multiline
																		/>
																	) : (
																		row.email
																	)}
																</StyledTableCell>
																<StyledTableCell>
																	{row._id ===
																	activeRowId ? (
																		<Field
																			label="Firstname"
																			component={
																				TextField
																			}
																			name="firstname"
																			multiline
																		/>
																	) : (
																		row.firstname
																	)}
																</StyledTableCell>
																<StyledTableCell>
																	{row._id ===
																	activeRowId ? (
																		<Field
																			label="Lastname"
																			component={
																				TextField
																			}
																			name="lastname"
																			multiline
																		/>
																	) : (
																		row.lastname
																	)}
																</StyledTableCell>
																<StyledTableCell>
																	{row._id ===
																	activeRowId ? (
																		<Field
																			label="Patronymic"
																			component={
																				TextField
																			}
																			name="patronymic"
																			multiline
																		/>
																	) : (
																		row.patronymic
																	)}
																</StyledTableCell>
																<StyledTableCell>
																	{row._id ===
																	activeRowId ? (
																		<>
																			<IconButton type="submit">
																				<img
																					src="/assets/svg/accept.svg"
																					alt="accept"
																					className={
																						styles.actionIcon
																					}
																				/>
																			</IconButton>
																			<IconButton
																				onClick={
																					onCancelClickHandler
																				}
																			>
																				<img
																					src="/assets/svg/cancel.svg"
																					alt="cancel"
																					className={
																						styles.actionIcon
																					}
																				/>
																			</IconButton>
																		</>
																	) : (
																		<>
																			<IconButton
																				onClick={() =>
																					onEditClickHandler(
																						row
																					)
																				}
																			>
																				<img
																					className={
																						styles.actionIcon
																					}
																					src="/assets/svg/edit.svg"
																					alt="edit"
																				/>
																			</IconButton>
																			<IconButton
																				onClick={() =>
																					onDeleteClickHandler(
																						row
																					)
																				}
																			>
																				<img
																					src="/assets/svg/delete.svg"
																					alt="delete"
																					className={
																						styles.actionIcon
																					}
																				/>
																			</IconButton>
																		</>
																	)}
																</StyledTableCell>
															</StyledTableRow>
														)}
													</Transition>
												)
											})}
										</TransitionGroup>
									</Table>
								</Form>
							</Formik>
						) : (
							<Table>
								<TableHead>
									<TableRow className={styles.tableHeader}>
										<StyledTableCell>Email</StyledTableCell>
										<StyledTableCell>
											Firstname
										</StyledTableCell>
										<StyledTableCell>
											Lastname
										</StyledTableCell>
										<StyledTableCell>
											Patronymic
										</StyledTableCell>
										<StyledTableCell>
											Actions
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TransitionGroup component={TableBody}>
									{users.map((row) => {
										return (
											<Transition
												timeout={400}
												unmountOnExit
												key={row._id}
											>
												{(state) => (
													<StyledTableRow
														className={
															styles[state]
														}
														key={row._id}
													>
														<StyledTableCell>
															{row.email}
														</StyledTableCell>
														<StyledTableCell>
															{row.firstname}
														</StyledTableCell>
														<StyledTableCell>
															{row.lastname}
														</StyledTableCell>
														<StyledTableCell>
															{row.patronymic}
														</StyledTableCell>
														<StyledTableCell>
															<IconButton
																onClick={() =>
																	onEditClickHandler(
																		row
																	)
																}
															>
																<img
																	className={
																		styles.actionIcon
																	}
																	src="/assets/svg/edit.svg"
																	alt="edit"
																/>
															</IconButton>
															<IconButton
																onClick={() =>
																	onDeleteClickHandler(
																		row
																	)
																}
															>
																<img
																	src="/assets/svg/delete.svg"
																	alt="delete"
																	className={
																		styles.actionIcon
																	}
																/>
															</IconButton>
														</StyledTableCell>
													</StyledTableRow>
												)}
											</Transition>
										)
									})}
								</TransitionGroup>
							</Table>
						)}
					</TableContainer>
				</Container>
			</Paper>
		</>
	)
}

export default UsersTab
