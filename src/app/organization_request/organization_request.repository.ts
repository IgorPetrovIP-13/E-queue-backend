import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  OrganizationRequest,
  OrganizationRequestCollection
} from "./organization_request.schema";
import { CreateOrganizationRequestDTO } from "./organization_request.dto";
import { Model, Types } from "mongoose";

@Injectable()
export class OrganizationRequestRepostitory {
  constructor(
    @InjectModel(OrganizationRequestCollection)
    private readonly organizationRequest: Model<OrganizationRequest>
  ) {}

  async create(
    data: CreateOrganizationRequestDTO
  ): Promise<OrganizationRequest> {
    const organizationRequest = new this.organizationRequest(data);
    return organizationRequest.save();
  }

  async findByUserId(userId: Types.ObjectId): Promise<OrganizationRequest[]> {
    return this.organizationRequest.find({ user: userId }).exec();
  }
}
