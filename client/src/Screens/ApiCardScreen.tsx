import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'
import { useHistory, useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {},
    head: {
        fontWeight: 'bold'
    }
}))

type Params = {
    name: string
}

const ApiCardScreen = () => {
    const styles = useStyles()
    const history = useHistory()
    const params = useParams<Params>()
    
	const { apis } = useSelector((state: IRootState) => state.api)
	const currentApi = apis.find((api) =>
		api.API === params.name ? true : false
    )

    if(!currentApi){
        history.push('/dashboard/apicards')
	}
	
	const onBackClick = () => {
		history.goBack()
	}

	return (
		<Container maxWidth="lg" className={styles.root}>
			<Button onClick={onBackClick}>back</Button>
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>{currentApi?.API}</TableCell>
						</TableRow>
                        <TableRow>
							<TableCell>Description</TableCell>
							<TableCell>{currentApi?.Description}</TableCell>
						</TableRow>
                        <TableRow>
							<TableCell>Auth</TableCell>
							<TableCell>{currentApi?.Auth ? currentApi?.Auth : 'No'}</TableCell>
						</TableRow>
                        <TableRow>
							<TableCell>Category</TableCell>
							<TableCell>{currentApi?.Category}</TableCell>
						</TableRow>
                        <TableRow>
							<TableCell>Cors</TableCell>
							<TableCell>{currentApi?.Cors}</TableCell>
						</TableRow>
                        <TableRow>
							<TableCell>HTTPS</TableCell>
							<TableCell>{String(currentApi?.HTTPS)}</TableCell>
						</TableRow>
                        <TableRow>
							<TableCell>Link</TableCell>
							<TableCell>{currentApi?.Link}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default ApiCardScreen
