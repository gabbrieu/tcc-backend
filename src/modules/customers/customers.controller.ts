import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Customers } from './customers.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/request/createCustomer.dto';
import { GetAllRequestDto } from './dto/request/getAllRequest.dto';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Customers> {
    return await this.service.getOne(id);
  }

  @Get()
  async getAll(
    @Query() filters: GetAllRequestDto,
  ): Promise<{ data: Customers[]; count: number }> {
    return await this.service.getAll(filters);
  }

  @Get('by-column')
  async getAllOrganizedByColumn() {
    return await this.service.getAllOrganizedByColumn();
  }

  @Post()
  async create(@Body() req: CreateCustomerDto) {
    return await this.service.create(req);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
