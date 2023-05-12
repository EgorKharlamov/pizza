import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PartnerController } from './Controllers/PartnerController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PartnerModule } from './modules/partner/partner.module';
import { PartnerService } from './modules/partner/partner.service';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderController } from './Controllers/OrderController';
import { OrdersService } from './modules/orders/orders.service';
import config from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
    PartnerModule,
    OrdersModule,
  ],
  controllers: [PartnerController, OrderController],
  providers: [PartnerService, OrdersService],
})
export class AppModule {}
