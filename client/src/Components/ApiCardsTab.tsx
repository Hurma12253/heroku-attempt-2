import React, {useEffect} from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import AddApi from './AddApi'
import ApiCard from './ApiCard'
import {getApis} from '../Store/actions/apiActions'

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		alignItems: 'center',
	},
	progress: {
		position: 'absolute',
		width: '100%',
	},
}))

const ApiCardsTab = () => {
	const styles = useStyles()
	const dispatch = useDispatch()
	const { apis, loading, error } = useSelector(
		(state: IRootState) => state.api
	)
	const {updatedPatch} = useSelector(
		(state: IRootState) => state.user
	)

	useEffect(() => {
		dispatch(getApis())
	}, [dispatch, updatedPatch])

	return (
		<Container className={styles.root} maxWidth="lg">
			<AddApi />
			{loading && <LinearProgress className={styles.progress} />}
			{error && <Alert severity="error">{error}</Alert>}
			<Grid container spacing={6}>
				{apis.map((api) => {
					return (
						<Grid item lg={4} md={4} sm={6} xs={12} key={api.API}>
							<ApiCard api={api} />
						</Grid>
					)
				})}
			</Grid>
		</Container>
	)
}

export default ApiCardsTab
