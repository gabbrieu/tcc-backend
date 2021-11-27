import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Comments } from '../../comments.entity';

export class CreateCommentDto extends PickType(Comments, ['comment']) {
  @IsString()
  @IsUUID()
  @ApiProperty({ description: 'ID do cliente' })
  customerId: string;
}
