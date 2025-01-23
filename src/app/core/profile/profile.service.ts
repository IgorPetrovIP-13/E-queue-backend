import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class ProfileService {

	constructor(private readonly userService: UserService) {}

	async get(userId: Types.ObjectId) {
		const {password, ...data} = await this.userService.findById(userId);
		return data;
	}
}