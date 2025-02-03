import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserCollection } from "./user.schema";
import { Model, Types } from "mongoose";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserCollection) private readonly userModel: Model<User>
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async update(id: Types.ObjectId, data: UpdateUserDTO): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
  }

  async findById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id).lean().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete(id).lean().exec();
  }
}
