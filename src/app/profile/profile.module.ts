import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { UserModule } from "src/app/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
