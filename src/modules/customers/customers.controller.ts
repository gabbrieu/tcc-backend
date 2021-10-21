import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get(':id')
  async getOne(@Param() id: string) {}
}
