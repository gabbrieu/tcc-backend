import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customers } from '../customers/customers.entity';

@Entity()
export class Comments {
  @ApiProperty({ description: 'ID de um comentário' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Comentário' })
  @Column({ type: 'text' })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Trabalhadores',
    type: 'string',
  })
  @IsUUID()
  @ManyToOne(() => Customers, (customer) => customer.comments)
  customer: Customers;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: string;

  @ApiProperty({ description: 'Data de atualização do registro' })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  updatedAt: string;
}
