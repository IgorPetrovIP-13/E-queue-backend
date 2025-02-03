import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/app/core/common/guards/accessToken.guard";
import { OrganizationRequestService } from "./organization_request.service";
import { ZodValidationPipe } from "../core/common/pipes/validation.pipe";
import {
  CreateOrganizationRequestDTO,
  createOrganizationRequestValidationSchema
} from "./organization_request.dto";
import { IUserRequest } from "../core/common/interfaces/IUserRequest";

@UseGuards(AccessTokenGuard)
@Controller("organization-requests")
export class OrganizationRequestController {
  constructor(
    private readonly organizationRequestService: OrganizationRequestService
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createOrganizationRequestValidationSchema))
    data: CreateOrganizationRequestDTO,
    @Req() req: IUserRequest
  ) {
    const userId = req.user.sub;
    return this.organizationRequestService.create({ userId, ...data });
  }

  @Get("my-requests")
  async findMyRequests(@Req() req: IUserRequest) {
    return this.organizationRequestService.findMyRequests(req.user.sub);
  }
}
