import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {createRoutes} from './routes/createRoutes'
import {config} from 'dotenv'

config()

const app = express()

app.use(express.json())
app.use(cors({methods:['*'], origin:['http://localhost:3000']}))

createRoutes(app)

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
