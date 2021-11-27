import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { CommentsController } from './comments.controller';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), CustomersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
