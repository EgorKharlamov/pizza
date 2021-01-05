import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PartnerController } from './Controllers/PartnerController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PartnerModule } from './modules/partner/partner.module';
import { PartnerService } from './modules/partner/partner.service';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, PartnerModule],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class AppModule {}
