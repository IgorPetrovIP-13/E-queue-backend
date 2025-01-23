import { z } from 'zod'
import { zodFileLinksArray, zodObjectId, zodStringNullable, zodUrlNullable } from '../core/common/constants/zod.constants';

export const createOrganizationRequestValidationSchema = z
	.object({
		organization_logo: zodUrlNullable,
		organization_type_id: zodObjectId,
		organization_title: z.string().min(3).max(255),
		desired_connection_type_id: zodObjectId,
		desired_connection: z.string().min(5).max(255),
		organization_description: z.string().min(3).max(1000),
		organization_website: zodUrlNullable,
		attachments: zodFileLinksArray
	})
	.strict()

export type CreateOrganizationRequestDTO = z.infer<
	typeof createOrganizationRequestValidationSchema
>

export const CreateOrganizationRequestWithUidValidationSchema = createOrganizationRequestValidationSchema.extend({
  userId: zodObjectId,
});

export type CreateOrganizationRequestWithUidDTO = z.infer<
  typeof CreateOrganizationRequestWithUidValidationSchema
>;