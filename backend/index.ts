import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import serverless from 'serverless-http'
import cors from 'cors'
import { createRoutes } from './routes/createRoutes'
import { config } from 'dotenv'

config()

const app = express()

app.use(express.json())
app.use(cors({ methods: ['*'], origin: ['http://localhost:3000'] }))

createRoutes(app)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
	)
} else {
	app.get('/', (req, res) => res.send('Api is running...'))
}

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		app.listen(process.env.PORT || 8080)

		console.log(`Server is running on port ${process.env.PORT || 8080}`)
	} catch (error) {
		console.log(error)
		process.exit()
	}
}

start()

export const handler = serverless(app)
