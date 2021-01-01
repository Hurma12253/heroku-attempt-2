import express from 'express'
import mongoose from 'mongoose'
import {config} from 'dotenv'

config()

const app = express()

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
