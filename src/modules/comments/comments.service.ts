import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { Comments } from './comments.entity';
import { CreateCommentDto } from './dto/request/createComment.dto';
import { GetAllCommentsRequestDto } from './dto/request/getAllComments.dto';
import { UpdateCommentDto } from './dto/request/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly repository: Repository<Comments>,

    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  async getAll(
    filters: GetAllCommentsRequestDto,
  ): Promise<{ data: Comments[]; count: number }> {
    let query = this.repository
      .createQueryBuilder('comments')
      .select('comments.id', 'id')
      .addSelect('comments.comment', 'comment')
      .addSelect('comments.create_date', 'createdAt')
      .addSelect('comments.update_date', 'updatedAt')
      .addSelect('customer.id', 'customerId')
      .addSelect('customer.name', 'customerName')
      .innerJoin('comments.customer', 'customer')
      .take(filters.take)
      .skip(filters.skip);

    if (filters.customerId) {
      query.andWhere('"customerId" = :customerId', {
        customerId: filters.customerId,
      });
    }

    query = query.orderBy('comments.create_date', 'ASC');

    const [data, count] = await Promise.all([
      query.clone().getRawMany(),
      query.clone().getCount(),
    ]);

    return {
      data,
      count,
    };
  }

  async getOne(id: string): Promise<Comments> {
    const comment = await this.repository.findOne(id, {
      relations: ['customer'],
    });
    if (!comment) throw new NotFoundException('Comentário não encontrado!');

    return comment;
  }

  async create(req: CreateCommentDto): Promise<Comments> {
    const customer = await this.customersService.getOne(req.customerId);
    const comment = this.repository.create({
      comment: req.comment,
      customer,
    });

    const savedComment = await this.repository.save(comment);
    return {
      id: savedComment.id,
      comment: savedComment.comment,
      createdAt: savedComment.createdAt,
      updatedAt: savedComment.updatedAt,
    } as Comments;
  }

  async update(id: string, req: UpdateCommentDto): Promise<Comments> {
    const updatedComment = await this.getOne(id);
    console.log(id, updatedComment);
    updatedComment.comment = req.comment;

    return await this.repository.save(updatedComment);
  }

  async delete(id: string): Promise<void> {
    await this.getOne(id);
    await this.repository.delete(id);
  }
}
