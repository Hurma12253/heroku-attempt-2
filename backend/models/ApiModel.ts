import { Schema, model, Document } from 'mongoose'

interface IApi {
	API: string
	Auth: string
	Category: string
	Cors: string
	Description: string
	HTTPS: boolean
	Link: string
}

interface IApiSchema extends Document {
	user: string
	apis: IApi[]
}

const apiSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	apis: [
		{
			API: String,
			Auth: String,
			Category: String,
			Cors: String,
			Description: String,
			HTTPS: Boolean,
			Link: String,
		},
	],
})

export default model<IApiSchema>('Api', apiSchema)
