import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './modules/cards/cards.module';
import { CustomersModule } from './modules/customers/customers.module';
import * as ormconfig from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig,
    }),
    CardsModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
