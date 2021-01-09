import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

const signupSchema = Yup.object().shape({
	email: Yup.string().required().email('Invalid email!'),
	password: Yup.string().required().min(3, 'Too short!').max(15, 'Too long!'),
	confirmPassword: Yup.string()
		.required('This field is requried!')
		.oneOf([Yup.ref('password'), null], 'Password doesnt match!'),
	firstname: Yup.string().required().min(1, 'Too short').max(20, 'Too long!'),
	lastname: Yup.string().required().min(1, 'Too short').max(20, 'Too long!'),
	patronymic: Yup.string()
		.required()
		.min(1, 'Too short')
		.max(20, 'Too long!'),
})

interface IAddUserProps {
	open: boolean
	onClose: () => void
	submitHandler: any
}

const useStyles = makeStyles((theme) => ({
	progress: {
		position: 'absolute',
		width: '100%',
	},
}))

const AddUserModal: React.FC<IAddUserProps> = ({
	open,
	submitHandler,
	onClose,
}) => {
	const styles = useStyles()
	const { addUserLoading, addUserError } = useSelector(
		(state: IRootState) => state.user
	)

	return (
		<Dialog onClose={onClose} open={open}>
			{addUserLoading && <LinearProgress className={styles.progress} />}
			<DialogTitle>Add user</DialogTitle>
			{addUserError && <Alert severity="error">{addUserError}</Alert>}
			<Formik
				initialValues={{
					email: '',
					password: '',
					confirmPassword: '',
					firstname: '',
					lastname: '',
					patronymic: '',
				}}
				validationSchema={signupSchema}
				onSubmit={submitHandler}
			>
				<Form>
					<List>
						<ListItem>
							<Field
								component={TextField}
								variant="outlined"
								label="email"
								name='email'
								type="email"
								autoComplete="email"
							/>
						</ListItem>
						<ListItem>
							<Field
								component={TextField}
								variant="outlined"
								label="password"
								name='password'
								type="password"
							/>
						</ListItem>
						<ListItem>
							<Field
								component={TextField}
								variant="outlined"
								label="confirm password"
								name='confirmPassword'
								type="password"
							/>
						</ListItem>
						<ListItem>
							<Field
								component={TextField}
								variant="outlined"
								label="firstname"
								name='firstname'
							/>
						</ListItem>
						<ListItem>
							<Field
								component={TextField}
								variant="outlined"
								label="lastname"
								name='lastname'
							/>
						</ListItem>
						<ListItem>
							<Field
								component={TextField}
								variant="outlined"
								label="patronymic"
								name='patronymic'
							/>
						</ListItem>
						<ListItem>
							<Button type='submit' disabled={addUserLoading}>apply</Button>
							<Button onClick={onClose}>cancel</Button>
						</ListItem>
					</List>
				</Form>
			</Formik>
		</Dialog>
	)
}

export default AddUserModal
