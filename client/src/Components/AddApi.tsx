import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import AddButton from './AddButton'
import Search from './Search'


const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 60px',
		flexWrap: 'wrap',
	},
}))

const AddApi = () => {
	const styles = useStyles()
	
	return (
		<Container className={styles.root} maxWidth="lg">
			<Search />
			<AddButton />
		</Container>
	)
}

export default AddApi
