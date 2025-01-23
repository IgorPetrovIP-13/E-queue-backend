import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from '../core/common/pipes/validation.pipe';
import { CreateAutocompleteDTO, createAutocompleteValidationSchema } from '../core/generic/autocomplete/autocomplete.dto';
import { ConnectionTypeService } from './connection_type.service';
import { AccessTokenGuard } from '../core/common/guards/accessToken.guard';
import { RoleEnum } from '../core/common/enums/role-enum';
import { Roles } from '../core/common/decorators/roles.decorator';

@UseGuards(AccessTokenGuard)
@Controller('connection-types')
export class ConnectionTypeController {
	constructor(private readonly connectionTypeService: ConnectionTypeService) {}
	@Roles(RoleEnum.ADMIN)
	@Post()
	async create(
		@Body(new ZodValidationPipe(createAutocompleteValidationSchema))
		data: CreateAutocompleteDTO
	) {
		return this.connectionTypeService.create(data)
	}

	@Get('autocomplete-data')
	async getAutocompleteData() {
		return this.connectionTypeService.getAutocompleteData()
	}
}
