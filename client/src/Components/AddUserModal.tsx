import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core'

interface IAddUserProps {
	open: boolean
	onClose: () => void
	onApply: (value: {
		email: string
		password: string
		firstname: string
		lastname: string
		patronymic: string
	}) => void
}

const useStyles = makeStyles((theme) => ({
	progress: {
		position: 'absolute',
		width: '100%',
	},
}))

const AddUserModal: React.FC<IAddUserProps> = ({ open, onApply, onClose }) => {
	const styles = useStyles()
	const { addUserLoading, addUserError } = useSelector(
		(state: IRootState) => state.user
	)

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [firstname, setFirstname] = useState<string>('')
	const [lastname, setLastname] = useState<string>('')
	const [patronymic, setPatronymic] = useState<string>('')

	const emailHandler = (e: any) => setEmail(e.target.value)
	const passwordHandler = (e: any) => setPassword(e.target.value)
	const firstnameHandler = (e: any) => setFirstname(e.target.value)
	const lastnameHandler = (e: any) => setLastname(e.target.value)
	const patronymicHandler = (e: any) => setPatronymic(e.target.value)

	return (
		<Dialog onClose={onClose} open={open}>
			{addUserLoading && <LinearProgress className={styles.progress} />}
			<DialogTitle>Add user</DialogTitle>
			{addUserError && <Alert severity='error'>{addUserError}</Alert>}
			<List>
				<ListItem>
					<TextField
						value={email}
						onChange={emailHandler}
						variant="outlined"
						label="email"
						type="email"
						autoComplete="email"
					/>
				</ListItem>
				<ListItem>
					<TextField
						value={password}
						onChange={passwordHandler}
						variant="outlined"
						label="password"
						type="password"
					/>
				</ListItem>
				<ListItem>
					<TextField
						value={firstname}
						onChange={firstnameHandler}
						variant="outlined"
						label="firstname"
					/>
				</ListItem>
				<ListItem>
					<TextField
						value={lastname}
						onChange={lastnameHandler}
						variant="outlined"
						label="lastname"
					/>
				</ListItem>
				<ListItem>
					<TextField
						value={patronymic}
						onChange={patronymicHandler}
						variant="outlined"
						label="patronymic"
					/>
				</ListItem>
				<ListItem>
					<Button
						onClick={() =>
							onApply({
								email,
								password,
								firstname,
								lastname,
								patronymic,
							})
						}
						disabled={addUserLoading}
					>
						apply
					</Button>
					<Button onClick={onClose}>cancel</Button>
				</ListItem>
			</List>
		</Dialog>
	)
}

export default AddUserModal
