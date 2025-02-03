import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { AccessTokenGuard } from "../core/common/guards/accessToken.guard";
import { IUserRequest } from "../core/common/interfaces/IUserRequest";
import { ProfileService } from "./profile.service";
import { Response } from "express";
import { TokensEnum } from "../core/common/enums/tokens-enum";
import { ZodValidationPipe } from "../core/common/pipes/validation.pipe";
import { UpdateProfileDTO, updateProfileValidationSchema } from "./profile.dto";

@UseGuards(AccessTokenGuard)
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(@Req() req: IUserRequest) {
    return this.profileService.get(req.user.sub);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Req() req: IUserRequest, @Res() res: Response) {
    res.clearCookie(TokensEnum.REFRESH_TOKEN);
    return this.profileService.delete(req.user.sub);
  }

  @Put()
  update(
    @Req() req: IUserRequest,
    @Body(new ZodValidationPipe(updateProfileValidationSchema))
    data: UpdateProfileDTO
  ) {
    return this.profileService.update(req.user.sub, data);
  }
}
