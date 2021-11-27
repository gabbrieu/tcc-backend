import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Customers } from '../../customers.entity';

export class UpdateAllCustomersDto {
  @ApiProperty({
    description: 'Array de clientes a serem atualizados',
    isArray: true,
    type: Customers,
  })
  @IsArray()
  customers: Customers[];
}
