import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './modules/comments/comments.module';
import { CustomersModule } from './modules/customers/customers.module';
import * as ormconfig from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig,
    }),
    CustomersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
