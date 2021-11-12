import { OmitType, PartialType } from '@nestjs/swagger';
import { Customers } from '../../customers.entity';

export class UpdateCustomerDto extends PartialType(
  OmitType(Customers, ['id', 'createdAt', 'updatedAt']),
) {}
