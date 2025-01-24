import {
	Injectable,
	CanActivate,
	ExecutionContext,
	BadRequestException,
	ForbiddenException
} from '@nestjs/common'
import { ConfigService } from '../../config/config.service'
import { Request } from 'express'
import axios from 'axios'

@Injectable()
export class CaptchaGuard implements CanActivate {
	private readonly recaptchaSecret: string

	constructor(private readonly configService: ConfigService) {
		this.recaptchaSecret = this.configService.recapchaSecret
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest()
		const recaptchaToken = request.headers['x-recaptcha-token'] as string

		if (!recaptchaToken) {
			throw new BadRequestException('Відсутній токен капчі')
		}

		const isValid = await this.validateRecaptcha(recaptchaToken)
		if (!isValid) {
			throw new ForbiddenException('Невалідний токен капчі')
		}

		return true
	}

	private async validateRecaptcha(token: string): Promise<boolean> {
		try {
			const response = await axios.post(
				'https://www.google.com/recaptcha/api/siteverify',
				null,
				{
					params: {
						secret: this.recaptchaSecret,
						response: token
					}
				}
			)

			return response.data.success && response.data.score > 0.5
		} catch (error) {
			console.error('Recaptcha validation error:', error)
			return false
		}
	}
}
