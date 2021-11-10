import { PickType } from '@nestjs/swagger';
import { Customers } from '../../customers.entity';

export class UpdateCustomerColumnDto extends PickType(Customers, ['column']) {}
