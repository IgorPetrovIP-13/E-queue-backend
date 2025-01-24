import { Types } from 'mongoose'
import { RoleEnum } from '../enums/role-enum'

export type JwtPayload = {
	sub: Types.ObjectId
	email: string
	role: `${RoleEnum}`
}
