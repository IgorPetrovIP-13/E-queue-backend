import { User } from 'src/app/user/user.schema'

export type UserWithTokens = {
	user: User
	tokens: {
		accessToken: string
		refreshToken: string
	}
}
