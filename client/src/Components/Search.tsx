import React, { useState, createRef } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		padding: '10px 10px',
		borderRadius: '22px',
		position: 'relative',
	},
	img: {
		width: '20px',
		transform: 'translateY(1px)'
	},
	button: {
		marginRight: '8px',
		outline: 'none',
		border: 'none',
		background: 'transparent',
		cursor:'pointer'
	},
	input: {
		outline: 'none',
		border: 'none',
		background: 'transparent',
		fontSize: '16px',
	},
	ripple: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		cursor: 'pointer',
		borderRadius: '22px',
		background: 'rgba(0,0,0,.02)',
		zIndex: 1,
		transition: '.2s',
		'&:hover': {
			background: 'rgba(0,0,0,.08)',
		},
	},
}))

const Search = () => {
	const styles = useStyles()
	const [active, setActive] = useState<boolean>(false)
	const inputRef = createRef<HTMLInputElement>()

	const onClickHandler = () => {
		setActive(true)
		inputRef.current?.focus()
	}

	const onClickAway = () => {
		setActive(false)
	}

	return (
		<ClickAwayListener onClickAway={onClickAway}>
			<Box className={styles.root}>
				{!active && (
					<div
						onClick={onClickHandler}
						className={styles.ripple}
					></div>
				)}
				<button className={styles.button}>
					<img
						className={styles.img}
						src="/assets/svg/search.svg"
						alt="search"
					/>
				</button>
				<input
					ref={inputRef}
					className={styles.input}
					placeholder="search"
					type="text"
				/>
			</Box>
		</ClickAwayListener>
	)
}

export default Search
