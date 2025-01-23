import { Module } from '@nestjs/common'
import { ConfigModule } from './core/config/config.module'
import { MongooseModule } from './core/mongoose/mogoose.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './core/auth/auth.module'
import { ProfileModule } from './core/profile/profile.module'
import { OrganizationTypeModule } from './organization_type/organization_type.module'
import { ConnectionTypeModule } from './connection_type/connection_type.module'
import { OrganizationRequestModule } from './organization_request/organization_request.module'

@Module({
	imports: [
		ConfigModule,
		MongooseModule,
		AuthModule,
		ProfileModule,
		UserModule,
		OrganizationTypeModule, 
		ConnectionTypeModule,
		OrganizationRequestModule
	]
})
export class AppModule {}
