import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'
import { OrgReqStatusEnum } from 'src/app/core/common/enums/org-req-status-enum'
import { UserCollection } from 'src/app/user/user.schema'
import { OrganizationTypeCollection } from '../organization_type/organization_type.schema'
import { ConnectionTypeCollection } from '../connection_type/connection_type.schema'

export const OrganizationRequestCollection = 'organization_requests'

@Schema({ versionKey: false })
export class OrganizationRequest {
	_id: string

	@Prop({ default: null })
	organization_logo: string | null

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: OrganizationTypeCollection })
	organization_type_id: MongooseSchema.Types.ObjectId

	@Prop()
	organization_title: string

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: ConnectionTypeCollection })
	desired_connection_type_id: MongooseSchema.Types.ObjectId

	@Prop()
	desired_connection: string

	@Prop()
	organization_description: string

	@Prop({ default: null })
	organization_website: string | null

	@Prop({default: []})
	attachments: string[]

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: UserCollection })
	user_id: MongooseSchema.Types.ObjectId

	@Prop({ default: OrgReqStatusEnum.NOT_CHECKED })
	status: OrgReqStatusEnum

	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: UserCollection,
		default: null
	})
	admin_id: MongooseSchema.Types.ObjectId | null

	@Prop({ default: [] })
	admin_comments: string[]

	@Prop({ default: null })
	rejection_comment: string | null

	@Prop({ default: null })
	approval_comment: string | null
}

export const OrganizationRequestSchema =
	SchemaFactory.createForClass(OrganizationRequest)
