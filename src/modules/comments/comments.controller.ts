import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/request/createComment.dto';
import { GetAllCommentsRequestDto } from './dto/request/getAllComments.dto';
import { UpdateCommentDto } from './dto/request/updateComment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Get()
  async getAll(
    @Query() filters: GetAllCommentsRequestDto,
  ): Promise<{ data: Comments[]; count: number }> {
    return await this.service.getAll(filters);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Comments> {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() req: CreateCommentDto): Promise<Comments> {
    return await this.service.create(req);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() req: UpdateCommentDto,
  ): Promise<Comments> {
    return await this.service.update(id, req);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
