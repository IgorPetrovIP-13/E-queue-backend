import { Injectable } from '@nestjs/common'
import { OrganizationRequestRepostitory } from './organization_request.repository'
import { CreateOrganizationRequestWithUidDTO } from './organization_request.dto'
import { Types } from 'mongoose'
import { OrganizationRequest } from './organization_request.schema'

@Injectable()
export class OrganizationRequestService {
	constructor(
		private readonly organizationRequestRepository: OrganizationRequestRepostitory
	) {}

	async create(
		data: CreateOrganizationRequestWithUidDTO
	): Promise<OrganizationRequest> {
		return await this.organizationRequestRepository.create(data)
	}

	async findMyRequests(userId: Types.ObjectId): Promise<OrganizationRequest[]> {
		return await this.organizationRequestRepository.findByUserId(userId)
	}
}
