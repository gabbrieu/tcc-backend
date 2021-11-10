import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { Customers } from './customers.entity';
import { CustomersService } from './customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
