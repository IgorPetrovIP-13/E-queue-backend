import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { OrganizationTypeService } from "./organization_type.service";
import { ZodValidationPipe } from "../core/common/pipes/validation.pipe";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { Roles } from "../core/common/decorators/roles.decorator";
import { RoleEnum } from "../core/common/enums/role-enum";
import {
  CreateAutocompleteDTO,
  createAutocompleteValidationSchema
} from "../core/generic/autocomplete/autocomplete.dto";

@UseGuards(AccessTokenGuard)
@Controller("organization-types")
export class OrganizationTypeController {
  constructor(
    private readonly organizationTypeService: OrganizationTypeService
  ) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  async create(
    @Body(new ZodValidationPipe(createAutocompleteValidationSchema))
    data: CreateAutocompleteDTO
  ) {
    return this.organizationTypeService.create(data);
  }

  @Get("autocomplete-data")
  async getAutocompleteData() {
    return this.organizationTypeService.getAutocompleteData();
  }
}
