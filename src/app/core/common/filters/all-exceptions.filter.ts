import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name)

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		const message =
			exception instanceof HttpException
				? (exception.getResponse() as string | object)
				: 'Internal server error'

		this.logger.error(
			`HTTP Status: ${status} Error Message: ${JSON.stringify(message)}`,
			exception instanceof Error ? exception.stack : '',
			`Path: ${request.url}`
		)

		response.status(status).json({
			statusCode: status,
			path: request.url,
			message
		})
	}
}
