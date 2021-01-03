import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../Store/reducers/rootReducer'

const HomeScreen = () => {
	const { logged } = useSelector((state: IRootState) => state.user)
	return (
		<>
			{logged ? (
				<h1>You authoraized</h1>
			) : (
				<h1>You are not authoraized</h1>
			)}
			<img
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%,-50%)',
				}}
				src="/assets/img/manekineko.png"
				alt=""
			/>
		</>
	)
}

export default HomeScreen
