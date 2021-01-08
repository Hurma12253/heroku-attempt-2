import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import AddButton from './AddButton'
import Search from './Search'
import AddUserModal from './AddUserModal'
import { addMember } from '../Store/actions/userActions'
import { IUserRegistration } from '../Services/Api'

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

const AddUser = () => {
	const styles = useStyles()
	const dispatch = useDispatch()
	const [modalActive, setModalActive] = useState<boolean>(false)

	const onApplyHandler = (value: IUserRegistration) => {
		dispatch(addMember(value, onCloseHandler))
	}

	const onCloseHandler = () => {
		setModalActive(false)
	}

	return (
		<Container className={styles.root} maxWidth="lg">
			<Search />
			<AddButton onClick={() => setModalActive(true)} />
			<AddUserModal
				open={modalActive}
				onApply={onApplyHandler}
				onClose={onCloseHandler}
			/>
		</Container>
	)
}

export default AddUser
