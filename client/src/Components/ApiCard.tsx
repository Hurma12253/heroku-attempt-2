import React from 'react'
import { useHistory } from 'react-router-dom'
import { IApi } from '../Services/Api'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '350px',
		width: '100%',
		minHeight: '350px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		padding: '30px 30px',
		cursor: 'pointer',
		transition: '.1s',
		'&:hover': {
			boxShadow: '0px 0px 16px 0px rgba(0,0,0,.1)',
		},
	},
	img: {
		marginBottom: '38px',
	},
	title: {
		marginBottom: '20px',
	},
	description: {},
}))

interface IApiCardProps {
	api: IApi
}

const ApiCard: React.FC<IApiCardProps> = ({ api }) => {
	const styles = useStyles()
	const history = useHistory()

	const onCardClick = () => {
		history.push(`/dashboard/apicards/${api.API}`)
	}

	return (
		<Box onClick={onCardClick} className={styles.root} component={Paper}>
			<img className={styles.img} src="/assets/svg/fire.svg" alt="fire" />
			<Typography className={styles.title} variant="h4">
				{api.API}
			</Typography>
			<Typography className={styles.description}>
				{api.Description}
			</Typography>
		</Box>
	)
}

export default ApiCard
