import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	img: {
		width: '20px',
	},
}))

const AddButton: React.FC<ButtonProps> = (props) => {
	const styles = useStyles()
	return (
		<Button
			{...props}
			variant="contained"
			color="secondary"
			startIcon={
				<img
					className={styles.img}
					src="/assets/svg/plus.svg"
					alt="plus"
				/>
			}
		>
			Add
		</Button>
	)
}

export default AddButton
