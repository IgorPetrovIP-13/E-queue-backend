import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { UserService } from "src/app/user/user.service";
import { UpdateProfileDTO } from "./profile.dto";

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService) {}

  async get(userId: Types.ObjectId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = await this.userService.findById(userId);
    return payload;
  }

  async update(userId: Types.ObjectId, data: UpdateProfileDTO) {
    return await this.userService.update(userId, data);
  }

  async delete(userId: Types.ObjectId) {
    return await this.userService.delete(userId);
  }
}
