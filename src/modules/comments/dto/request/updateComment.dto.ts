import { PickType } from '@nestjs/swagger';
import { Comments } from '../../comments.entity';

export class UpdateCommentDto extends PickType(Comments, ['comment']) {}
