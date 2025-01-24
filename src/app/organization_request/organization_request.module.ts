import { Module } from '@nestjs/common'
import { OrganizationRequestController } from './organization_request.controller'
import { OrganizationRequestService } from './organization_request.service'
import { OrganizationRequestRepostitory } from './organization_request.repository'
import { MongooseModule } from '@nestjs/mongoose'
import {
	OrganizationRequestCollection,
	OrganizationRequestSchema
} from './organization_request.schema'
@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: OrganizationRequestCollection,
				useFactory: () => {
					OrganizationRequestSchema.plugin(require('mongoose-autopopulate'))
					return OrganizationRequestSchema
				}
			}
		])
	],
	controllers: [OrganizationRequestController],
	providers: [OrganizationRequestService, OrganizationRequestRepostitory]
})
export class OrganizationRequestModule {}
