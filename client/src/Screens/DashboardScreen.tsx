import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import UsersTab from '../Components/UsersTab'
import ApiCardsTab from '../Components/ApiCardsTab'

const useStyles = makeStyles((theme) => ({
	appbar: {
		background: '#FFFFFF',
		justifyContent: 'center',
	},
	tabs: {
		'&>*': {
			color: '#576D77',
		},
	},
	progress: {
		position: 'absolute',
		width: '100%',
	},
}))

const DashboardScreen: React.FC = () => {
	const styles = useStyles()
	const history = useHistory()
	const { page } = useParams<Params>()

	interface Params {
		page: string
	}
	type IndexObj = { [key: string]: number } | { [key: number]: string }

	const indexToTabName: IndexObj = {
		0: 'apicards',
		1: 'users',
		2: 'some2',
		3: 'some3',
		4: 'some4',
	}

	const tabNameToIndex: IndexObj = {
		apicards: 0,
		users: 1,
		some2: 2,
		some3: 3,
		some4: 4,
	}

	const [selectedTab, setSelectedTab] = useState<number>(
		tabNameToIndex[page] ? tabNameToIndex[page] : tabNameToIndex['apicards']
	)

	const onTabChange = (e: any, newValue: number) => {
		history.push(`/dashboard/${indexToTabName[newValue]}`)
		setSelectedTab(newValue)
	}

	useEffect(() => {
		if (!tabNameToIndex[page]) {
			onTabChange(null, 0)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<AppBar className={styles.appbar} position="static" component="div">
				<Container maxWidth="lg">
					<Tabs
						className={styles.tabs}
						onChange={onTabChange}
						value={selectedTab}
					>
						<Tab label="Api cards" value={0} />
						<Tab label="Users" value={1} />
						<Tab label="some2" value={2} />
						<Tab label="some3" value={3} />
						<Tab label="some4" value={4} />
					</Tabs>
				</Container>
			</AppBar>
			{selectedTab === 0 && <ApiCardsTab />}
			{selectedTab === 1 && <UsersTab />}
		</>
	)
}

export default DashboardScreen
