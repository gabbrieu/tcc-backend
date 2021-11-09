import { PickType } from '@nestjs/swagger';
import { Customers } from '../../customers.entity';

export class CreateCustomerDto extends PickType(Customers, [
  'name',
  'email',
  'document',
  'district',
  'description',
  'gender',
  'houseNumber',
  'status',
  'street',
  'birthDate',
  'cellphone',
  'city',
  'column',
  'priority',
]) {}
