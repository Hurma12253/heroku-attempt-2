import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	text:{
		position: 'absolute',
		left: '50%',
		top: '20%',
		transform: 'translate(-50%,-50%)',
	},
	img: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
		width: 'calc(310px + 10vw)'
	},
}))

const HomeScreen = () => {
	const styles = useStyles()
	const { logged } = useSelector((state: IRootState) => state.user)
	return (
		<>
			<h1 className={styles.text}>{logged ? 'You are authorized' : 'You are not authorized!'}</h1>
			<img
				className={styles.img}
				src="/assets/img/manekineko.png"
				alt=""
			/>
		</>
	)
}

export default HomeScreen
