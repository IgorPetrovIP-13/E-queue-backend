import { Document } from 'mongoose'

export interface IGenericAutocompleteDocument extends Document {
	_id: string
	title: string
}
