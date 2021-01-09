import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import { userSignin } from '../Store/actions/userActions'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

const signinSchema = Yup.object().shape({
	email: Yup.string().required().email('Invalid email!'),
	password: Yup.string().required().min(3, 'Too short!').max(15, 'Too long!'),
})

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	progress: {
		position: 'absolute',
		width: '100%',
	},
}))

const Signin = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { loading, error } = useSelector((state: IRootState) => state.user)

	const submitHandler = ({email, password}, {setSubmitting}) => {

		dispatch(userSignin({ email, password }, setSubmitting))
	}

	return (
		<>
			<CssBaseline />
			<div className={classes.paper}>
				{loading && <LinearProgress className={classes.progress} />}
				{error && (
					<Alert style={{ width: '100%' }} severity="error">
						{error}
					</Alert>
				)}
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Formik validationSchema={signinSchema} initialValues={{email: '', password: ''}} onSubmit={submitHandler}>
					<Form className={classes.form}>
						<Field
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							component={TextField}
						/>
						<Field
							variant="outlined"
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							component={TextField}
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={loading}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="signin">Forgot password?</Link>
							</Grid>
							<Grid item>
								<Link to="/signup">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</>
	)
}

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link to="/">HurmaRC</Link> {new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default Signin
