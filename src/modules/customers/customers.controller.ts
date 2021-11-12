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
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Customers } from './customers.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/request/createCustomer.dto';
import { GetAllRequestDto } from './dto/request/getAllRequest.dto';
import { UpdateAllCustomersDto } from './dto/request/updateAllCustomers.dto';
import { UpdateCustomerDto } from './dto/request/updateCustomer.dto';

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

  @Post()
  async create(@Body() req: CreateCustomerDto) {
    return await this.service.create(req);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() req: UpdateCustomerDto,
  ): Promise<Customers> {
    return await this.service.update(id, req);
  }

  @Put('update-all')
  async updateAllCustomers(@Body() req: UpdateAllCustomersDto) {
    return await this.service.updateAllCustomers(req);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
